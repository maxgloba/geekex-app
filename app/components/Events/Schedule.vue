<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <StackLayout height="100%">
        <Label class="header">
          <Span class="header__title" text="Schedule:" />
        </Label>
        <StackLayout height="100%">
          <ListView
            height="100%"
            class="schedule__list"
            :items="schedule">
            <v-template>
              <StackLayout>
                <Label class="schedule__list-title" :text="item.title" />
                <Label class="schedule__list-subtitle" :text="item.subtitle" />
                <StackLayout>
                  <ListView
                    class="schedule__list"
                    :items="item.list">
                    <v-template>
                      <StackLayout>
                        <Label class="schedule__list-item" :text="'- '+item" />
                      </StackLayout>
                    </v-template>
                  </ListView>
                </StackLayout>
              </StackLayout>
            </v-template>
          </ListView>
        </StackLayout>
      </StackLayout>
    </RootLayout>
  </Page>
</template>

<script>
import Bar from '../Bar'
export default {
  components: {
    Bar,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    schedule: {
      type: Array,
      required: true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.schedule{
  &__list{
    background: transparent;
    margin-top: 10vh;
    & * {
      color: $second;
    }
    &-title{
      font-size: 18vh;
      padding-left: 5vw;
      margin-top: 5vh;
      margin-bottom: 5vh;
      font-weight: 700;
    }
    &-subtitle{
      font-size: 15vh;
      padding-left: 15vw;
      margin-bottom: 5vh;
    }
    &-item{
      font-size: 14vh;
      line-height: 1.4;
      padding-left: 20vw;
    }
  }
}
</style>