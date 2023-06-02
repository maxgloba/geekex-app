<template>
  <ActionBar class="head">
    <NavigationButton
      class="head__back"
      color="green"
      @tap="$navigateBack" />
    <StackLayout orientation="horizontal">
      <Image
        text="right"
        horizontalAlignment="right"
        src="~/images/logo.png"
        width="120" />
    </StackLayout>
  </ActionBar>
</template>


<style lang="scss" scoped>
@import '~/scss/variables';
.head{
  padding: 10px;
  background: $prime;
  width: 100%;
  &__back{
    background-color: #fff !important;
    color: #fff !important;
    border-color: #fff !important;
  }
}
</style>