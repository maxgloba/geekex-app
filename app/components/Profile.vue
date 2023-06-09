<template>
    <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout>
        <Label class="header">
          <Span class="header__title" text="Profile:" />
        </Label>
        <Label class="profile__item">
          <Span class="profile__key" text="name: " />
          <Span class="profile__value" :text="user.firstName+' '+user.lastName" />
        </Label>
        <Label class="profile__item">
          <Span class="profile__key" text="email: " />
          <Span class="profile__value" :text="user.email" />
        </Label>
        <Label class="profile__item">
          <Span class="profile__key" text="phone: " />
          <Span class="profile__value" :text="user.phone" />
        </Label>
        <Label class="profile__item profile__value" text="Your Tickets:" />
        <ListView height="100%" class="profile__list" for="ticket in tickets" :visibility="tickets.length > 0 ? 'visible' : 'collapse'">
          <v-template><Ticket :data="ticket" /></v-template>
        </ListView>
      </StackLayout>
    </RootLayout>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import { Http } from '@nativescript/core'
import Bar from './Bar'
import Ticket from './Events/Ticket'
export default{
  components: {
    Bar, Ticket,
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      role: 'getRole',
    }),
  },
  data(){
    return {
      tickets: []
    }
  },
  methods: {
    requestTickets(){
      Http.request({
        url: `${this.$env.API}/db/tickets?where=userId&value=${this.user.ID}`,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => {
          const tickets = res.content.toJSON()
          tickets.forEach((ticket, index) => {
            this.tickets.push({
              orderId: ticket.orderId,
              ticketId: ticket.ID,
              date: ticket.created,
              size: ticket.size,
              campaignId: ticket.campaignId,
            })
          })
        })
        .catch(err => console.dir(err))
    }
  },
  mounted(){
    this.requestTickets()
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.profile{
  &__list{
    background: transparent;
  }
  &__item{
    padding-bottom: 5;
    margin-top: 10;
    border-bottom-width: 1;
    border-color: $active;
  }
  &__key{
    font-size: 14;
    color: $active;
  }
  &__value{
    font-size: 18;
    color: $second;
  }
}
</style>
