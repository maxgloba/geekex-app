<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <ScrollView orientation="vertical">
        <StackLayout>
          <FlexboxLayout class="header" alignItems="center" justifyContent="space-between">
            <Label class="header__title" text="Checkout" />
            <Button
              :visibility="tickets.length > 0 ? 'visible' : 'collapse'"
              class="checkout__cart"
              :class="cartAnim ? 'checkout__cart-zoom' : ''"
              text.decode="&#xf07a;"
              @tap="openCart" />
          </FlexboxLayout>
          <CheckoutTickets :visible="step === 'tickets'" />
          <CheckoutBilling :visible="step === 'billing'" />
          <CheckoutPayment :visible="step === 'payment'" />
          <CheckoutValidation :visible="step === 'validation'" />
          <CheckoutThanks :visible="step === 'thanks'" />
        </StackLayout>
      </ScrollView>
    </RootLayout>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckoutCart from './Checkout/Cart'
import CheckoutTickets from './Checkout/Tickets'
import CheckoutBilling from './Checkout/Billing'
import CheckoutPayment from './Checkout/Payment'
import CheckoutValidation from './Checkout/Validation'
import CheckoutThanks from './Checkout/Thanks'
import Bar from '../Bar'
import Header from '../Header'
export default {
  components: {
    Header, Bar,
    CheckoutCart,
    CheckoutTickets,
    CheckoutBilling,
    CheckoutPayment,
    CheckoutValidation,
    CheckoutThanks,
  },
  computed: {
    ...mapGetters({
      tickets: 'getNewTickets',
      step: 'getStep',
    }),
  },
  data(){
    return {
      cartAnim: false,
    }
  },
  watch: {
    tickets: function(n, o) {
      if(n.length > 1){
        this.cartAnim = true
        setTimeout(() => {
          this.cartAnim = false
        }, 1000)
      }
    },
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    openCart(){
      this.$navigateTo(CheckoutCart, {
        props: {
          event: this.event
        },
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    },
  }
}
</script>
