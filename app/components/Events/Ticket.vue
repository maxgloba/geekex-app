<template>
  <StackLayout class="ticket">
    <FlexboxLayout justifyContent="space-between" >
      <StackLayout class="ticket__info">
        <Label left="0" top="0" class="ticket__event" :visibility="data.campaignId ? 'visible' : 'collapse'" :text="eventName(data.campaignId)" />
        <Label
          class="ticket__name"
          :text="data.user ? `${data.user.firstName} ${data.user.lastName}` : `${user.firstName} ${user.lastName}`" />
        <Label :text="data.user ? data.user.email : user.email" />
        <Label :text="data.user ? data.user.phone : user.phone" />
        <Label :text="data.size ? data.size : ''" />
        <Label :text="data.date | setDate" />
        <FlexboxLayout
          class="ticket_btns"
          alignItems="flex-start"
          justifyContent="space-between">
          <Button left="100" top="0" class="ticket__btn" @tap="openTicket(data)">
            <Span class="ticket__btn-key" text="ID: " />
            <Span class="ticket__btn-value" :text="data.ticketId" />
          </Button>
          <Button left="0" top="0" class="ticket__btn" @tap="openOrder(data.orderId, data.campaignId)">
            <Span class="ticket__btn-key" text="Order: " />
            <Span class="ticket__btn-value" :text="data.orderId" />
          </Button>
        </FlexboxLayout>
      </StackLayout>
      <FlexboxLayout class="ticket__right" justifyContent="space-between" alignItems="center">
        <Image
          :visibility="image ? 'visible' : 'collapse'"
          class="ticket__img"
          :src="image" />
        <!-- <Label class="ticket__img" :text="getQR(data.ticketId)" /> -->
      </FlexboxLayout>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import { Http } from '@nativescript/core'
import { mapGetters } from 'vuex'
import TicketFull from './TicketFull'
import pageOrder from './Order'
export default{
  computed: {
    ...mapGetters({
      events: 'getEvents',
      orders: 'getOrders',
      user: 'getUser',
    }),
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      image: false,
    }
  },
  filters: {
    setDate: time => {
      const date = new Date(Number(time))
      const mm = date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1
      const dd = date.getDate()
      const yy = date.getFullYear()
      return `${mm}/${dd}/${yy}`
    }
  },
  methods: {
    openTicket(data){
      this.$navigateTo(TicketFull, {
        props: {
          data: data
        },
        transition: {
          name: 'slideLeft',
          duration: 250
        }
      })
    },
    openOrder(id, campaignId){
      let selectedOrder = this.orders.find(order => order.orderId === id)
      if(!selectedOrder){
        Http.request({
          url: `${this.$env.API}/konnektive?endpoint=/order/query`,
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          content: JSON.stringify({params: {
            startDate: '01/01/2022',
            endDate: '05/26/2023',
            campaignId: campaignId,
            orderId: id,
            resultsPerPage: 200
          }})
        })
          .then(response => {
            const res = response.content.toJSON()
            if(res.result === "ERROR"){
              alert(res.message)
            } else {
              this.$navigateTo(pageOrder, {
                props: {
                  data: res.message.data[0]
                },
                transition: {
                  name: 'slideLeft',
                  duration: 250
                }
              })
            }
          })
      } else {
        this.$navigateTo(pageOrder, {
          props: {
            data: selectedOrder
          },
          transition: {
            name: 'slideLeft',
            duration: 250
          }
        })
      }
    },
    eventName(id){
      const e = this.events.find(event => event.campignId === id)
      return e ? e.title : ' '
    },
    getQR(id){
      Http.request({
        url: `${this.$env.API}/qr?ticketId=${id}`,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => {
          this.image = res.content.toString()
        })
    },
  },
  mounted(){
    this.getQR(this.data.ticketId)
  }
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
    margin-top: 5;
    margin-bottom: 5;
    text-transform: capitalize;
  }
  &__btn{
    padding: 0;
    &-key{
      font-size: 12;
    }
    &-value{
      font-weight: 700;
      color: $active;
    }
  }
  &__event{
    color: rgba(255, 255, 255, 0.1);
    font-size: 18;
    font-weight: 700;
  }
  &_btns{
    margin-top: 10px;
  }
}
</style>