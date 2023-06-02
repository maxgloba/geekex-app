<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout height="100%">
        <FlexboxLayout
          class="header"
          alignItems="center"
          justifyContent="space-between">
          <Label class="header__title" text="Orders:" />
          <TextField
            color="white"
            class="field field__search"
            hint="Search"
            v-model="search"
            @textChange="searchOrder"
            returnKeyType="done"
            @returnPress="submit()"
            autocorrect="false"
            autocapitalizationType="none" />
        </FlexboxLayout>
        <FlexboxLayout
          alignItems="flex-start"
          flexWrap="wrap"
          justifyContent="flex-start"
          class="orders__total">
          <StackLayout class="orders__total-item">
            <Label text="GRAND Total:" class="orders__total-key" />
            <Label :text="grandTotal.toFixed(2) | format" class="orders__total-val" />
          </StackLayout>
          <StackLayout class="orders__total-item">
            <Label text="Konnektive Total:" class="orders__total-key" />
            <Label :text="(totals.COMPLETE + totals.REFUNDED).toFixed(2) | format" class="orders__total-val" />
          </StackLayout>
          <StackLayout :visibility="totals.COMPLETE > 0 ? 'visible':'collapse'" class="orders__total-item">
            <Label text="COMPLETE Total:" class="orders__total-key" />
            <Label :text="totals.COMPLETE.toFixed(2) | format" class="orders__total-val" />
          </StackLayout>
          <StackLayout :visibility="totals.PARTIAL > 0 ? 'visible':'collapse'" class="orders__total-item">
            <Label text="PARTIAL Total:" class="orders__total-key" />
            <Label :text="totals.PARTIAL.toFixed(2) | format" class="orders__total-val" />
          </StackLayout>
          <StackLayout :visibility="totals.DECLINED > 0 ? 'visible':'collapse'" class="orders__total-item">
            <Label text="DECLINED Total:" class="orders__total-key" />
            <Label :text="totals.DECLINED.toFixed(2) | format" class="orders__total-val" />
          </StackLayout>
          <StackLayout :visibility="totals.REFUNDED > 0 ? 'visible':'collapse'" class="orders__total-item">
            <Label text="REFUNDED Total:" class="orders__total-key" />
            <Label :text="totals.REFUNDED.toFixed(2) | format" class="orders__total-val" />
          </StackLayout>
          <StackLayout :visibility="totals.CANCELLED > 0 ? 'visible':'collapse'" class="orders__total-item">
            <Label text="CANCELLED Total:" class="orders__total-key" />
            <Label :text="totals.CANCELLED.toFixed(2) | format" class="orders__total-val" />
          </StackLayout>
          <StackLayout :visibility="totals.COD_PENDING > 0 ? 'visible':'collapse'" class="orders__total-item">
            <Label text="COD_PENDING Total:" class="orders__total-key" />
            <Label :text="totals.COD_PENDING.toFixed(2) | format" class="orders__total-val" />
          </StackLayout>
          <StackLayout class="orders__total-item orders__total-export">
            <Button class="btn btn__export" @tap="exportExcel">
              <Span class="fas" text.decode="&#xf1c3;" />
              <Span text="  " />
              <Span text="Export to Excel" />
            </Button>
          </StackLayout>
        </FlexboxLayout>
        <ListView
          :visibility="ordersSort.length > 0 ? 'visible' : 'collapse'"
          class="orders"
          for="(order, index) in ordersSort"
          @itemTap="openOrder">
          <v-template>
            <StackLayout class="orders__item">
              <FlexboxLayout class="orders__item-header" justifyContent="space-between">
                <Label>
                  <Span class="orders__item-status" :text="order.orderStatus" />
                  <Span text=" - " />
                  <Span class="orders__item-id" :text="order.orderId" />
                </Label>
                <Label class="orders__item-total" :text="setOrderTotal(order)" />
              </FlexboxLayout>
              <FlexboxLayout justifyContent="space-between">
                <Label class="orders__item-date" :text="order.dateCreated | setDate" />
                <Label class="orders__item-name" :text="order.lastName+' '+order.firstName" />
              </FlexboxLayout>
              <Label class="orders__item-email" :text="order.emailAddress" />
              <Label class="orders__item-email" :text="order.phoneNumber" />
            </StackLayout>
          </v-template>
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
import Header from '../Header'
import pageOrder from './Order'
export default {
  components: {
    Header, Bar,
  },
  computed: {
    ...mapGetters({
      orders: 'getOrders',
    }),
  },
  filters: {
    setDate: time => {
      const date = new Date(time)
      const mm = date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1
      const dd = date.getDate()
      const yy = date.getFullYear()
      return `${mm}/${dd}/${yy}`
    },
    format: rangep => `$${rangep}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,')
  },
  data(){
    return{
      ordersSort: null,
      search: "",
      pageOrder: pageOrder,
      grandTotal: 0,
      totals: {
        COMPLETE: 0,
        PARTIAL: 0,
        DECLINED: 0,
        REFUNDED: 0,
        CANCELLED: 0,
        COD_PENDING: 0
      },
    }
  },
  methods: {
    openOrder(obj) {
      this.$navigateTo(pageOrder, {
        props: {
          data: obj.item
        },
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    },
    setOrderTotal(order){
      let result
      if(order.orderStatus === 'REFUNDED'){
        result = order.refundRemaining
      } else if(order.totalAmount){
        result = order.totalAmount
      } else {
        result = '0.00'
      }
      return order.currencySymbol + result.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,')
    },
    setTotals(o){
      o.forEach(order => {
        if(order.totalAmount){
          this.totals[order.orderStatus] = Number(this.totals[order.orderStatus]) + Number(order.totalAmount)
        }
        if(order.orderStatus === 'REFUNDED') this.grandTotal = this.grandTotal + Number(order.refundRemaining)
        if(order.orderStatus === 'COMPLETE') this.grandTotal = this.grandTotal + Number(order.totalAmount)
      })
    },
    searchOrder(e){
      this.ordersSort = []
      this.orders.forEach(order => {
        if( order.orderStatus.substring(0, e.value.length) == e.value ||
            order.lastName.substring(0, e.value.length) == e.value ||
            order.firstName.substring(0, e.value.length) == e.value ||
            order.phoneNumber.substring(0, e.value.length) == e.value ||
            order.orderId.search(e.value) > 0 || order.emailAddress.search(e.value) > 0 ){
          this.ordersSort.push(order)
        }
      })
    },
    exportExcel(){
      const ordersExport = []
      this.orders.forEach(order => {
        const date = this.$options.filters.setDate(order.dateCreated)
        const orderObj = {
          'ID': order.orderId,
          'Date': date,
          'Campaign': order.campaignName,
          'Name': `${order.shipFirstName} ${order.shipLastName}`,
          'Email': order.emailAddress,
          'Phone': order.phoneNumber,
          'Status': order.orderStatus,
          'Payment': order.paySource,
          'UTMSource': order.UTMSource,
          'UTMMedium': order.UTMMedium,
          'UTMCampaign': order.UTMCampaign,
          'UTMTerm': order.UTMTerm,
          'UTMContent': order.UTMContent,
          'affId': order.affId,
          'Subtotal': (Number(order.discountPrice) + Number(order.price)).toFixed(2),
          'Discount': order.discountPrice,
          'Total': order.price
        }
        orderObj['Coupon'] = (order.couponCode) ? order.couponCode : ' '
        orderObj['City'] = (order.address1 != 'undefined') ? order.city : ' '
        orderObj['State'] = (order.address1 != 'undefined') ? order.state : ' '
        orderObj['ZIP'] = (order.address1 != 'undefined') ? order.postalCode : ' '
        orderObj['Country'] = (order.address1 != 'undefined') ? order.country : ' '
        orderObj['Billing name'] = (order.address1 != 'undefined') ? `${order.firstName} ${order.lastName}` : ' '
        orderObj['Ticket'] = (order.items && order.items[1]) ? order.items[1].name : ' '
        orderObj['Ticket Qty'] = (order.items && order.items[1]) ? order.items[1].qty : ' '
        orderObj['Ticket Price'] = (order.items && order.items[1]) ? order.items[1].price : ' '
        orderObj['Dinner'] = (order.items && order.items[2]) ? order.items[2].name : ' '
        orderObj['Dinner Qty'] = (order.items && order.items[2]) ? order.items[2].qty : ' '
        orderObj['Dinner Price'] = (order.items && order.items[2]) ? order.items[2].price : ' '
        orderObj['Replay'] = (order.items && order.items[3]) ? order.items[3].name : ' '
        orderObj['Replay Qty'] = (order.items && order.items[3]) ? order.items[3].qty : ' '
        orderObj['Replay Price'] = (order.items && order.items[3]) ? order.items[3].price : ' '
        orderObj['Replay+Notes'] = (order.items && order.items[4]) ? order.items[4].name : ' '
        orderObj['Replay+Notes Qty'] = (order.items && order.items[4]) ? order.items[4].qty : ' '
        orderObj['Replay+Notes Price'] = (order.items && order.items[4]) ? order.items[4].price : ' '
        ordersExport.push(orderObj)
      })
      Http.request({
        url: 'https://api.geekex.com/ts/save-orders',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: {orders: ordersExport}})
      })
        .then(res => {
          Utils.openUrl('https://api.geekex.com/ts/save-orders')
        })
        .catch(err => {
          console.dir(err)
        })
    },
  },
  created(){
    this.ordersSort = this.orders
    this.setTotals(this.orders)
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.orders{
  height: 600;
  min-height: 600;
  max-height: 600;
  &__item{
    background: $second;
    margin-bottom: 15;
    padding: 10;
    border-bottom-width: 6;
    border-color: $active;
    &-header{
      border-bottom-width: 2;
      border-color: $active;
      margin-bottom: 5;
      padding-bottom: 5;
    }
    &-total{
      font-weight: 700;
      text-align: right;
    }
    &-email{
      text-align: right;
      font-size: 13;
    }
    &-status{
      font-weight: 700;
      color: $third;
    }
    &-id{
      font-size: 13;
    }
    &-name{
      font-weight: 700;
    }
    &-date{
      font-size: 13;
    }
  }
  &__total{
    margin-left: -1.333%;
    margin-bottom: 10;
    &-item{
      background-color: $gray;
      padding: 5;
      width: 32%;
      border-radius: 4;
      margin-bottom: 1%;
      margin-left: 1.333%;
    }
    &-export{
      background: transparent;
      padding: 0;
      width: 100%;
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