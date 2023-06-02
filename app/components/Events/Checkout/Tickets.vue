<template>
  <StackLayout :visibility="visible?'visible':'collapse'">
    <Label
      class="checkout__title"
      text="Add Tickets" />
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
    <FlexboxLayout
      class="field__wrap"
      justifyContent="space-between">
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
      <DropDown
        class="field field__size"
        hint="Your size"
        @returnPress="focusPhone()"
        ref="size"
        selectedIndex="3"
        returnKeyType="next"
        :items="sweatshirts"
        @selectedIndexChanged="sizeChanged" />
    </FlexboxLayout>
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
    <Label
      class="checkout__info"
      textWrap="true">
      <Span class="checkout__info-bold" text="Important" />
      <Span text=" - if you are buying more than one ticket you need a unique email per ticket." />
      <Span text="Please input the correct First & Last Name and the Email Address of the one who'll attend the GeekOut Event. (So that they'll receive the booking confirmation)" />
    </Label>
    <FlexboxLayout
      class="btn__wrap"
      justifyContent="space-between">
      <Button
        text="Add Ticket"
        class="btn btn__dark"
        @tap="submit()" />
      <Button
        text="Continue"
        class="btn"
        :class="tickets.length > 0 ? '':'btn__disable'"
        :isEnabled="tickets.length > 0"
        @tap="next()" />
    </FlexboxLayout>
    <Label
      :text="ticketError"
      :class="ticketError ? 'error-in' : 'error-out'"
      class="error" />
  </StackLayout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'checkout-tickets',
  props: {
    visible: Boolean
  },
  computed: {
    ...mapGetters({
      tickets: 'getNewTickets',
      countries: 'getCountries',
      ticketError: 'getTicketError',
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
        size: "L"
      },
      sweatshirts: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    }
  },
  methods: {
    sizeChanged(e){
      this.formData.size = this.sweatshirts[e.newIndex]
    },
    countryChanged(e){
      this.formData.country = this.countries[e.newIndex]
    },
    focusFirstName() {
      this.$refs.firstName.nativeView.focus()
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
    focusSize() {
      this.$refs.size.nativeView.focus()
    },
    validateEmail(email){
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    },
    submit(){
      if(this.formData.firstName.length < 2){
        this.$store.commit('setTicketError', 'Minimum 2 letters for First name field.')
        this.focusFirstName()
      } else if(this.formData.lastName.length < 2){
        this.$store.commit('setTicketError', 'Minimum 2 letters for Last name field.')
        this.focusLastName()
      } else if(!this.validateEmail(this.formData.email)){
        this.$store.commit('setTicketError', 'Enter a valid email address.')
        this.focusEmail()
      } else if(this.formData.phone.length < 10){
        this.$store.commit('setTicketError', 'Minimum 10 numbers for Phone field.')
        this.focusPhone()
      } else {
        if(!this.tickets.some(item => item.email === this.formData.email)){
          // const ticketData = this.formData
          this.$store.commit('addNewTicket', this.formData)
          this.formData = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            country: "US +1",
            size: "L"
          }
        } else {
          this.$store.commit('setTicketError', 'The ticket email must be unique!')
          this.focusEmail()
        }
      }
      setTimeout(() => this.$store.commit('setTicketError', false), 4000)
    },
    next(){
      this.$store.commit('setStep', 'billing')
    }
  },
}
</script>
