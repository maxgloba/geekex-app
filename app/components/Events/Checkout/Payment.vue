<template>
  <StackLayout :visibility="visible?'visible':'collapse'">
    <Label
      class="checkout__title"
      text="Payment Information" />
    <TextField
      color="white"
      class="field"
      hint="Card number"
      v-model="formData.cardNumber"
      ref="cardNumber"
      @textChange="inputCardNumber"
      minLength="18"
      maxLength="19"
      keyboardType="phone"
      returnKeyType="next"
      @returnPress="focusCardDate"
      autocorrect="false"
      autocapitalizationType="none" />
    <FlexboxLayout
      class="field__wrap"
      justifyContent="space-between">
      <TextField
        color="white"
        class="field field__date"
        hint="Card date"
        v-model="formData.cardDate"
        @textChange="inputCardDate"
        minLength="7"
        maxLength="7"
        ref="cardDate"
        keyboardType="phone"
        returnKeyType="next"
        @returnPress="focusCardSecurityCode"
        autocorrect="false"
        autocapitalizationType="none" />
      <TextField
        color="white"
        class="field field__code"
        hint="CVV"
        v-model="formData.cardSecurityCode"
        minLength="3"
        maxLength="4"
        ref="cardSecurityCode"
        keyboardType="phone"
        returnKeyType="done"
        @returnPress="submit"
        autocorrect="false"
        autocapitalizationType="none" />
    </FlexboxLayout>
    <FlexboxLayout
      class="btn__wrap"
      justifyContent="space-between">
      <Button
        text="Back to Billing"
        class="btn btn__dark"
        @tap="back" />
      <Button
        text="Continue"
        class="btn"
        @tap="submit" />
    </FlexboxLayout>
    <Label
      :text="paymentError"
      :class="paymentError ? 'error-in' : 'error-out'"
      class="error" />
  </StackLayout>
</template>

<script>
export default {
  name: 'checkout-tickets',
  props: {
    visible: Boolean
  },
  data(){
    return{
      paymentError: false,
      formData: {
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardSecurityCode: "",
        cardDate: "",
      },
    }
  },
  methods: {
    focusCardDate() {
      this.$refs.cardDate.nativeView.focus()
    },
    focusCardSecurityCode() {
      this.$refs.cardSecurityCode.nativeView.focus()
    },
    inputCardNumber() {
      setTimeout(()=>{
        let arr = this.formData.cardNumber.replace(/[^\dA-Z]/g, '').replace(/[\s]/g, '').split('')
        if (arr.length > 4) arr.splice(4, 0, ' ')
        if (arr.length > 9) arr.splice(9, 0, ' ')
        if (arr.length > 14) arr.splice(14, 0, ' ')
        this.formData.cardNumber = arr.toString().replace(/[,]/g, '')
      }, 0)
    },
    inputCardDate() {
      setTimeout(()=>{
        let arr = this.formData.cardDate.replace(/[^\dA-Z]/g, '').replace(/[\s]/g, '').split('')
        if (arr.length > 2) arr.splice(2, 0, ' / ')
        this.formData.cardDate = arr.toString().replace(/[,]/g, '')
      }, 0)
    },
    submit(){
      console.log('1111');
      const data = {
        cardNumber: this.formData.cardNumber.replace(/[^\dA-Z]/g, '').replace(/[\s]/g, ''),
        cardMonth: this.formData.cardDate.substring(2,0),
        cardYear: Number(20 + this.formData.cardDate.substr(this.formData.cardDate.length-2)),
        cardSecurityCode: this.formData.cardSecurityCode,
      }
      const date = new Date()
      if(data.cardNumber.length !== 16){
        this.paymentError = "Minimum 16 letters for Card number field."
        this.$refs.cardNumber.nativeView.focus()
      } else if(Number(data.cardMonth) <= date.getMonth() || Number(data.cardMonth) > 12){
        this.paymentError = "Card month number isn't right."
        this.$refs.cardDate.nativeView.focus()
      } else if(Number(data.cardYear) < date.getFullYear()){
        this.paymentError = "Card year isn't right."
        this.$refs.cardDate.nativeView.focus()
      } else if(data.cardSecurityCode.length < 3){
        this.paymentError = "Card security code isn't right"
        this.$refs.cardSecurityCode.nativeView.focus()
      } else {
        this.$store.commit('setPayment', data)
        this.$store.commit('setStep', 'validation')
      }
      setTimeout(() => this.paymentError = false, 4000)
    },
    back(){
      this.$store.commit('setStep', 'billing')
    }
  },
}
</script>
