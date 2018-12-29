<template>
    <div class="ui card">
        <div class="progressive image">
            <!--progressive-img
                v-bind:src="`//skufes-card-images.zeoncdn.cn/thumbnail/framed/pairs/${pair.pair_id}.png`"
                v-bind:placeholder="`//skufes-card-images.zeoncdn.cn/tiny/framed/pairs/${pair.pair_id}.png`"
            ></progressive-img-->
            <img v-bind:src="`//skufes-card-images.zeoncdn.cn/${options.frame}/pair/${pair.pair_id}.png?x-oss-process=style/thumb-360`">
        </div>
        <div class="ui dimmer">
            <div class="content">
                <div class="center">
                    <div class="ui inverted header">
                        <a v-bind:href="`#/card/${getUnitByPosition(pair, 0).unit_id}`">{{getUnitByPosition(pair, 0).name}}</a>
                        /
                        <a v-bind:href="`#/card/${getUnitByPosition(pair, 1).unit_id}`">{{getUnitByPosition(pair, 1).name}}</a>
                    </div>
                    <a class="ui inverted button" v-bind:href="`#/pair/${pair.pair_id}`">Details</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Vue from 'vue'
import VueProgressiveImage from 'vue-progressive-image'

Vue.use(VueProgressiveImage, {
    blur: 10,
    delay: 2000
})

export default {
    props: ['pair', 'options'],
    data: function () {
        return {
        }
    },
    methods: {
        getUnitByPosition(pair, pos) {
            let pair_unit = _.find(pair.pair, pair_unit => {
                return pair_unit.position === pos
            })
            if (pair_unit) return pair_unit.unit
        }
    },
    computed: {
    },
    mounted: function () {
        $('.ui.card').dimmer({ on: 'hover' })
    }
}
</script>
<style>
.progressive img {
    /*display: block;*/
    width: 100%;
    max-width: 100%;
    height: auto;
    border: 0 none;
}
</style>