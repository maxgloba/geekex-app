<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout height="100%">
        <Header title="Courses" />
        <Label text="Our courses with payment and subscription to geekhub courses" />
      </StackLayout>
    </RootLayout>
  </Page>
</template>

<script>
import Bar from './Bar'
import Header from './Header'
export default {
  components: {
    Header, Bar,
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
Label{
  color: $second;
  font-size: 16px;
  margin-bottom: 10;
}
</style>