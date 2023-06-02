<template>
    <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout>
        <Label class="header">
          <Span class="header__title" text="Login" />
        </Label>
        <TextField
          class="field field__email"
          hint="Email"
          v-model="email"
          ref="email"
          keyboardType="email"
          returnKeyType="next"
          autocorrect="false"
          autocapitalizationType="none" />
        <TextField
          class="field"
          hint="Password"
          v-model="password"
          ref="password"
          returnKeyType="next"
          autocorrect="false"
          autocapitalizationType="none" />
        <FlexboxLayout
          class="btn__wrap"
          justifyContent="space-between">
          <Button
            :visibility="!loader ? 'visible' : 'collapse'"
            text="Submit"
            class="btn"
            @tap="submit" />
          <ActivityIndicator
            :visibility="loader ? 'visible' : 'collapse'"
            width="47.5%"
            height="50"
            busy="true"
            color="#775A35" />
        </FlexboxLayout>
        <Label
          :text="loginError"
          :class="loginError ? 'error-in' : 'error-out'"
          class="error" />
      </StackLayout>
    </RootLayout>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import Bar from './Bar'
export default {
  components: {
    Bar,
  },
  computed: {
    ...mapGetters({
      loader: 'getLoader',
      loginError: 'getLoginError',
      user: 'getUser',
      role: 'getRole',
    }),
  },
  data(){
    return {
      email: "onyx18121990@gmail.com",
      password: "9J8iak45@",
    }
  },
  methods: {
    submit() {
      this.$store.commit('setLoader', true)
      this.$store.dispatch('requestLogin', {
        email: this.email,
        password: this.password,
      })
        .then(res => {
          if(res){
            this.$navigateBack({
              transition: {
                name: 'slideRight',
                duration: 250
              }
            })
          } else {
            alert(res)
          }
        })
        .catch(err => {
          alert(err)
        })
    },
  }
}
</script>
