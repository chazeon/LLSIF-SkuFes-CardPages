<template>
    <div class="ui card">
        <div class="progressive image">
            <!--progressive-img
                v-bind:src="`//card-images.skufes.moe/thumbnail/${options.frame}/cards/${cardId}.png`"
                v-bind:placeholder="`//card-images.skufes.moe/tiny/${options.frame}/cards/${cardId}.png`"
            ></progressive-img-->
            <img v-bind:src="cardImageSrc">
        </div>
        <div class="ui dimmer">
            <div class="content">
                <div class="center">
                    <div class="ui inverted header">{{unit.name}}<div v-if="unit.eponym" class="inverted sub header">{{unit.eponym}}</div></div>
                    <a class="ui inverted button" v-bind:href="`#/card/${unit.unit_id}`">Details</a>
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
    props: [ 'unit', 'options' ],
    data: function () {
        return {
        }
    },
    computed: {
        cardId: function () {
            if (this.options.idolized === "idolized")
                return this.unit.rank_max_card_id
            else
                return this.unit.normal_card_id
        },
        cardImageSrc: function () {
            switch (this.options.server) {
                case 'skufes-card-images.zeoncdn.cn':
                case 'skufes-card-images-intl.zeoncdn.cn':
                    return `//${this.options.server}/${this.options.frame}/card/${this.cardId}.png?x-oss-process=style/thumb-360-neue`
                case 'card.llsupport.cn':
                case 'card.lovelivesupport.com':
                    return `https://${this.options.server}/card/v${this.options.frameVersion[0]}${this.options.frame === 'frameless' ? 'nb' : ''}/${this.cardId}.png`
            }
        }
    },
    methods: {
        displayUnitOverview: function () {
            $(this.$el.getElementsByClassName('unit-overview')).modal('show')
        }
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