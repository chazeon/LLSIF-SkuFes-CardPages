<template>
<div class="ui container" id="main-container">
    <div class="ui text menu" id="list-settings-menu">
        <div class="header item">Pairs</div>
        <div class="right menu">
            <!--a class="item" v-on:click="showFilterSettings()"><i class="filter icon"></i>Filter</a-->
            <a class="item" v-on:click="openDisplaySettings()"><i class="options icon"></i>Options</a>
        </div>
    </div>
    <pair-list-display-settings
        v-bind:options="options"
        v-on:update:options="updatedOptions => updateOptions(updatedOptions)"
        v-bind:show="showDisplaySettings"
        v-bind:close="() => showDisplaySettings = false"
        v-on:hide:pair-display-settings="showDisplaySettings = false"></pair-list-display-settings>
    <!--pair-list-filter-settings id="pair-list-filter-settings" v-bind:options="options"></pair-list-filter-settings-->
    <paginate name="pairs" v-bind:list="pairs" v-bind:per="12" tag="div" class="ui three stackable cards" id="pair-list">
        <pair-display v-for="pair in paginated('pairs')" v-bind:key="pair.pair_id" v-bind:pair="pair" v-bind:options="options"></pair-display>
    </paginate>
    <div id="paginate-links">
        <paginate-links
            for="pairs"
            v-bind:limit="5"
            class="ui center pagination menu"
            v-bind:classes="{ 'a': [ 'item' ] }"
            v-bind:hide-single-page="true"
            containerTag="div"
            itemTag="a"
            linkTag="span"
            clickHandlerTag="item"></paginate-links>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import VuePaginate from './plugins/vue-paginate'

import PairListDisplaySettings from './components/pair-list/display-settings.vue'
import PairListFilterSettings from './components/card-list/filter-settings.vue'
import PairDisplay from './components/pair-list/pair-display.vue'

Vue.use(VueResource)
Vue.use(VuePaginate)
Vue.component('pair-display', PairDisplay)
Vue.component('pair-list-display-settings', PairListDisplaySettings)
Vue.component('pair-list-filter-settings', PairListFilterSettings)

export default {
    data: function () {
        return {
            pairs: [],
            paginate: ['pairs'],
            options: {
                frame: 'framed'
            },
            showDisplaySettings: false
        }
    },
    created: function () {
        this.$http.get('//api.skufes.moe/db/pair')
        .then(response => {
            this.pairs = response.body
        })
    },
    methods: {
        openDisplaySettings: function () {
            this.showDisplaySettings = true
        },
        updateOptions: function (updatedOptions) {
            this.options = updateOptions
        }
   },
    mounted: function () {
    }
}
</script>
<style>
#main-container {
    margin-top: 10px;
    margin-bottom: 20px;
}
#main-container > .ui.cards {
    margin-bottom: 20px;
}
ul.paginate-links {
    padding: 0;
}
ul.paginate-links > li {
    list-style: none;
}
ul.paginate-links > li.active > a.item {
    border-top: none;
    background-color: rgba(0,0,0,.05);
    color: rgba(0,0,0,.95);
    box-shadow: none;
}
#paginate-links {
    text-align: center;
}
#list-settings-menu {
    margin-bottom: 0;
}
#card-list {
    margin-top: 0;
}
</style>