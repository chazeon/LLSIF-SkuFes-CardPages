import Vue              from 'vue'
import VueRouter        from 'vue-router'

import CardListApp      from './card-list.vue'
import CardPageApp      from './card-page.vue'
import PairListApp      from './pair-list.vue'
import PairPageApp      from './pair-page.vue'
import CardRankApp      from './card-rank.vue'

import _ from 'lodash'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: CardListApp },
    { path: '/card', component: CardListApp },
    { path: '/card/:unit_id', component: CardPageApp, props: true },
    { path: '/pair', component: PairListApp },
    { path: '/pair/:pair_id', component: PairPageApp, props: true },
    { path: '/rank', component: CardRankApp }
]

const router = new VueRouter({
    routes,
    linkActiveClass: 'active'
})

const app = new Vue({
    router,
}).$mount('#app')