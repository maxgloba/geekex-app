<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout class="menu">
        <Header title="Menu:" />
        <Button
          class="btn btn__lg"
          text="Events"
          @tap="goTo(pageEvents)" />
        <Button
          class="btn btn__lg"
          text="Courses"
          @tap="goTo(pageCourses)" />
<!--         <Button
          class="btn btn__lg"
          text="News"
          @tap="goTo(pageNews)" />
        <Button
          class="btn btn__lg"
          text="Services"
          @tap="goTo(pageServices)" /> -->
        <Button
          class="btn btn__lg"
          text="Contacts"
          @tap="goTo(pageContacts)" />
        <Image
          class="menu__img"
          src="~/images/logo.png" width="80%" />
      </StackLayout>
    </RootLayout>
  </Page>
</template>

<script>
import Events from './Events/Events'
import Courses from './Courses/Courses'
// import News from './News'
// import Services from './Services'
import Contacts from './Contacts'
import Bar from './Bar'
import Header from './Header'
export default {
  components: {
    Header, Bar,
  },
  data(){
    return {
      pageEvents: Events,
      pageCourses: Courses,
      // pageNews: News,
      // pageServices: Services,
      pageContacts: Contacts,
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
    }
  },
  created(){
    this.$store.dispatch('requestEvents')
  },
}
</script>

<style scoped lang="scss">
@import '~/scss/variables';
.btn{
  margin-top: 25;
}
.menu{
  &__img{
    margin-top: 30;
  }
}
</style>
