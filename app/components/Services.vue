<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout height="100%">
        <Header title="Services" />
        <Label text="Advertising" />
        <Label text="Branding" />
        <Label text="Design" />
        <Label text="Motion Design" />
        <Label text="Development" />
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