<template>
  <FlexboxLayout
    class="cart"
    alignItems="flex-start"
    flexDirection="column"
    justifyContent="space-between">
    <StackLayout
      class="cart__block cart__block-bottom"
      ref="blockBottom">
      <Label
        class="cart__title"
        text="YOUR ORDER:" />
      <FlexboxLayout justifyContent="space-between">
        <Image class="course__img" :src="`~/images/courses/${course.campaignProductId}.png`" />
        <Label class="course__title" :text="course.productName" />
      </FlexboxLayout>
      <Coupon />
      <FlexboxLayout justifyContent="space-between">
        <Label
          class="cart__key"
          text="Subtotal: " />
        <Label
          class="cart__value"
          :text="course.price | format" />
      </FlexboxLayout>
      <FlexboxLayout
        class="cart__border"
        justifyContent="space-between">
        <Label
          class="cart__key"
          text="Discount: " />
        <Label
          class="cart__value"
          :text="coupon ? coupon.couponDiscountPerc+'%' : '0%'" />
      </FlexboxLayout>
      <FlexboxLayout
        class="cart__border"
        justifyContent="space-between">
        <Label
          class="cart__key cart__bold"
          text="TOTAL: " />
        <Label
          class="cart__value cart__bold"
          :text="grandTotal | format" />
      </FlexboxLayout>
    </StackLayout>
  </FlexboxLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import Coupon from './Coupon'
export default {
  name: 'checkout-cart',
  computed: {
    ...mapGetters({
      coupon: 'getCoupon',
    }),
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  components: {
    Coupon,
  },
  data(){
    return{
      grandTotal: 0
    }
  },
  filters: {
    format: rangep => `$${rangep}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,')
  },
  watch: {
    coupon(value){
      this.grandTotal = this.course.price - this.course.price * this.coupon.couponDiscountPerc / 100
    }
  },
  mounted(){
    this.grandTotal = this.course.price
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.cart{
  background: $prime;
  color: $second;
  padding-top: 20;
  padding-bottom: 20;
  &__list{
    background: transparent;
  }
  &__item{
    margin-bottom: 10;
  }
  &__title{
    color: $active;
    font-weight: 700;
    font-size: 16;
    margin-bottom: 10;
  }
  &__img{
    width: 75;
    margin-right: 10;
  }
  &__key{
    margin-right: 5;
    font-size: 13;
    color: $active;
  }
  &__bold{
    font-weight: 700;
  }
  &__value{
    color: $second;
    font-size: 15;
    font-weight: 500;
  }
  &__border{
    margin-top: 10;
    border-top-width: .5;
    border-color: $second;
    padding-top: 10;
  }
  &__block{
    width: 100%;
    padding-left: 10;
    padding-right: 10;
  }
}
.course{
  &__img{
    width: 30%;
  }
  &__title{
    width: 65%;
  }
}
</style>
