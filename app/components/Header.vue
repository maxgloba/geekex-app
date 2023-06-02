<template>
  <FlexboxLayout
    class="header"
    justifyContent="space-between"
    align-items="flex-end">
    <Label class="header__title" :text="title" />
    <StackLayout orientation="horizontal">
      <Button
        :visibility="user ? 'visible' : 'collapse'"
        @tap="goTo(pageProfile)"
        class="icon icon__user"
        text.decode="&#xf007;" />
      <Button
        :visibility="!user ? 'visible' : 'collapse'"
        @tap="goTo(pageLogin)"
        class="icon icon__in"
        text.decode="&#xf2f6;" />
      <Button
        :visibility="user ? 'visible' : 'collapse'"
        @tap="logOut"
        class="icon icon__out"
        text.decode="&#xf2f5;" />
    </StackLayout>
  </FlexboxLayout>
</template>

<script>
import Login from './Login'
import Profile from './Profile'
import { mapGetters } from 'vuex'
export default{
  computed: {
    ...mapGetters({
      user: 'getUser',
      role: 'getRole',
    }),
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      pageLogin: Login,
      pageProfile: Profile,
    }
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
    logOut(){
      this.$store.commit('setUser', false)
      this.$store.commit('setRole', false)
    },
  },
}
</script>
