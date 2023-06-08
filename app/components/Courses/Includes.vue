<template>
  <StackLayout :visibility="arr.length > 0 ? 'visible':'collapse'">
    <Label textWrap="true" v-if="arr.length > 0" :text="'- '+arr[0].text" />
    <Label textWrap="true" v-if="arr.length > 1" :text="'- '+arr[1].text" />
    <Label textWrap="true" v-if="arr.length > 2" :text="'- '+arr[2].text" />
    <Label textWrap="true" v-if="arr.length > 3" :text="'- '+arr[3].text" />
    <Label textWrap="true" v-if="arr.length > 4" :text="'- '+arr[4].text" />
    <Label textWrap="true" v-if="arr.length > 5" :text="'- '+arr[5].text" />
    <Label textWrap="true" v-if="arr.length > 6" :text="'- '+arr[6].text" />
    <Label textWrap="true" v-if="arr.length > 7" :text="'- '+arr[7].text" />
    <Label textWrap="true" v-if="arr.length > 8" :text="'- '+arr[8].text" />
    <Label textWrap="true" v-if="arr.length > 9" :text="'- '+arr[9].text" />
    <Label textWrap="true" v-if="arr.length > 10" :text="'- '+arr[10].text" />
    <Label textWrap="true" v-if="arr.length > 11" :text="'- '+arr[11].text" />
    <Label textWrap="true" v-if="arr.length > 12" :text="'- '+arr[12].text" />
    <Label textWrap="true" v-if="arr.length > 13" :text="'- '+arr[13].text" />
    <Label textWrap="true" v-if="arr.length > 14" :text="'- '+arr[14].text" />
  </StackLayout>
</template>

<script>
export default{
  props: {
    arr: {
      type: Array,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
Label{
  font-size: 14;
  color: $second;
  margin-bottom: 5;
}
</style>