<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout height="100%">
        <Label class="header">
          <Span class="header__title" text="Dashboard:" />
        </Label>
        <FlexboxLayout
          class="dashboard__wrap"
          flexWrap="wrap"
          justifyContent="space-between">
          <DashboardItem
            class="dashboard__item"
            title="ATTENDEES"
            :value="tickets.length"
            valueStr="" />
          <DashboardItem
            class="dashboard__item"
            title="REVENUE"
            :value="revenue"
            valueStr="$" />
          <DashboardItem
            class="dashboard__item"
            title="QUESTIONNAIRES"
            :value="ticketsQuiz"
            valueStr="" />
          <DashboardItem
            class="dashboard__item"
            title="TOTAL DISCOUNT"
            :value="totalDiscount"
            valueStr="$" />
        </FlexboxLayout>
        <Coupons />
      </StackLayout>
    </RootLayout>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import Bar from '../Bar'
import Coupons from './Coupons'
import DashboardItem from './DashboardItem'
export default {
  components: {
    Bar, Coupons, DashboardItem,
  },
  computed: {
    ...mapGetters({
      tickets: 'getTickets',
      orders: 'getOrders',
    }),
  },
  data(){
    return{
      revenue: 0,
      ticketsQuiz: 0,
      totalDiscount: 0,
    }
  },
  methods: {
    getTotals(orders){
      this.orders.forEach(order => {
        this.revenue = this.revenue + Number(order.totalAmount)
        this.totalDiscount = this.totalDiscount + Number(order.totalDiscount)
      })
    },
  },
  created(){
    this.getTotals(this.orders)
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.dashboard{
  &__wrap{}
  &__item{
    width: 48%;
    margin-bottom: 2%;
  }
}
</style>
