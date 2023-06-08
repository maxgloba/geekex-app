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
                    class="schedule__list schedule__sublist"
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
    margin-top: 10;
    background: red;
    & * {
      color: $second;
    }
    &-title{
      font-size: 18;
      padding-left: 5;
      margin-top: 5;
      margin-bottom: 5;
      font-weight: 700;
    }
    &-subtitle{
      font-size: 15;
      padding-left: 15;
      margin-bottom: 5;
    }
    &-item{
      font-size: 14;
      line-height: 1.4;
      padding-left: 20;
    }
  }
  &__sublist{
    background: green;
  }
}
</style>