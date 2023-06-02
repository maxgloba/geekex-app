<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <FlexboxLayout
        class="cart"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="space-between">
        <StackLayout class="cart__block cart__block-top">
          <Label
            class="cart__title"
            :text="tickets.length > 0 ? 'YOUR ORDER' : 'Please Add Ticket to calculate Total price'" />
          <ListView
            height="100%"
            class="cart__list"
            for="(item, index) in tickets">
            <v-template><CartTicket :data="item" :price="price" :index="index" /></v-template>
          </ListView>
          <!-- <ListView
            height="100%"
            class="cart__list"
            for="(item, index) in tickets">
            <v-template>
              <FlexboxLayout
              class="cart__item"
              alignItems="flex-start"
              justifyContent="space-between">
                <FlexboxLayout height="100%" alignItems="flex-start">
                  <Image
                    class="cart__img"
                    :src="`~/images/events/${event.img}`" />
                  <StackLayout class="cart__user">
                    <Label>
                      <Span class="cart__user-key" text="name: " />
                      <Span class="cart__user-value" :text="item.firstName+' '" />
                      <Span class="cart__user-value" :text="item.lastName" />
                    </Label>
                    <Label>
                      <Span class="cart__user-key" text="email: " />
                      <Span class="cart__user-value" :text="item.email" />
                    </Label>
                    <Label>
                      <Span class="cart__user-key" text="phone: " />
                      <Span class="cart__user-value" :text="item.country+item.phone" />
                    </Label>
                    <Label>
                      <Span class="cart__user-key" text="size: " />
                      <Span class="cart__user-value" :text="item.size" />
                    </Label>
                  </StackLayout>
                </FlexboxLayout>
                <FlexboxLayout
                  flexDirection="column"
                  justifyContent="space-between">
                  <Button class="cart__remove" text="+" @tap="removeTicket(index)" />
                  <Label class="cart__user-value" :text="'$'+price" />
                </FlexboxLayout>
              </FlexboxLayout>
            </v-template>
          </ListView> -->
        </StackLayout>
        <StackLayout class="cart__block cart__block-bottom" ref="blockBottom">
          <Coupon />
          <FlexboxLayout justifyContent="space-between">
            <Label class="cart__user-key" text="Subtotal: " />
            <Label class="cart__user-value" :text="'$'+(price*tickets.length).toFixed(2)" />
          </FlexboxLayout>
          <FlexboxLayout class="cart__border" justifyContent="space-between">
            <Label class="cart__user-key" text="Discount: " />
            <Label class="cart__user-value" :text="coupon ? coupon.couponDiscountPerc+'%' : '0%'" />
          </FlexboxLayout>
          <FlexboxLayout class="cart__border" justifyContent="space-between">
            <Label class="cart__user-key cart__user-bold" text="TOTAL: " />
            <Label
              class="cart__user-value cart__user-bold"
              :text="coupon ? '$'+(price * tickets.length - price * tickets.length * coupon.couponDiscountPerc / 100).toFixed(2) : '$'+(price*tickets.length).toFixed(2)" />
          </FlexboxLayout>
        </StackLayout>
      </FlexboxLayout>
    </RootLayout>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import Coupon from './Coupon'
import Bar from '../../Bar'
import CartTicket from './Ticket'
export default {
  name: 'checkout-cart',
  computed: {
    ...mapGetters({
      tickets: 'getNewTickets',
      price: 'getPrice',
      coupon: 'getCoupon',
    }),
  },
  components: {
    Coupon, Bar, CartTicket,
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.cart{
  background: transparent;
  color: $second;
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
  &__user{
    color: $active;
    font-size: 14;
    Label{
      margin-bottom: 2;
    }
    &-key{
      margin-right: 5;
    }
    &-bold{
      font-weight: 900;
    }
    &-value{
      color: $second;
      font-weight: 700;
    }
  }
  &__border{
    margin-top: 10;
    border-top-width: 2;
    border-color: $active;
    padding-top: 15;
  }
  &__remove{
    color: $second;
    font-size: 20px;
    line-height: 1;
    transform: rotate(45deg);
    margin-left: auto;
    padding: 0;
    margin: 0;
  }
  &__block{
    width: 100%;
    &-top{
    }
    &-bottom{
      min-height: 230;
      max-height: 230;
      height: 230;
    }
  }
}
</style>
