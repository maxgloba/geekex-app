<template>
  <StackLayout :visibility="visible?'visible':'collapse'">
    <Label
      class="checkout__title"
      text="Billing Information" />
    <TextField
      color="white"
      class="field"
      hint="First name"
      v-model="formData.firstName"
      ref="firstName"
      returnKeyType="next"
      @returnPress="focusLastName()"
      autocorrect="false"
      autocapitalizationType="none" />
    <TextField
      class="field"
      hint="Last name"
      v-model="formData.lastName"
      ref="lastName"
      returnKeyType="next"
      @returnPress="focusEmail()"
      autocorrect="false"
      autocapitalizationType="none" />
    <TextField
      class="field field__email"
      hint="Email"
      v-model="formData.email"
      ref="email"
      keyboardType="email"
      returnKeyType="next"
      @returnPress="focusPhone()"
      autocorrect="false"
      autocapitalizationType="none" />
    <FlexboxLayout
      class="field__wrap"
      justifyContent="space-between">
      <DropDown
        class="field field__country"
        hint="Country"
        @returnPress="focusPhone()"
        ref="size"
        selectedIndex="0"
        returnKeyType="next"
        :items="countries"
        @selectedIndexChanged="countryChanged" />
      <TextField
        class="field field__phone"
        hint="Phone"
        v-model="formData.phone"
        ref="phone"
        minLength="10"
        maxLength="10"
        keyboardType="phone"
        returnKeyType="done"
        @returnPress="submit()"
        autocorrect="false"
        autocapitalizationType="none" />
    </FlexboxLayout>
    <FlexboxLayout
      class="btn__wrap"
      justifyContent="space-between">
      <Button
        text="Back to Tickets"
        class="btn btn__dark"
        @tap="back()" />
      <Button
        :visibility="!loader?'visible':'collapse'"
        text="Continue"
        class="btn"
        @tap="submit()" />
      <ActivityIndicator
        :visibility="loader?'visible':'collapse'"
        width="47.5%"
        height="50"
        busy="true"
        color="#775A35" />
    </FlexboxLayout>
    <Label
      :text="billingError"
      :class="billingError ? 'error-in' : 'error-out'"
      class="error" />
  </StackLayout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'checkout-billing',
  props: {
    visible: Boolean
  },
  computed: {
    ...mapGetters({
      countries: 'getCountries',
      loader: 'getLoader',
      billingError: 'getBillingError',
    }),
  },
  data(){
    return{
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "US +1",
      },
    }
  },
  methods: {
    countryChanged(e){
      this.formData.country = this.countries[e.newIndex]
    },
    focusLastName() {
      this.$refs.lastName.nativeView.focus()
    },
    focusEmail() {
      this.$refs.email.nativeView.focus()
    },
    focusPhone() {
      this.$refs.phone.nativeView.focus()
    },
    validateEmail(email){
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    },
    submit(){
      if(this.formData.firstName.length < 2){
        this.$store.commit('setBillingError', 'Minimum 2 letters for First name field.')
        this.$refs.firstName.nativeView.focus()
      } else if(this.formData.lastName.length < 2){
        this.$store.commit('setBillingError', 'Minimum 2 letters for Last name field.')
        this.$refs.lastName.nativeView.focus()
      } else if(!this.validateEmail(this.formData.email)){
        this.$store.commit('setBillingError', 'Enter a valid email address.')
        this.$refs.email.nativeView.focus()
      } else if(this.formData.phone.length < 10){
        this.$store.commit('setBillingError', 'Minimum 10 numbers for Phone field.')
        this.$refs.phone.nativeView.focus()
      } else {
        this.$store.dispatch('actionBilling', this.formData)
      }
      setTimeout(() => this.$store.commit('setBillingError', false), 4000)
    },
    back(){
      this.$store.commit('setStep', 'tickets')
    }
  },
}
</script>
