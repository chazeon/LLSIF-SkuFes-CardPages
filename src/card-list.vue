<template>
<div class="ui container" id="main-container">
    <div class="ui text menu" id="list-settings-menu">
        <div class="header item">Cards</div>
        <div class="right menu">
            <a class="item" v-on:click="openSortSettings()"><i class="sort icon"></i>Sort</a>
            <a class="item" v-on:click="openFilterSettings()"><i class="filter icon"></i>Filter</a>
            <a class="item" v-on:click="openDisplaySettings()"><i class="options icon"></i>Options</a>
        </div>
    </div>
    <card-list-display-settings
        v-bind:options="options"
        v-on:update:options="updatedOptions => updateOptions(updatedOptions)"
        v-bind:show="showDisplaySettings"
        v-bind:close="() => showDisplaySettings = false"
        v-on:hide:card-display-settings="showDisplaySettings = false"></card-list-display-settings>
    <card-list-filter-settings
        v-bind:members="members"
        v-bind:options="options"
        v-on:update:options="updatedOptions => updateOptions(updatedOptions)"
        v-bind:show="showFilterSettings"
        v-bind:close="() => showFilterSettings = false"></card-list-filter-settings>
    <card-list-sort-settings
        v-bind:options="options"
        v-on:update:options="updatedOptions => updateOptions(updatedOptions)"
        v-bind:show="showSortSettings"
        v-bind:close="() => showSortSettings = false"></card-list-sort-settings>
    <paginate
        name="units"
        v-bind:list="filteredUnits"
        v-bind:per="24"
        tag="div"
        class="ui six stackable cards"
        id="card-list"
        ref="paginator">
        <card-overview v-for="unit in paginated('units')" v-bind:key="unit.unit_id" v-bind:unit="unit" v-bind:options="options"></card-overview>
    </paginate>
    <div id="paginate-links">
        <paginate-links
            for="units"
            v-bind:limit="5"
            class="ui center pagination menu"
            v-bind:classes="{ 'a': [ 'item' ] }"
            containerTag="div"
            itemTag="a"
            linkTag="span"
            clickHandlerTag="item"
            v-bind:hide-single-page="true"></paginate-links>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import VuePaginate from './plugins/vue-paginate'

import CardOverview from './components/card-list/card-overview.vue'
import CardListDisplaySettings from './components/card-list/display-settings.vue'
import CardListFilterSettings from './components/card-list/filter-settings.vue'
import CardListSortSettings from './components/card-list/sort-settings.vue'

Vue.use(VueResource)
Vue.use(VuePaginate)
Vue.component('card-overview', CardOverview)
Vue.component('card-list-display-settings', CardListDisplaySettings)
Vue.component('card-list-filter-settings', CardListFilterSettings)
Vue.component('card-list-sort-settings', CardListSortSettings)

import _ from 'lodash'

