<template>
  <StackLayout class="checkout__thanks" :visibility="visible?'visible':'collapse'">
    <Label
      class="checkout__title checkout__title-lg"
      text="THANKS!" />
    <Label
      class="checkout__title"
      textWrap="true"
      text="Your ticket will be delivered via email along with more event information. See you there!" />
    <Image
      class="checkout__heart"
      src="~/images/heart.png" width="100" />
    <Button
      class="btn btn__lg"
      text="Back to Events"
      @tap="openEvents" />
  </StackLayout>
</template>

<script>
import EventsList from './../List'
export default {
  name: 'checkout-thanks',
  props: {
    visible: Boolean
  },
  methods: {
    openEvents(event) {
      this.$navigateTo(EventsList, {
        transition: {
          name: 'slideRight',
          duration: 250
        }
      })
      this.$store.commit('resetState')
    },
  }
}
</script>

<style lang="scss" scoped>
.checkout{
  &__thanks{
    margin-top: 50;
  }
  &__title{
    text-align: center;
    margin-bottom: 30;
  }
  &__heart{
    margin-bottom: 30;
  }
}
</style>