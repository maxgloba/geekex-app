<template>
  <StackLayout class="coupons">
    <FlexboxLayout
      class="coupons__head"
      justifyContent="space-between">
      <Label class="coupons__bold" text="USED COUPONS" />
      <Label class="coupons__bold" text="COUNT" />
    </FlexboxLayout>
    <FlexboxLayout
      class="coupons__item"
      justifyContent="space-between">
      <Label class="coupons__bold" text="Grand Total" />
      <Label class="coupons__bold" :text="Object.keys(coupons).reduce((partialSum, code) => partialSum + coupons[code], 0)" />
    </FlexboxLayout>
    <ListView
      class="coupons__list"
      for="code in Object.keys(coupons)">
      <v-template>
        <FlexboxLayout
          class="coupons__item"
          justifyContent="space-between">
          <Label :text="code" />
          <Label :text="coupons[code]" />
        </FlexboxLayout>
      </v-template>
    </ListView>
  </StackLayout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      tickets: 'getTickets',
      orders: 'getOrders',
    }),
  },
  data(){
    return{
      coupons: {},
    }
  },
  methods: {
    getCoupons(orders){
      this.orders.forEach(order => {
        this.coupons[order.couponCode] = this.coupons[order.couponCode] ? this.coupons[order.couponCode] + 1 : 1
      })
    },
  },
  created(){
    this.getCoupons(this.orders)
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.coupons{
  background-color: $gray;
  padding: 15 10;
  Label{
    color: $second;
  }
  &__head{
    margin-bottom: 15;
    padding-bottom: 5;
    margin-bottom: 10;
    border-bottom-width: 1;
    border-color: $second;
    Label{
      font-size: 16;
    }
  }
  &__item{
    padding-bottom: 5;
    margin-bottom: 10;
    border-bottom-width: 1;
    border-color: $second;
  }
  &__bold{
    font-weight: 700;
  }
}
</style>