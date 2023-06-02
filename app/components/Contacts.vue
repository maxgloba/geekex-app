<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout height="100%">
        <Header title="Our Contacts" />

<!-- WE’D LOVE TO HEAR IT FROM YOU.
Got questions, inquiries, suggestions for improvement, or any type of feedback you’d love to share with us?

THANK YOU FOR YOUR INFORMATION. WE WILL CONTACT YOU SOON
[[ FORM ]]

You can always reach us at
(702) 670-0033

SUPPORT@GEEKEX.COM

UNITED STATES, 30 N GOULD ST SUITE 1976, SHERIDAN, WY 82801

Social network
twitter.com - https://twitter.com/EduGeekout/
instagram.com - https://www.instagram.com/accounts/login/?next=/geekout_edu/
facebook.com - https://www.facebook.com/geekoutedu/
google.com - https://www.google.com.ph/maps/place/Geekout+Events+LLC/@44.7977708,-106.9549504,15z/data=!4m5!3m4!1s0x0:0x9a7583e033c1605!8m2!3d44.7977708!4d-106.9549504?hl=en
 -->
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