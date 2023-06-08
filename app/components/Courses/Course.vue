<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <ScrollView orientation="vertical">
        <StackLayout>
          <Label class="course__title" :text="course.productName" />
          <Image class="course__img" :src="`~/images/courses/${course.campaignProductId}.png`" />

          <StackLayout class="course__box" >
            <Label class="course__subtitle" text="About this course" />
            <Label class="course__text" textWrap="true" :text="coursesInfo[course.baseProductName].about" />
          </StackLayout>

          <StackLayout class="course__box">
            <Label class="course__subtitle" text="This course includes:" />
            <Includes :arr="coursesInfo[course.baseProductName].includes" />
          </StackLayout>

          <Label class="course__wrap">
            <Span class="course__old" :text="coursesInfo[course.baseProductName].old_price | format" />
            <Span text="  " />
            <Span class="course__price" :text="course.price | format" />
          </Label>

          <Button class="btn btn__lg" text="BUY NOW" @tap="openCheckout(course.campaignProductId)" />
        </StackLayout>
      </ScrollView>
    </RootLayout>
  </Page>
</template>

<script>
import Bar from '../Bar'
import Header from '../Header'
import Includes from './Includes'
import CourseCheckout from './Checkout'
import { mapGetters } from 'vuex'
export default {
  components: {
    Header, Bar, Includes,
  },
  props: {
    course: {
      type: Object,
      required: true
    }
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
  methods: {
    openCheckout(id){
      this.$navigateTo(CourseCheckout, {
        props: {
          course: this.course
        },
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    }
  },
  data(){
    return {
      arrayData: ['1', '2', '3', '4', '5', '6']
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.course{
  &__title{
    color: $second;
    font-size: 22px;
    margin-bottom: 15;
    font-weight: 700;
  }
  &__img{
    margin-bottom: 15;
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
    text-align: center;
  }
  &__text{
    font-size: 14;
    color: $second;
  }
  &__subtitle{
    font-weight: 700;
    font-size: 18;
    color: $active;
    margin-bottom: 5;
  }
  &__includes{
    background-color: red;
    margin-top: 10;
    min-height: 20;
  }
  &__box{
    margin-bottom: 15;
  }
}
</style>