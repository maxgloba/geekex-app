<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <ScrollView orientation="vertical">
        <StackLayout class="order">
          <Label class="header">
            <Span class="header__title" text="Order" />
            <Span class="header__title" text=" - " />
            <Span class="header__sub" :text="data.orderId" />
          </Label>

          <StackLayout class="order-info">
            <Label class="order-title" text="Order Information:" />
            <Label class="order-item">
              <Span text="date: " />
              <Span class="order-item--bold" :text="data.dateCreated" />
            </Label>
            <Label class="order-item">
              <Span text="name: " />
              <Span class="order-item--bold" :text="data.shipFirstName +' '+ data.shipLastName" />
            </Label>
            <Label class="order-item">
              <Span text="status: " />
              <Span class="order-item--bold" :text="data.orderStatus" />
            </Label>
            <Label class="order-item" :visibility="data.paySource ? 'visible':'collapse'">
              <Span text="payment: " />
              <Span class="order-item--bold" :text="data.paySource" />
            </Label>
          </StackLayout>

          <StackLayout class="order-billing" :visibility="data.address1 != 'undefined' ? 'visible':'collapse'" >
            <Label class="order-title" text="Billing Address:" />
            <Label class="order-item">
              <Span class="order-item--bold" :text="data.firstName +' '+ data.lastName" />
            </Label>
            <Label class="order-item">
              <Span class="order-item--bold" :text="data.address1" />
            </Label>
            <Label class="order-item">
              <Span class="order-item--bold" :text="data.city+', '+data.state+', '+data.postalCode+', '+data.country" />
            </Label>
          </StackLayout>

          <StackLayout class="order-contact">
            <Label class="order-title" text="Contact Info:" />
            <Label class="order-item">
              <Span text="email: " />
              <Span class="order-item--bold" :text="data.emailAddress" />
            </Label>
            <Label class="order-item">
              <Span text="phone: " />
              <Span class="order-item--bold" :text="data.phoneNumber" />
            </Label>
          </StackLayout>

          <StackLayout :visibility="data.items ? 'visible':'collapse'" class="order-summary">
            <Label class="order-title" text="Item Summary:" />

            <ListView class="order-table--list" for="item in rebuildItems(data.items)">
              <v-template>
                <FlexboxLayout class="order-table--item" justifyContent="space-between">
                  <Label :text="item.name+' *'+item.qty" />
                  <Label class="order-table--price" :text="item.price | format" />
                </FlexboxLayout>
              </v-template>
            </ListView>

            <FlexboxLayout class="order-table--item" justifyContent="space-between">
              <Label text="Subtotal:" />
              <Label class="order-table--price" :text="(Number(data.discountPrice) + Number(data.price)).toFixed(2) | format" />
            </FlexboxLayout>

            <FlexboxLayout :visibility="data.couponCode ? 'visible':'collapse'" class="order-table--item" justifyContent="space-between">
              <Label text="Coupon Code:" />
              <Label class="order-table--price" :text="data.couponCode ? data.couponCode : '----'" />
            </FlexboxLayout>

            <FlexboxLayout :visibility="data.couponCode ? 'visible':'collapse'" class="order-table--item" justifyContent="space-between">
              <Label text="Discount:" />
              <Label class="order-table--price">
                <Span text="-" />
                <Span :text="data.discountPrice | format" />
              </Label>
            </FlexboxLayout>

            <FlexboxLayout class="order-table--item" justifyContent="space-between">
              <Label class="order-table--bold" text="TOTAL:" />
              <Label class="order-table--bold order-table--price" :text="data.price | format" />
            </FlexboxLayout>

            <FlexboxLayout :visibility="data.refundRemaining && Number(data.refundRemaining) > 0 ? 'visible':'collapse'" class="order-table--item" justifyContent="space-between">
              <Label text="Remaining:" />
              <Label class="order-table--price" :text="data.refundRemaining | format" />
            </FlexboxLayout>
          </StackLayout>

          <Label class="order-title" text="Your Tickets:" />
          <ListView height="100%" class="profile__list" for="ticket in tickets" :visibility="tickets.length > 0 ? 'visible' : 'collapse'">
            <v-template><Ticket :data="ticket" /></v-template>
          </ListView>

        </StackLayout>
      </ScrollView>
    </RootLayout>
  </Page>
</template>

<script>
import { Http } from '@nativescript/core'
import Bar from '../Bar'
import Ticket from './OrderTicket'
export default {
  components: {
    Bar, Ticket,
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      tickets: [],
    }
  },
  methods: {
    rebuildItems(items){
      const array = []
      if(items){
        Object.keys(items).forEach(item => {
          array.push(items[item])
        })
      }
      return array
    }
  },
  filters: {
    setDate: time => new Date(time).toLocaleString('en', {month: '2-digit', day: '2-digit', year: 'numeric'}),
    format: rangep => `$${rangep}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,')
  },
  mounted(){
    Http.request({
      url: `${this.$env.API}/db/tickets?where=orderId&value=${this.data.orderId}`,
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(res => {
        const response = res.content.toJSON()
        response.forEach(ticket => {
          Http.request({
            url: `${this.$env.API}/db/users?where=ID&value=${ticket.userId}`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
          })
            .then(res => {
              const user = res.content.toJSON()
              const ticketData = {
                orderId: this.data.orderId,
                campaignId: this.data.campaignId,
                ticketId: ticket.ID,
                userId: ticket.userId,
                quiz: JSON.parse(ticket.quiz),
                date: ticket.created,
                size: ticket.size
              }
              if(user.length > 0){
                ticketData.user = {
                  firstName: user[0].firstName,
                  lastName: user[0].lastName,
                  email: user[0].email,
                  phone: user[0].phone,
                  image: user[0].image
                }
              }
              this.tickets.push(ticketData)
            })
          })
      })
      .catch(err => {
        console.dir(err)
      })
  }
}
</script>

<style scoped lang="scss">
@import '~/scss/variables';
.order{
  color: $second;
  font-size: 14;
  &-info{
    margin-bottom: 15;
  }
  &-summary{
    margin-top: 30;
    margin-bottom: 30;
    background: $gray;
    padding: 10 10 20;
  }
  &-title{
    font-size: 18;
    margin-bottom: 10;
    margin-top: 10;
  }
  &-item{
    margin-bottom: 2;
    &--bold{
      font-weight: 700;
      color: $active;
      padding-left: 5;
      font-size: 16;
    }
  }
  &-table{
    margin-top: 30;
    &--item{
      border-color: $second;
      border-bottom-width: 1;
      padding-bottom: 5;
      margin-bottom: 5;
    }
    &--price{
      color: $active;
      font-weight: 700;
    }
    &--bold{
      font-weight: 700;
      font-size: 16;
    }
  }
}
ListView.order-table--list{
  min-height: 0;
}
</style>
