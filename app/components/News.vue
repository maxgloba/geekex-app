<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout height="100%">
        <Header title="News" />
        <Label text="Our news blog" />
      </StackLayout>
    </RootLayout>
  </Page>
</template>

<script>
import { Http } from '@nativescript/core'
import Bar from './Bar'
import Header from './Header'
export default {
  components: {
    Header, Bar,
  },
  methods: {
    getTwitter(){
      console.log('START getTwitter -------------------------')
      // const url = 'https://twitter.com/GeekEx_Edu'
      Http.request({
        url: 'https://api.twitter.com/2/users/1263535418890498054/tweets',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.$env.TW_TOKEN}`,
        },
        content: JSON.stringify({params: {
          max_results: 24,
          'user.fields': 'profile_image_url',
          'media.fields': 'preview_image_url,url',
          'tweet.fields': 'attachments,author_id,created_at,public_metrics,source',
          expansions: 'attachments.media_keys,author_id',
        }}),
      })
        .then(res => {
          console.log('DONE getTwitter -------------------------')
          const result = res.content.toJSON()
        })
        .catch(err => {
          console.log('ERROR getTwitter -------------------------')
          console.dir(err)
        })
        .finally(() => {
          console.log('END getTwitter -------------------------')
        })
    },
  },
  mounted(){
    // this.getTwitter()
    console.dir(this.$env)
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