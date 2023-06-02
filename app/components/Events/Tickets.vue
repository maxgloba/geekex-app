<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout height="100%">
        <Label class="header">
          <Span class="header__title" text="Tickets:" />
        </Label>
        <FlexboxLayout>
          <Label class="ticket__total-item">
            <Span text="Tickets Count: " class="ticket__total-key" />
            <Span :text="tickets.length" class="ticket__total-val" />
          </Label>
        </FlexboxLayout>
        <ListView
          height="100%"
          class="ticket__list"
          for="ticket in tickets"
          :visibility="tickets.length > 0 ? 'visible' : 'collapse'">
          <v-template><Ticket :data="ticket" /></v-template>
        </ListView>

      </StackLayout>
    </RootLayout>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import Bar from '../Bar'
import Ticket from '../Partials/Ticket'
export default {
  components: {
    Bar, Ticket
  },
  computed: {
    ...mapGetters({
      tickets: 'getTickets',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.ticket{
  &__list{
    background: transparent;
  }
  &__total{
    &-item{
      background-color: $gray;
      padding: 5;
      border-radius: 4;
    }
    &-key{
      font-size: 12;
      color: $second;
    }
    &-val{
      font-size: 16;
      color: $second;
      font-weight: 700;
    }
  }
}
</style>
