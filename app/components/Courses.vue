<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout height="100%">
        <Header title="Courses" />
        <ListView
          height="100%"
          class="course__list"
          for="(course, index) in courses"
          @itemTap="openCourse">
          <v-template>
            <StackLayout class="course">
              <Label class="course__title" :text="course.productName" />
              <Label>
                <Span class="course__desc" :text="limit(course.productDescription, 35)" />
                <Span class="course__desc course__desc-line" text="Read More" />
              </Label>
              <Label class="course__wrap">
                <Span class="course__old" :text="coursesInfo[course.baseProductName].old_price | format" />
                <Span text="  " />
                <Span class="course__price" :text="course.price | format" />
              </Label>
              <Image
                class="course__img"
                :src="`~/images/courses/${course.campaignProductId}.png`" />
            </StackLayout>
          </v-template>
        </ListView>
      </StackLayout>
    </RootLayout>
  </Page>
</template>

<script>
import Bar from './Bar'
import Header from './Header'
import Course from './Courses/Course'
import { mapGetters } from 'vuex'
export default {
  components: {
    Header, Bar,
  },
  computed: {
    ...mapGetters({
      courses: 'getCourses',
      coursesInfo: 'getCoursesInfo',
    }),
  },
  filters: {
    format: rangep => `$${rangep}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,')
  },
  beforeCreate(){
    this.$store.dispatch('requestCampaign', 6)
  },
  methods: {
    limit(string = '', limit = 0) {
      let result = string.substring(0, limit)
      result += string.length < limit ? '.' : '...'
      result += ' '
      return result
    },
    openCourse(courseData){
      this.$navigateTo(Course, {
        props: {
          course: courseData.item
        },
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.course{
  margin-top: 10;
  margin-bottom: 30;
  &__list{
    min-height: 100%;
  }
  &__title{
    font-weight: 700;
    font-size: 20;
    color: $second;
    margin-bottom: 5;
  }
  &__desc{
    font-size: 15;
    line-height: 1.5;
    color: $second;
    background: transparent;
    margin-bottom: 5;
    &-line{
      text-decoration: underline;
      font-weight: 600;
    }
  }
  &__price{
    font-size: 26;
    color: $second;
  }
  &__old{
    font-size: 18;
    color: $active;
    text-decoration: line-through;
  }
  &__wrap{
    margin-bottom: 10;
  }
}
</style>