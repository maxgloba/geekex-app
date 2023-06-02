<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout">
      <ScrollView orientation="vertical">
        <StackLayout class="ticket">
          <Label class="header">
            <Span class="header__title" text="Ticket" />
            <Span class="header__title" text=" - " />
            <Span class="header__sub" :text="data.ticketId" />
          </Label>
          <StackLayout class="ticket__info">
            <Label class="ticket__event" :text="eventName(data.campaignId)" />
            <Label class="ticket__key" text="name:" />
            <Label class="ticket__value ticket__value-cap" :text="data.user ? `${data.user.firstName} ${data.user.lastName}` : `${user.firstName} ${user.lastName}`" />
            <Label class="ticket__key" text="email:" />
            <Label class="ticket__value" :text="data.user ? data.user.email : user.email" />
            <Label class="ticket__key" text="phone:" />
            <Label class="ticket__value" :text="data.user ? data.user.phone : user.phone" />
            <Label class="ticket__key" text="size:" />
            <Label class="ticket__value" :text="data.size ? data.size : 'null'" />
          </StackLayout>
          <Image
            :visibility="image ? 'visible' : 'collapse'"
            class="ticket__img"
            :src="image" />
          <Label class="ticket__title" :visibility="['admin', 'manager'].includes(role) ? 'visible' : 'collapse'">
            <Span text="Your quiz answers: " />
            <Span :text="data.quiz ? 'True' : 'False'" />
          </Label>
          <StackLayout :visibility="['admin', 'manager'].includes(role) ? 'visible' : 'collapse'">
            <Label class="ticket__title" text="Resend Email:" />
            <FlexboxLayout class="btn__wrap" justifyContent="space-between">
              <Button class="btn" @tap="sendWelcomeEmail" text="Welcome Email" />
              <Button class="btn" @tap="sendConfirmEmail" text="Confirm Email" />
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </RootLayout>
  </Page>
</template>

<script>
import Bar from '../Bar'
import { mapGetters } from 'vuex'
import { Http } from '@nativescript/core'
export default {
  components: {
    Bar,
  },
  computed: {
    ...mapGetters({
      role: 'getRole',
      user: 'getUser',
      events: 'getEvents',
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
  methods: {
    sendWelcomeEmail(){
      console.dir({
          ticketId: this.data.ticketId,
          email: this.data.user ? this.data.user.email : this.user.email,
          name: this.data.user ? `${this.data.user.firstName} ${this.data.user.lastName}` : `${this.user.firstName} ${this.user.lastName}`,
          id: this.data.campaignId
        })
      Http.request({
        url: `https://api.geekex.com/nodemailer/welcome`,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: {
          ticketId: this.data.ticketId,
          email: this.data.user ? this.data.user.email : this.user.email,
          name: this.data.user ? `${this.data.user.firstName} ${this.data.user.lastName}` : `${this.user.firstName} ${this.user.lastName}`,
          id: this.data.campaignId
        }})
      })
        .then(res => {
          alert('Email was sent')
        })
        .catch(err => {
          console.dir(err)
        })
    },
    sendConfirmEmail() {
      Http.request({
        url: `https://api.geekex.com/nodemailer/confirm`,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: {
          ticketId: this.data.ticketId,
          email: this.data.user ? this.data.user.email : this.user.email,
          name: this.data.user ? `${this.data.user.firstName} ${this.data.user.lastName}` : `${this.user.firstName} ${this.user.lastName}`,
          id: this.data.campaignId
        }})
      })
        .then(res => {
          console.dir(res)
          return this.$axios.post(`${process.env.API}/db/updates`, {
            params: {
              table: 'tickets',
              data: {
                index: this.ticket.ticketId,
                keys: ["quiz"],
                values: ["true"],
              }
            }
          })
        })
        .then(res => {
          alert('Email was sent')
        })
        .catch(err => {
          console.dir(err)
        })
    },
    eventName(id){
      const e = this.events.find(event => event.campignId === id)
      return e.title
    },
    getQR(id){
      Http.request({
        url: `https://api.geekex.com/qr?ticketId=${id}`,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => {
          this.image = res.content.toString()
        })
    },
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
  mounted(){
    this.getQR(this.data.ticketId)
  },
}
</script>

<style scoped lang="scss">
@import '~/scss/variables';
.ticket{
  &__title{
    margin-bottom: 10;
    color: $second;
  }
  &__info{
    background: linear-gradient(45deg, $prime, #414141);
    width: 100%;
    padding: 15 10;
    border-top-left-radius: 8;
    border-top-right-radius: 8;
    margin-top: 10;
  }
  &__key{
    color: $second;
    font-size: 14;
  }
  &__value{
    color: $active;
    font-size: 20;
    font-weight: 700;
    margin-bottom: 5;
    &-cap{
      text-transform: capitalize;
    }
  }
  &__img{
    background: $second;
    padding: 20;
    border-bottom-left-radius: 8;
    border-bottom-right-radius: 8;
    margin-bottom: 20;
  }
  &__event{
    color: rgba(255, 255, 255, 0.1);
    font-size: 26;
    font-weight: 700;
    margin-bottom: 10;
  }
}
.btn__wrap{
  margin-top: 0;
}
</style>
