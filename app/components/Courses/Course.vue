<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <ScrollView orientation="vertical">
        <StackLayout>
          <Label class="course__title" :text="course.productName" />
          <Image class="course__img" :src="`~/images/courses/${course.campaignProductId}.png`" />
          <Label class="course__wrap">
            <Span class="course__old" :text="coursesInfo[course.baseProductName].old_price | format" />
            <Span text="  " />
            <Span class="course__price" :text="course.price | format" />
          </Label>

          <Label class="course__subtitle" text="About this course" />
          <Label class="course__text" :text="coursesInfo[course.baseProductName].about" />

          <Label class="course__subtitle" text="This course includes:" />
          <ListView
            class="course__includes"
            for="include in coursesInfo[course.baseProductName].includes">
            <v-template>
              <StackLayout>
                <Label class="course__text" :text="'- '+include.text" />
              </StackLayout>
            </v-template>
          </ListView>

          <Button class="btn btn__lg" text="BUY NOW" @tap="openCheckout" />
        </StackLayout>
      </ScrollView>
    </RootLayout>
  </Page>
</template>

<script>
import Bar from '../Bar'
import Header from '../Header'
import { mapGetters } from 'vuex'
export default {
  components: {
    Header, Bar,
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
    openCheckout(){
      console.log('START openCheckout -----');
    }
  },
  mounted(){},
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
  &__img{}
}
</style>