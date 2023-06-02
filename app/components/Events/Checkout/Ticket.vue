<template>
  <StackLayout class="ticket">
    <FlexboxLayout justifyContent="space-between" >
      <StackLayout class="ticket__info">
        <Label class="ticket__event" :text="eventName()" />
        <Button class="ticket__remove" text.decode="&#xf00d;" @tap="removeTicket(index)" />
        <Label class="ticket__name" :text="data.firstName+' '+data.lastName" />
        <Label :text="data.email" />
        <Label :text="data.country+data.phone" />
        <Label :text="data.size" />
        <Label class="ticket__price" :text="'$'+price" />
      </StackLayout>
      <FlexboxLayout class="ticket__right" justifyContent="space-between" alignItems="center">
        <Image class="ticket__img" src="~/images/qr.png" />
      </FlexboxLayout>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
  computed: {
    ...mapGetters({
      tickets: 'getNewTickets',
      events: 'getEvents',
      campaignId: 'getCampaignId',
    }),
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    eventName(){
      const e = this.events.find(event => event.campignId === this.campaignId)
      return e.title
    },
    removeTicket(index){
      this.$store.commit('removeNewTicket', index)
      if(this.tickets.length === 0) this.$store.commit('setStep', 'tickets')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/scss/variables';
.ticket{
  margin-top: 15;
  &__info{
    background: linear-gradient(45deg, $prime, #414141);
    width: 65%;
    padding: 5 10;
    border-top-left-radius: 8;
    border-bottom-left-radius: 8;
    *{
      font-size: 12;
      color: $second;
    }
  }
  &__img{
    width: 100%;
    height: auto;
    transition: 1s ease;
  }
  &__right{
    background: $second;
    width: 35%;
    border-top-right-radius: 8;
    border-bottom-right-radius: 8;
  }
  &__name{
    color: $active;
    font-size: 18;
    font-weight: 700;
    margin-top: 25;
    text-transform: capitalize;
  }
  &__event{
    color: rgba(255, 255, 255, 0.1);
    font-size: 18;
    font-weight: 700;
    margin-bottom: 15;
  }
  &__remove{
    color: $second;
    font-size: 18;
    line-height: 1;
    padding: 0;
    margin-top: -40;
    text-align: right;
    font-family: "Font Awesome 5 Free", "fa-solid-900";
  }
  &__price{
    text-align: right;
    font-weight: 700;
    margin-top: -20;
    font-size: 16;
  }
}
</style>