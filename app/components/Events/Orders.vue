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
            <Button class="btn btn__export">
              <Span class="fas" text.decode="&#xf1c3;" />
              <Span text="  " />
              <Span text="Export to Excel" />
            </Button>
          </StackLayout>
        </FlexboxLayout>
        <ListView
          :visibility="orders.length > 0 ? 'visible' : 'collapse'"
          class="orders"
          for="(order, index) in orders"
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
      console.log('setTotals -------------------------------------------')
      console.dir(0)
      o.forEach(order => {
        if(order.totalAmount){
          this.totals[order.orderStatus] = Number(this.totals[order.orderStatus]) + Number(order.totalAmount)
        }
        if(order.orderStatus === 'REFUNDED') this.grandTotal = this.grandTotal + Number(order.refundRemaining)
        if(order.orderStatus === 'COMPLETE') this.grandTotal = this.grandTotal + Number(order.totalAmount)
      })
    },
  },
  created(){
    this.setTotals(this.orders)
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.orders{
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