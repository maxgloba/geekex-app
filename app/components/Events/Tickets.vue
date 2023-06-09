<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout height="100%">
        <Label class="header">
          <Span class="header__title" text="Tickets " />
          <Span class="header__sub" :text="`(${tickets.length}):`" />
        </Label>
        <StackLayout class="orders__total-item orders__total-export">
          <Button class="btn btn__export" @tap="exportExcel">
            <Span class="fas" text.decode="&#xf1c3;" />
            <Span text="  " />
            <Span text="Export to Excel" />
          </Button>
        </StackLayout>
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
import { Http } from '@nativescript/core'
import { Utils } from '@nativescript/core';
import { mapGetters } from 'vuex'
import Bar from '../Bar'
import Ticket from '../Events/Ticket'
export default {
  components: {
    Bar, Ticket
  },
  computed: {
    ...mapGetters({
      tickets: 'getTickets',
    }),
  },
  methods: {
    exportExcel(){
      const ticketsExport = []
      this.tickets.forEach(ticket => {
        const date = new Date(Number(ticket.date)).toLocaleString('en', {month: '2-digit', day: '2-digit', year: 'numeric'})
        const ticketObj = {
          'ID': ticket.ticketId,
          'Date': date,
          'Name': `${ticket.user.firstName} ${ticket.user.lastName}`,
          'Email': ticket.user.email,
          'Quiz': (ticket.quiz) ? 'True' : 'False',
          'Phone': (ticket.user.phone) ? ticket.user.phone : ' ',
          'Size': (ticket.size) ? ticket.size : ' '
        }
        ticketsExport.push(ticketObj)
      })
      Http.request({
        url: `${this.$env.API}/ts/save-tickets`,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: {tickets: ticketsExport}})
      })
        .then(res => {
          Utils.openUrl(`${this.$env.API}/ts/save-tickets`)
        })
        .catch(err => {
          console.dir(err)
        })
    }
  }
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
