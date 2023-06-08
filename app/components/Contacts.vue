<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <ScrollView orientation="vertical">
        <StackLayout>
          <Header title="Our Contacts" />
          <Label
            class="contact__text"
            text="You can always reach us at:" />
          <Button
            class="contact__link"
            text="(702) 670-0033"
            @tap="callTo(17026700033)" />
          <Button
            class="contact__link"
            text="SUPPORT@GEEKEX.COM"
            @tap="goTo('mailto:support@geekex.com')" />
          <Label
            class="contact__text contact__address"
            textWrap="true"
            text="UNITED STATES, 30 N GOULD ST SUITE 1976, SHERIDAN, WY 82801" />

          <Label
            class="contact__text"
            text="Social network:" />
          <FlexboxLayout class="contact__icon-wrap" justifyContent="flex-start" >
            <Button class="fab contact__icon" text.decode="&#xf099;" @tap="goTo('https://twitter.com/EduGeekout/')" />
            <Button class="fab contact__icon" text.decode="&#xf16d;" @tap="goTo('https://www.instagram.com/accounts/login/?next=/geekout_edu/')" />
            <Button class="fab contact__icon" text.decode="&#xf09a;" @tap="goTo('https://www.facebook.com/geekoutedu/')" />
            <Button class="fab contact__icon" text.decode="&#xf1a0;" @tap="goTo('https://www.google.com.ph/maps/place/Geekout+Events+LLC/@44.7977708,-106.9549504,15z/data=!4m5!3m4!1s0x0:0x9a7583e033c1605!8m2!3d44.7977708!4d-106.9549504?hl=en')" />
          </FlexboxLayout>

          <Label
            textWrap="true"
            class="contact__text"
            text="Got questions, inquiries, suggestions for improvement, or any type of feedback you’d love to share with us?" />

          <Label
            v-if="thanks"
            textWrap="true"
            class="header__sub"
            text="THANK YOU FOR YOUR INFORMATION. WE WILL CONTACT YOU SOON" />

          <StackLayout class="contact__form" v-else>
            <TextField
              color="white"
              class="field"
              hint="Full name"
              v-model="formData.name"
              ref="name"
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
                returnKeyType="next"
                @returnPress="focusEmail()"
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
              @returnPress="focusMessage()"
              autocorrect="false"
              autocapitalizationType="none" />
            <TextView
              class="field field__message"
              hint="Message"
              v-model="formData.message"
              ref="message"
              keyboardType="email"
              returnKeyType="done"
              @returnPress="submit()"
              autocorrect="false"
              autocapitalizationType="none"/>
            <Button
              :visibility="!loader ? 'visible' : 'collapse'"
              text="Submit"
              class="btn btn__lg btn__submit"
              @tap="submit()" />
            <ActivityIndicator
              :visibility="loader ? 'visible' : 'collapse'"
              width="47.5%"
              height="50"
              busy="true"
              color="#775A35" />
            <Label
              :text="error"
              :class="error ? 'error-in' : 'error-out'"
              class="error" />
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </RootLayout>
  </Page>
</template>

<script>
import { Http } from '@nativescript/core'
import Bar from './Bar'
import Header from './Header'
import * as TNSPhone from 'nativescript-phone';
import { Utils } from '@nativescript/core';
import { mapGetters } from 'vuex'
export default {
  components: {
    Header, Bar,
  },
  computed: {
    ...mapGetters({
      countries: 'getCountries',
    }),
  },
  methods: {
    callTo(phone){
      TNSPhone.dial(phone, true);
    },
    goTo(link){
      Utils.openUrl(link)
    },
  },
  data(){
    return{
      thanks: false,
      loader: false,
      error: false,
      formData: {
        name: "",
        email: "",
        phone: "",
        country: "US +1",
        message: "",
      },
    }
  },
  methods: {
    countryChanged(e){
      this.formData.country = this.countries[e.newIndex]
    },
    focusName() {
      this.$refs.name.nativeView.focus()
    },
    focusEmail() {
      this.$refs.email.nativeView.focus()
    },
    focusPhone() {
      this.$refs.phone.nativeView.focus()
    },
    focusMessage() {
      this.$refs.message.nativeView.focus()
    },
    validateEmail(email){
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    },
    submit(){
      this.loader = true
      if(this.formData.name.length < 2){
        this.error = 'Minimum 2 letters for First name field.'
        this.focusName()
      } else if(!this.validateEmail(this.formData.email)){
        this.error = 'Enter a valid email address.'
        this.focusEmail()
      } else if(this.formData.phone.length < 10){
        this.error = 'Minimum 10 numbers for Phone field.'
        this.focusPhone()
      } else {
        Http.request({
          url: 'https://api.geekex.com/nodemailer/contact',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          content: JSON.stringify({params: this.formData})
        })
          .then(res => {
            const result = res.content.toJSON()
            if(result.status === 'success'){
              this.thanks = true
            } else{
              throw result.msg
            }
          })
          .catch(err => {
            this.error = err
            console.dir(err)
          })
          .finally(() => {
            this.loader = false
            setTimeout(() => this.thanks = false, 4000)
            this.formData.name = ""
            this.formData.email = ""
            this.formData.phone = ""
            this.formData.country = "US +1"
            this.formData.message = ""
          })
      }
      setTimeout(() => this.error = false, 4000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.contact{
  &__text{
    color: $second;
    font-size: 16;
    margin-bottom: 10;
  }
  &__icon{
    background-color: transparent;
    color: $active;
    font-size: 30;
    margin-right: 40;
    &-wrap{
      margin-bottom: 15;
    }
  }
  &__link{
    color: $active;
    text-decoration: underline;
    font-size: 20;
    text-align: left;
  }
  &__address{
    margin-top: 15;
    margin-bottom: 30;
  }
  &__form{
    background: $prime;
    padding: 15 10;
  }
}
.btn__submit{
  margin-top: 30;
}
</style>