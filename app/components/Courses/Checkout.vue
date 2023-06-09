<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <ScrollView orientation="vertical">
        <StackLayout
          v-if="courseThanks"
          class="checkout__thanks">
          <Label
            class="checkout__title checkout__title-lg"
            text="Thank you for your order!" />
          <Label
            class="checkout__thanks-title"
            textWrap="true"
            text="The GeekEx manager will call you soon" />
          <Image
            class="checkout__heart"
            src="~/images/heart.png" width="100" />
          <Button
            class="btn btn__lg"
            text="Back to Courses"
            @tap="openCourses" />
        </StackLayout>
        <StackLayout v-else>
          <Label
            class="checkout__title"
            text="Billing Information" />
          <FlexboxLayout
            class="field__wrap"
            justifyContent="space-between">
            <TextField
              color="white"
              class="field field__fname"
              hint="First name"
              v-model="formData.firstName"
              ref="firstName"
              returnKeyType="next"
              @returnPress="focusLastName"
              autocorrect="false"
              autocapitalizationType="none" />
            <TextField
              class="field field__lname"
              hint="Last name"
              v-model="formData.lastName"
              ref="lastName"
              returnKeyType="next"
              @returnPress="focusEmail"
              autocorrect="false"
              autocapitalizationType="none" />
          </FlexboxLayout>
          <TextField
            class="field field__email"
            hint="Email"
            v-model="formData.email"
            ref="email"
            keyboardType="email"
            returnKeyType="next"
            @returnPress="focusPhone"
            autocorrect="false"
            autocapitalizationType="none" />
          <FlexboxLayout
            class="field__wrap field__space"
            justifyContent="space-between">
            <DropDown
              class="field field__country"
              hint="Country"
              @returnPress="focusPhone"
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
              @returnPress="focusCardNumber"
              autocorrect="false"
              autocapitalizationType="none" />
          </FlexboxLayout>
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
            class="field__wrap field__space"
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
          <Cart
            class="field__space"
            :course="course" />
          <Button
            v-if="!loader"
            text="Submit"
            class="btn btn__lg btn__submit"
            @tap="submit" />
          <ActivityIndicator
            v-if="loader"
            width="100%"
            height="50"
            busy="true"
            color="#775A35" />
          <Label
            :text="error"
            :class="error ? 'error-in' : 'error-out'"
            class="error" />
        </StackLayout>
      </ScrollView>
    </RootLayout>
  </Page>
</template>

<script>
import Bar from '../Bar'
import Cart from './Cart'
import Courses from './Courses'
import { mapGetters } from 'vuex'
export default {
  components: {
    Bar, Cart,
  },
  data(){
    return {
      error: false,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: "US +1",
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardSecurityCode: '',
        cardDate: '',
      },
      // formData: {
      //   firstName: 'Max',
      //   lastName: 'Globa',
      //   email: 'onyx18121990@gmail.com',
      //   phone: '1234567890',
      //   country: "US +1",
      //   cardNumber: '4111111111111111',
      //   cardMonth: '10',
      //   cardYear: '26',
      //   cardSecurityCode: '123',
      //   cardDate: '10/26',
      // },
    }
  },
  computed: {
    ...mapGetters({
      countries: 'getCountries',
      loader: 'getLoader',
      courseThanks: 'getCourseThanks',
    }),
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  filters: {
    format: rangep => `$${rangep}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,')
  },
  methods: {
    openCourses() {
      this.$navigateTo(Courses, {
        transition: {
          name: 'slideRight',
          duration: 250
        }
      })
      this.$store.commit('setCourseThanks', false)
    },
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
    focusCardNumber() {
      this.$refs.cardNumber.nativeView.focus()
    },
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
      const data = {
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        phone: this.formData.phone,
        country: this.formData.country,
        cardNumber: this.formData.cardNumber.replace(/[^\dA-Z]/g, '').replace(/[\s]/g, ''),
        cardMonth: this.formData.cardDate.substring(2,0),
        cardYear: Number(20 + this.formData.cardDate.substr(this.formData.cardDate.length-2)),
        cardSecurityCode: this.formData.cardSecurityCode,
        campaignProductId: this.course.campaignProductId,
      }
      const date = new Date()
      if(data.firstName.length < 2){
        this.error = 'Minimum 2 letters for First name field.'
        this.$refs.firstName.nativeView.focus()
      } else if(data.lastName.length < 2){
        this.error = 'Minimum 2 letters for Last name field.'
        this.$refs.lastName.nativeView.focus()
      } else if(!this.validateEmail(data.email)){
        this.error = 'Enter a valid email address.'
        this.$refs.email.nativeView.focus()
      } else if(data.phone.length < 10){
        this.error = 'Minimum 10 numbers for Phone field.'
        this.$refs.phone.nativeView.focus()
      } else if(data.cardNumber.length !== 16){
        this.error = "Minimum 16 letters for Card number field."
        this.$refs.cardNumber.nativeView.focus()
      } else if(Number(data.cardMonth) <= date.getMonth() || Number(data.cardMonth) > 12){
        this.error = "Card month number isn't right."
        this.$refs.cardDate.nativeView.focus()
      } else if(Number(data.cardYear) < date.getFullYear()){
        this.error = "Card year isn't right."
        this.$refs.cardDate.nativeView.focus()
      } else if(data.cardSecurityCode.length < 3){
        this.error = "Card security code isn't right"
        this.$refs.cardSecurityCode.nativeView.focus()
      } else {
        this.$store.dispatch('actionCoursePayment', data)
      }
      setTimeout(() => this.error = false, 4000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.btn__submit{
  margin-bottom: 10;
}
.checkout{
  &__thanks{
    margin-top: 50;
    &-title{
      text-align: center;
      margin-bottom: 30;
    }
  }
  &__heart{
    margin-bottom: 30;
  }
}
</style>
