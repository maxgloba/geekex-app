import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import { Http } from '@nativescript/core'

import coursesInfo from './coursesInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loader: false,
    events: [],
    orders: [],
    newTickets: [],
    tickets: [],
    billing: null,
    payment: null,
    step: 'tickets',
    campaignId: null,
    orderId: null,
    sessionId: null,
    coupon: null,
    couponError: false,
    campaign: null,
    ticketError: false,
    billingError: false,
    validationError: false,
    user: false,
    role: false,
    loginError: false,
    courses: [],
    coursesInfo: coursesInfo,
    courseThanks: false,
    countries: ["US +1", "GB +44", "FR +33", "DE +49", "ES +34", "IT +39", "NL +31", "MX +52", "AF +93", "AX +358", "AL +355", "DZ +213", "AS +1", "AD +376", "AO +244", "AQ +672", "AG +1", "AR +54", "AM +374", "AU +61", "AT +43", "AZ +994", "BS +1", "BH +973", "BD +880", "BB +1", "BY +375", "BE +32", "BM +1", "BO +591", "BA +387", "BW +267", "BR +55", "IO +246", "BN +673", "BG +359", "BF +226", "BI +257", "KH +855", "CM +237", "CA +1", "CV +238", "KY +1", "CF +236", "TD +235", "CL +56", "CN +86", "CX +61", "CC +61", "CO +57", "CG +242", "CR +506", "HR +385", "CU +53", "CY +357", "CZ +420", "CD +243", "DK +45", "DJ +253", "DM +1", "DO +1", "EC +593", "EG +20", "SV +503", "GQ +240", "ER +291", "EE +372", "SZ +268", "ET +251", "FK +500", "FO +298", "FJ +679", "FI +358", "GF +594", "PF +689", "GA +241", "GM +220", "GE +995", "GH +233", "GI +350", "GR +30", "GL +299", "GP +590", "GT +502", "GG +44", "GN +224", "HT +509", "HN +504", "HK +852", "HU +36", "IS +354", "IN +91", "ID +62", "IR +98", "IQ +924", "IE +353", "IM +44", "IL +972", "CI +225", "JM +1", "JP +81", "JE +44", "JO +962", "KZ +77", "KE +254", "KR +82", "KW +965", "KG +996", "LA +856", "LV +371", "LS +266", "LR +231", "LY +218", "LI +423", "LT +370", "LU +352", "MO +853", "MG +261", "MW +265", "MY +60", "MV +960", "ML +223", "MT +356", "MH +692", "MR +222", "MD +373", "MC +377", "MN +976", "ME +382", "MA +212", "MZ +258", "MM +95", "NA +224", "NR +674", "NP +977", "NC +687", "NZ +64", "NI +505", "NE +227", "NG +234", "MK +389", "MP +1", "NO +47", "OM +968", "PK +92", "PS +970", "PA +507", "PG +675", "PY +595", "PE +51", "PH +63", "PN +870", "PL +48", "PT +351", "PR +1", "QA +974", "RO +40", "RU +7", "PM +508", "VC +1", "WS +685", "SM +378", "SA +966", "SN +221", "RS +381", "SC +248", "SL +232", "SG +65", "SX +1", "SK +421", "SI +386", "SB +677", "ZA +27", "GS +500", "SS +211", "LK +94", "SD +249", "SE +46", "CH +41", "SY +963", "TW +886", "TJ +992", "TZ +255", "TH +66", "TG +228", "TT +1", "TN +216", "TR +90", "TM +993", "TC +1", "UA +380", "AE +971", "UY +598", "UZ +998", "VE +58", "VN +84", "VG +1", "VI +1"],
  },
  mutations: {
    setLoader(state, val) {
      state.loader = val
    },
    setEvents(state, arr) {
      state.events = arr
    },
    addTicket(state, ticket) {
      state.tickets.push(ticket)
    },
    addNewTicket(state, ticket) {
      state.newTickets.push(ticket)
    },
    removeNewTicket(state, index){
      state.newTickets.splice(index, 1)
    },
    setTickets(state, arr){
      state.tickets = arr
    },
    setStep(state, val) {
      state.step = val
    },
    setBilling(state, obj) {
      state.billing = obj
    },
    setPayment(state, obj) {
      state.payment = obj
    },
    setCampaignId(state, id) {
      state.campaignId = id
    },
    setOrderId(state, id) {
      state.orderId = id
    },
    setSessionId(state, id) {
      state.sessionId = id
    },
    setTicketError(state, msg){
      state.ticketError = msg
    },
    setBillingError(state, msg) {
      state.billingError = msg
    },
    setValidationError(state, msg) {
      state.validationError = msg
    },
    setCoupon(state, obj) {
      state.coupon = obj
    },
    setCouponError(state, msg) {
      state.couponError = msg
    },
    setCampaign(state, obj) {
      state.campaign = obj
    },
    setPrice(state, val) {
      state.price = val
    },
    resetState(state){
      const objects = ['billing', 'payment', 'coupon']
      objects.forEach(obj => {
        Object.keys(state[obj]).forEach(key => {
          delete state[obj][key]
        })
      })
      state.newTickets = []
      state.campaignId = null
      state.orderId = null
      state.sessionId = null
      state.step = 'tickets'
    },
    setUser(state, obj) {
      state.user = obj
    },
    setRole(state, val) {
      state.role = val
    },
    setLoginError(state, val){
      state.loginError = val
    },
    setOrders(state, orders) {
      state.orders = orders
    },
    addTicket(state, ticket) {
      state.tickets.push(ticket)
    },
    resetTickets(state) {
      state.tickets = []
    },
    setCourses(state, arr){
      state.courses.push(...arr)
    },
    setCourseThanks(state, bool){
      state.courseThanks = bool
    },
  },
  actions: {
    requestCampaign({commit, state}, id){
      commit('setCampaignId', id)
      Http.request({
        url: 'https://api.geekex.com/konnektive?endpoint=/campaign/query',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: { campaignId: id }})
      })
        .then(res => {
          const campaign = res.content.toJSON()
          if(campaign.result === "SUCCESS"){
            commit('setCampaign', campaign.message.data[id])
            if(id === 6){
              commit('setCourses', campaign.message.data[id].products)
            } else {
              commit('setPrice', Number(campaign.message.data[id].products[0].price))
            }
          } else {
            alert(campaign)
          }
        })
        .catch(err => console.log(err))
    },
    requestEvents({commit}){
      Http.request({
        url: 'https://api.geekex.com/ts/events',
        method: 'GET'
      })
        .then(res => {
          commit('setEvents', res.content.toJSON())
        })
        .catch(err => console.log(err))
    },
    actionBilling({commit, state, dispatch}, data){
      commit('setLoader', true)
      commit('setBilling', data)
      Http.request({
        url: 'https://api.geekex.com/konnektive?endpoint=/landers/clicks/import',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: {
          campaignId: state.campaignId,
          pageType: "checkoutPage",
          requestUri: "https://app.geekex.com",
          httpReferer: "https://app.geekex.com",
        }})
      })
      .then(res => {
        const lander = res.content.toJSON();
        if (lander.result === 'SUCCESS') {
          this.commit('setSessionId', lander.message.sessionId)
          const dataLeads = {
            campaignId: state.campaignId,
            pageType: 'leadPage',
            billShipSame: 1,
            firstName: data.firstName,
            lastName: data.lastName,
            emailAddress: data.email,
            phoneNumber: data.phone,
            address1: 'undefined',
            city: 'test',
            country: data.country.substring(2,0),
            postalCode: '90210',
            state: 'test',
            sessionId: lander.message.sessionId
          }
          dispatch('actionBillingLeads', dataLeads)
        } else if(lander.result === "ERROR"){
          ccommit('setBillingError', lander.message)
          setTimeout(() => ccommit('setBillingError', false), 4000)
        } else {
          console.dir(lander)
          alert('ERROR! Something whent wrong. Please try againe later or contact us.')
        }
      })
      .catch(err => {
        console.dir(err)
        alert('ERROR! Something whent wrong. Please try againe later or contact us.')
      })
    },
    actionBillingLeads({commit, state, dispatch}, data){
      Http.request({
        url: 'https://api.geekex.com/konnektive?endpoint=/leads/import',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: data})
      })
        .then(res => {
          const lead = res.content.toJSON();
          if (lead.result === 'SUCCESS') {
            commit('setOrderId', lead.message.orderId)
            commit('setStep', 'payment')
          } else if(lead.result === "ERROR"){
            throw lead.message
          }
        })
        .catch(err => {
          console.dir(err)
        })
        .finally(() => {
          commit('setLoader', false)
        })
    },
    actionCoupon({commit, state}, couponCode){
      commit('setLoader', true)
      Http.request({
        url: 'https://api.geekex.com/konnektive?endpoint=/coupon/query',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: {
          couponCode: couponCode,
          campaignId: state.campaignId,
        }})
      })
        .then(res => {
          const coupon = res.content.toJSON()
          if (coupon.result === 'SUCCESS') {
            commit('setCoupon', {
              couponCode: couponCode,
              couponDiscountPerc: coupon.message.data[0].couponDiscountPerc,
            })
            alert(`${coupon.result}! Your discount: ${coupon.message.data[0].couponDiscountPerc}%`)
          } else if(coupon.result === "ERROR"){
            alert(coupon.message)
          }
        })
        .catch(err => {
          console.dir(err)
        })
        .finally(() => {
          commit('setLoader', false)
        })
    },
    securePayment({commit, state, dispatch}){
      commit('setLoader', true)
      const data = {
        orderId: state.orderId,
        sessionId: state.sessionId,
        campaignId: state.campaignId,
        cardNumber: state.payment.cardNumber,
        cardMonth: state.payment.cardMonth,
        cardYear: state.payment.cardYear,
        cardSecurityCode: state.payment.cardSecurityCode,
        paySource: 'CREDITCARD',
        product1_id: state.campaign.products[0].campaignProductId,
        product1_qty: state.tickets.length,
        httpReferer: 'https://app.geekex.com',
        product1_price: state.price || state.campaign.products[0].price,
      }

      if(state.coupon) data.couponCode = state.coupon.couponCode

      Http.request({
        url: 'https://api.geekex.com/konnektive?endpoint=/order/import',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: data})
      })
        .then(res => {
          const response = res.content.toJSON()
          if(response.result === "SUCCESS"){
            dispatch('insertTS')
            commit('setStep', 'thanks')
          } else if(response.result === "ERROR"){
            commit('setValidationError', response.message)
            setTimeout(() => commit('setValidationError', false), 4000)
          } else {
            alert('ERROR! Something whent wrong. Please try againe later or contact us.')
            console.dir(response)
          }
        })
        .catch(err => {
          alert('ERROR! Something whent wrong. Please try againe later or contact us.')
          console.dir(err)
        })
        .finally(() => {
          commit('setLoader', false)
        })
    },
    insertTS({dispatch, state, commit}){
      const users = state.tickets
      users.forEach(user => {
        user.orderId = state.orderId
        user.campaignId = state.campaignId
      })
      Http.request({
        url: 'https://api.geekex.com/ts',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: { users: users }})
      })
        .then(res => {
          const response = res.content.toJSON()
          console.log('insert TS - ' + response.status)
          if(response.status === 'success'){
            console.log('users was added to TS');
          } else if(response.status === 'error'){
            console.log(response.data.msg)
          } else {
            console.log('Oops! Something went wrong. Please contact with the site manager.')
          }
        })
        .catch(err => {
          console.log('Oops! Something went wrong. Please contact with the site manager.')
        })
    },
    requestLogin({commit, state, dispatch}, obj){
      return new Promise((resolve, reject) => {
        Http.request({
          url: 'https://api.geekex.com/login',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          content: JSON.stringify({params: obj})
        })
          .then(res => {
            const user = res.content.toJSON()
            if(user.status === "success") {
              commit('setUser', user.msg)
              dispatch('requestRoles')
              resolve(user.msg)
            } else {
              commit('setLoginError', user.msg)
              reject(user.msg)
            }
          })
          .catch(err => {
            alert('ERROR! Something went wrong please try againe later or contact us.')
            reject(err)
          })
          .finally(() => {
            commit('setLoader', false)
            setTimeout(()=> commit('setLoginError', false), 4000)
          })
      })
    },
    requestRoles({commit, state, dispatch}){
      Http.request({
        url: 'https://api.geekex.com/db/roles',
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => {
          const roles = res.content.toJSON()
          roles.forEach(role => {
            const users = JSON.parse(role.users)
            if(users.includes(state.user.ID)){
              commit('setRole', role.name)
            }
          })
        })
        .catch(err => {
          alert('ERROR! Something we cant check your role')
        })
    },
    requestOrders({commit, dispatch, state}, campaignId) {
      const orders = []
      Http.request({
        url: 'https://api.geekex.com/konnektive?endpoint=/order/query',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: {
          startDate: '01/01/2022',
          endDate: '05/26/2023',
          campaignId: campaignId,
          resultsPerPage: 200
        }})
      })
        .then(response => {
          const res = response.content.toJSON()
          if(res.result === "ERROR"){
            alert(`${res.result}! ${res.message}`)
          } else {
            orders.push(...res.message.data)
            if(Number(res.message.totalResults) > Number(res.message.resultsPerPage)){
              return Http.request({
                url: 'https://api.geekex.com/konnektive?endpoint=/order/query',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                content: JSON.stringify({params: {
                  startDate: '01/01/2022',
                  endDate: '01/01/2025',
                  campaignId: campaignId,
                  resultsPerPage: 200,
                  page: 2
                }})
              })
                .then(response => {
                  const res = response.content.toJSON()
                  orders.push(...res.message.data)
                })
            }
          }
        })
        .catch(err => {
          console.dir(err)
        })
        .finally(() => {
          dispatch('setTickets', orders)
          commit('setOrders', orders)
        })
    },
    setTickets({commit, dispatch}, orders){
      commit('resetTickets')
      orders.forEach(order => {
        if(order.orderStatus === 'COMPLETE' || (order.orderStatus === "REFUNDED" && Number(order.refundRemaining) > 0)){
          dispatch('requestTicket', {orderId: order.orderId, campaignId: order.campaignId})
        }
      })
    },
    requestTicket({commit, state}, data){
      Http.request({
        url: `https://api.geekex.com/db/tickets?where=orderId&value=${data.orderId}`,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => {
          const response = res.content.toJSON()
          response.forEach(ticket => {
            Http.request({
              url: `https://api.geekex.com/db/users?where=ID&value=${ticket.userId}`,
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
            })
              .then(res => {
                const user = res.content.toJSON()
                const ticketData = {
                  orderId: data.orderId,
                  campaignId: data.campaignId,
                  ticketId: ticket.ID,
                  userId: ticket.userId,
                  quiz: JSON.parse(ticket.quiz),
                  date: ticket.created,
                  size: ticket.size
                }
                if(user.length > 0){
                  ticketData.user = {
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    email: user[0].email,
                    phone: user[0].phone,
                    image: user[0].image
                  }
                }
                commit('addTicket', ticketData)
              })
            })
        })
        .catch(err => {
          console.dir(err)
        })
    },
    actionCoursePayment({commit, state, dispatch}, data){
      commit('setLoader', true)
      Http.request({
        url: 'https://api.geekex.com/konnektive?endpoint=/landers/clicks/import',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        content: JSON.stringify({params: {
          campaignId: state.campaignId,
          pageType: "checkoutPage",
          requestUri: "https://app.geekex.com",
          httpReferer: "https://app.geekex.com",
        }})
      })
        .then(res => {
          const lander = res.content.toJSON();
          if (lander.result === 'SUCCESS') {
            this.commit('setSessionId', lander.message.sessionId)
            const dataLeads = {
              campaignId: state.campaignId,
              pageType: 'leadPage',
              billShipSame: 1,
              firstName: data.firstName,
              lastName: data.lastName,
              emailAddress: data.email,
              phoneNumber: data.phone,
              address1: 'undefined',
              city: 'test',
              country: data.country.substring(2,0),
              postalCode: '90210',
              state: 'test',
              sessionId: lander.message.sessionId
            }
            return Http.request({
              url: 'https://api.geekex.com/konnektive?endpoint=/leads/import',
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              content: JSON.stringify({params: dataLeads})
            })
          } else if(lander.result === "ERROR"){
            ccommit('setCourseError', lander.message)
            setTimeout(() => ccommit('setCourseError', false), 4000)
          } else {
            console.dir(lander)
            alert('ERROR! Something whent wrong. Please try againe later or contact us.')
          }
        })
          .then(res => {
            const lead = res.content.toJSON();
            if (lead.result === 'SUCCESS') {
              commit('setOrderId', lead.message.orderId)
              const dataImport = {
                orderId: state.orderId,
                sessionId: state.sessionId,
                campaignId: state.campaignId,
                cardNumber: data.cardNumber,
                cardMonth: data.cardMonth,
                cardYear: data.cardYear,
                cardSecurityCode: data.cardSecurityCode,
                paySource: 'CREDITCARD',
                product1_id: data.campaignProductId,
                product1_qty: 1,
                httpReferer: 'https://app.geekex.com',
              }
              if(state.coupon) dataImport.couponCode = state.coupon.couponCode
              return Http.request({
                url: 'https://api.geekex.com/konnektive?endpoint=/order/import',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                content: JSON.stringify({params: dataImport})
              })
            } else if(lead.result === "ERROR"){
              throw lead.message
            } else {
              alert('ERROR! Something whent wrong. Please try againe later or contact us.')
            }
          })
            .then(res => {
              const response = res.content.toJSON()
              if(response.result === "SUCCESS"){
                commit('setCourseThanks', true)
              } else if(response.result === "ERROR"){
                commit('setCourseError', response.message)
                setTimeout(() => commit('setCourseError', false), 4000)
              } else {
                alert('ERROR! Something whent wrong. Please try againe later or contact us.')
                console.dir(response)
              }
            })
              .catch(err => {
                console.dir(err)
              })
                .finally(() => {
                  commit('setLoader', false)
                })
    }
  },
  getters: {
    getLoader: state => state.loader,
    getEvents: state => state.events,
    getStep: state => state.step,
    getCountries: state => state.countries,
    getBilling: state => state.billing,
    getTicketError: state => state.ticketError,
    getBillingError: state => state.billingError,
    getValidationError: state => state.validationError,
    getPayment: state => state.payment,
    getCampaignId: state => state.campaignId,
    getCampaign: state => state.campaign,
    getPrice: state => state.price,
    getCoupon: state => state.coupon,
    getCouponError: state => state.couponError,
    getUser: state => state.user,
    getRole: state => state.role,
    getLoginError: state => state.loginError,
    getOrders: state => state.orders,
    getTickets: state => state.tickets,
    getNewTickets: state => state.newTickets,
    getCourses: state => state.courses.reverse(),
    getCoursesInfo: state => state.coursesInfo,
    getCourseThanks: state => state.courseThanks,
  },
})

Vue.prototype.$store = store;

export default store;





