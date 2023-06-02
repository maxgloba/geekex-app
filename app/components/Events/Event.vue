<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <ScrollView orientation="vertical">
        <StackLayout>
          <Header :title="event.title" />
          <Label
            class="event__date"
            textWrap="true"
            :text="event.date" />
          <Label
            class="event__desc"
            :text="event.desc"
            textWrap="true" />
          <Image
            class="event__img"
            :src="`~/images/events/${event.img}`"
            :alt="event.title" />
          <Button
            class="btn btn__lg"
            @tap="openCheckout(event)"
            text="BUY NOW" />
          <FlexboxLayout
            :visibility="['admin', 'manager'].includes(role) ? 'visible' : 'collapse'"
            class="btn__wrap"
            justifyContent="space-between">
            <Button
              class="btn btn__dark"
              @tap="openOrders"
              text="Orders" />
            <Button
              class="btn btn__dark"
              @tap="openTickets"
              text="Tickets" />
          </FlexboxLayout>
          <FlexboxLayout
            class="btn__wrap"
            justifyContent="space-between">
            <Button
              class="btn btn__dark"
              @tap="openLink(event.link)"
              text="Website" />
            <Button
              class="btn btn__dark"
              @tap="openSchedule(event.title, event.schedule)"
              text="Schedule" />
          </FlexboxLayout>
          <FlexboxLayout
            :visibility="['admin', 'manager'].includes(role) ? 'visible' : 'collapse'"
            class="btn__wrap"
            justifyContent="space-between">
            <Button
              class="btn btn__dark"
              @tap="openDashboard"
              text="Dashboard" />
          </FlexboxLayout>
        </StackLayout>
      </ScrollView>
    </RootLayout>
  </Page>
</template>

<script>
import Bar from '../Bar'
import Header from '../Header'
import { Utils } from '@nativescript/core';
import EventsCheckout from './Checkout'
import EventsSchedule from './Schedule'
import EventsOrders from './Orders'
import EventsTickets from './Tickets'
import Dashboard from './Dashboard'
import { mapGetters } from 'vuex'
export default {
  components: {
    Header, Bar,
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      role: 'getRole',
      orders: 'getOrders',
    }),
  },
  methods: {
    openLink(link){
      Utils.openUrl(link)
    },
    openCheckout(event){
      this.$navigateTo(EventsCheckout, {
        props: {
          event: event
        },
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    },
    openSchedule(title, schedule){
      this.$navigateTo(EventsSchedule, {
        props: {
          title: title,
          schedule: schedule,
        },
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    },
    openOrders(){
      this.$navigateTo(EventsOrders, {
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    },
    openTickets(){
      this.$navigateTo(EventsTickets, {
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    },
    openDashboard(){
      this.$navigateTo(Dashboard, {
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    },
  },
  mounted(){
    this.$store.dispatch('requestCampaign', this.event.campignId)
    this.$store.dispatch('requestOrders', this.event.campignId)
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.event{
  &__desc{
    font-size: 15;
    line-height: 1.5;
    color: $second;
    background: transparent;
    margin-bottom: 15;
  }
  &__date{
    background: transparent;
    font-weight: 900;
    font-size: 15;
    color: $third;
    margin-bottom: 5;
  }
  &__img{
    margin-bottom: 10;
  }
  &__list{
    background: transparent;
    width: 100%;
    height: 100%;
    & * {
      color: $second;
    }
    &-title{
      font-size: 18;
      padding-left: 5;
      margin-top: 5;
      margin-bottom: 2;
    }
    &-subtitle{
      font-size: 15;
      padding-left: 15;
      margin-bottom: 2;
    }
    &-item{
      font-size: 13;
      padding-left: 20;
    }
  }
}
.btn__wrap{
  margin-bottom: 0;
  margin-top: 10;
}
</style>