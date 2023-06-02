<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout height="100%">
        <Header title="Events" />
        <ListView
          class="events"
          for="item in events"
          @itemTap="onItemTap">
          <v-template>
            <StackLayout class="events__wrap">
              <Label class="events__title-wrap">
                <Span
                  class="events__title"
                  :text="item.title" />
                <Span
                  class="events__title"
                  text=" / " />
                <Span
                  class="events__year"
                  :text="item.year" />
              </Label>
              <Label>
                <Span class="events__desc" :text="limit(item.desc, 30)" />
                <Span class="events__desc events__desc-line" text="Read More" />
              </Label>
              <Image
                class="events__img"
                :src="`~/images/events/${item.img}`"
                :alt="item.title" />
            </StackLayout>
          </v-template>
        </ListView>
      </StackLayout>
    </RootLayout>
  </Page>
</template>

<script>
import Bar from '../Bar'
import Header from '../Header'
import { mapGetters } from 'vuex'
import { Http } from '@nativescript/core'
import EventsItem from './Item'
export default {
  components: {
    Header, Bar,
  },
  data(){
    return{
      pageEvent: EventsItem,
    }
  },
  computed: {
    ...mapGetters({
      events: 'getEvents',
    }),
  },
  methods: {
    onItemTap(event) {
      this.$navigateTo(EventsItem, {
        props: {
          event: event.item
        },
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    },
    limit(string = '', limit = 0) {
      let result = string.substring(0, limit)
      result += string.length < limit ? '.' : '...'
      result += ' '
      return result
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.events{
  background: transparent;
  height: 100%;
  width: 100%;
  &:active{background: transparent;}
  &__wrap{
    background: transparent;
    margin-top: 40;
    &:active{
      opacity: 1;
      background: transparent;
    }
  }
  &__list{
    background: transparent;
    &:active{background: transparent;}
  }
  &__title{
    font-weight: 700;
    font-size: 20;
    color: $second;
    &-wrap{
      margin-bottom: 10;
    }
  }
  &__desc{
    font-size: 15;
    line-height: 1.5;
    color: $second;
    background: transparent;
    &-line{
      text-decoration: underline;
      font-weight: 600;
    }
  }
  &__year{
    font-weight: 700;
    font-size: 20;
    color: $active;
    opacity: .6;
  }
  &__img{
    margin-top: 15;
  }
}
</style>