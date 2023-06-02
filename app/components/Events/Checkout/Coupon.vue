<template>
  <StackLayout class="coupon">
    <FlexboxLayout
      class="field__wrap"
      justifyContent="space-between"
      alignItems="flex-start">
      <TextField
        class="field field__coupon"
        hint="Discount code"
        v-model="code"
        ref="code"
        returnKeyType="done"
        @returnPress="submit"
        autocorrect="false"
        autocapitalizationType="none" />
      <Button
        :visibility="!loader?'visible':'collapse'"
        text="APPLY"
        :isEnabled="!loader"
        class="btn btn__coupon"
        @tap="submit" />
      <ActivityIndicator
        :visibility="loader?'visible':'collapse'"
        width="30%"
        height="50"
        busy="true"
        color="#775A35" />
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'checkout-coupon',
  computed: {
    ...mapGetters({
      coupon: 'getCoupon',
      loader: 'getLoader',
    }),
  },
  data(){
    return{
      code: ""
    }
  },
  methods: {
    submit(){
      if(this.code !== ""){
        this.$store.dispatch('actionCoupon', this.code)
      } else {
        alert("Coupon code field can't be empty")
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.coupon{
  margin-bottom: 10;
  margin-top: 10;
  border-top-width: 2;
  border-bottom-width: 2;
  border-color: $active;
  padding-top: 15;
  padding-bottom: 15;
}
.field__coupon{
  width: 65%;
  margin-top: 0;
}
.btn__coupon{
  width: 30%;
  height: 50;
}
</style>