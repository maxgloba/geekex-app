<template>
  <StackLayout :visibility="visible?'visible':'collapse'">
    <Label
      class="checkout__title"
      text="Order Validation" />
    <FlexboxLayout
      class="validation__info"
      alignItems="flex-start"
      justifyContent="space-between">
      <Button
        @tap="checkbox('covid')"
        :class="covid ? 'checkbox checkbox__active' : 'checkbox'" />
      <Label
        @tap="goTo(pageCovid)"
        class="checkout__info checkout__info-md checkout__info-no"
        textWrap="true">
        <Span text="Confirm that you read and understand the " />
        <Span class="checkout__info-link" text="Covid Waiver" />
        <Span text=" by clicking the box checkbox" />
      </Label>
    </FlexboxLayout>
    <FlexboxLayout
      class="validation__info"
      alignItems="flex-start"
      justifyContent="space-between">
      <Button
        @tap="checkbox('terms')"
        :class="terms ? 'checkbox checkbox__active' : 'checkbox'" />
      <Label
        @tap="goTo(pageTerms)"
        class="checkout__info checkout__info-md checkout__info-no"
        textWrap="true">
        <Span text="I agree to receive automated marketing messages, frequency may vary, at the phone number/email provided. Consent is not a condition to purchase. Msg data rates may apply. View our" />
        <Span class="checkout__info-link" text=" Terms of Service " />
        <Span text="for details. I also understand that I must fill in the event questionnaire, to receive the ticket confirmation. I also understand that this is being done so the GeekOut team will be able to give me a wonderful experience during the event." />
      </Label>
    </FlexboxLayout>
    <Button
      :isEnabled="covid && terms"
      :class="covid && terms ? '':'btn__disable'"
      :visibility="!loader?'visible':'collapse'"
      text="Secure payment"
      class="btn btn__lg btn__secure"
      @tap="submit" />
    <ActivityIndicator
      class="validation__loader"
      :visibility="loader ? 'visible' : 'collapse'"
      width="100%"
      height="75"
      busy="true"
      color="#775A35" />
    <Label
      :text="validationError"
      :class="validationError ? 'error-in' : 'error-out'"
      class="error" />
  </StackLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import pageTerms from './Terms'
import pageCovid from './Covid'
export default {
  name: 'checkout-validation',
  props: {
    visible: Boolean
  },
  data(){
    return{
      covid: false,
      terms: false,
      pageTerms: pageTerms,
      pageCovid: pageCovid,
    }
  },
  computed: {
    ...mapGetters({
      loader: 'getLoader',
      validationError: 'getValidationError',
    }),
  },
  methods: {
    goTo(page){
      this.$navigateTo(page, {
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    },
    submit(){
      this.$store.dispatch('securePayment')
    },
    back(){
      this.$store.commit('setStep', 'payment')
    },
    checkbox(key){
      this[key] = this[key] ? false : true
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.btn__secure{
  margin-top: 30;
  margin-bottom: 15;
}
.validation{
  &__loader{
    margin-top: 25;
  }
  &__info{
    margin-top: 20;
    .checkout__info {
      width: 85%;
      margin-top: 0;
    }
  }
}
</style>