export default {
    data: function () {
        return {
            units: [],
            paginate: ['units'],
            options: {
                server: window.location.host === 'card.skufes.moe' ? 'skufes-card-images.zeoncdn.cn' : 'skufes-card-images-intl.zeoncdn.cn',
                frame: 'framed',
                idolized: 'normal',
                frameVersion: '40',
                filter: {
                    rarity: ["1", "2", "3", "4", "5"],
                    attribute: ["1", "2", "3"]
                },
                sort: {
                    key: 'unit_id',
                    by: 'desc'
                }
            },
            showDisplaySettings: false,
            showFilterSettings: false,
            showSortSettings: false,
            members: [
                { name: "高坂穂乃果", id: 1, tags: [ "muse_grade_2", "group_muse", "team_printemps" ], model: true },
                { name: "絢瀬絵里", id: 2, tags: [ "muse_grade_3", "group_muse", "team_bibi" ], model: true },
                { name: "南ことり", id: 3, tags: [ "muse_grade_2", "group_muse", "team_printemps" ], model: true },
                { name: "園田海未", id: 4, tags: [ "muse_grade_2", "group_muse", "team_lilywhite" ], model: true },
                { name: "星空凛", id: 5, tags: [ "muse_grade_1", "group_muse", "team_printemps" ], model: true },
                { name: "西木野真姫", id: 6, tags: [ "muse_grade_1", "group_muse", "team_bibi" ], model: true },
                { name: "東條希", id: 7, tags: [ "muse_grade_3", "group_muse", "team_lilywhite" ], model: true },
                { name: "小泉花陽", id: 8, tags: [ "muse_grade_1", "group_muse", "team_printemps" ], model: true },
                { name: "矢澤にこ", id: 9, tags: [ "muse_grade_3", "group_muse", "team_bibi" ], model: true },
                { name: "高海千歌", id: 101, tags: [ "aqours_grade_2", "group_aqours", "team_cyaron" ], model: true },
                { name: "桜内梨子", id: 102, tags: [ "aqours_grade_2", "group_aqours", "team_guiltykiss" ], model: true },
                { name: "松浦果南", id: 103, tags: [ "aqours_grade_3", "group_aqours", "team_azalea" ], model: true },
                { name: "黒澤ダイヤ", id: 104, tags: [ "aqours_grade_3", "group_aqours", "team_azalea" ], model: true },
                { name: "渡辺曜", id: 105, tags: [ "aqours_grade_2", "group_aqours", "team_cyaron" ], model: true },
                { name: "津島善子", id: 106, tags: [ "aqours_grade_1", "group_aqours", "team_guiltykiss" ], model: true },
                { name: "国木田花丸", id: 107, tags: [ "aqours_grade_1", "group_aqours", "team_azalea" ], model: true },
                { name: "小原鞠莉", id: 108, tags: [ "aqours_grade_3", "group_aqours", "team_guiltykiss" ], model: true },
                { name: "黒澤ルビィ", id: 109, tags: [ "aqours_grade_1", "group_aqours", "team_cyaron" ], model: true },
                { name: "Others", id: 0, tags: [ "others" ], model: true },
            ],
        }
    },
    computed: {
        filteredUnits: function () {
            let filters = [
                this.filterUnitsByType,
                this.filterUnitsByRarity,
                this.filterUnitsByAttribute,
                this.sortUnits,
                this.reverseUnits
            ]
            let filtered = _.clone(this.units)
            for (let filter of filters) {
                filtered = filter(filtered)
            }
            return filtered
        },
        paginator: function () {
            return this.$refs.paginator
        }
    },
    created: function () {
        this.$http.get('//api.skufes.moe/db/unit')
        .then(response => {
            this.units = response.body
        })
    },
    methods: {
        filterUnitsByRarity: function (units) {
            return _.filter(units, unit => this.options.filter.rarity.indexOf(unit.rarity.toString()) !== -1)
        },
        filterUnitsByAttribute: function (units) {
            return _.filter(units, unit => this.options.filter.attribute.indexOf(unit.attribute_id.toString()) !== -1)
        },
        sortUnits: function (units) {
            return _.sortBy(units, 'unit_id')
        },
        reverseUnits: function (units) {
            return this.options.sort.by === 'asc' ? units : _.reverse(units)
        },
        openSortSettings: function () {
            this.showSortSettings = true
        },
        openDisplaySettings: function () {
            this.showDisplaySettings = true
        },
        openFilterSettings: function () {
            this.showFilterSettings = true
        },
        filterUnitsByType: function (units) {
            return _.filter(units, unit => {
                let unit_type_id = unit.unit_type_id
                if (unit_type_id > 0 && unit_type_id <= 9 || unit_type_id > 100 && unit_type_id <= 109) {
                    return _.find(this.members, member => member.id === unit_type_id).model
                }
                else {
                    return _.find(this.members, member => member.id === 0).model
                }
            })
        }
    },
    mounted: function () {
    },
    watch: {
        'options.server': function (server) {
            switch (this.options.server) {
                case 'skufes-card-images.zeoncdn.cn':
                case 'skufes-card-images-intl.zeoncdn.cn':
                    this.options.frameVersion = '40'
                    break
                case 'card.llsupport.cn':
                case 'card.lovelivesupport.com':
                    if(this.options.frame === 'transparent')
                        this.options.frame = 'frameless'
                    break
            }
        },
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