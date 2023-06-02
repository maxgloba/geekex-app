<template>
  <StackLayout>
    <Label class="item__key" :text="title" />
    <Label>
      <Span :text="valueStr" />
      <Span class="item__value" :text="value | money" />
    </Label>
  </StackLayout>
</template>

<script>
export default{
  props: ['min', 'minStr', 'max', 'maxStr', 'value', 'valueStr', 'title'],
  filters: {
    money(num){
      if(num > 0){
        return `${num}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,')
      } else {
        return num
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
StackLayout{
  background: $gray;
  padding: 10;
  border-radius: 4;
}
Label{
  color: $second;
}
.item{
  &__key{
    font-size: 12;
  }
  &__value{
    font-size: 16;
    font-weight: 700;
  }
}
</style>