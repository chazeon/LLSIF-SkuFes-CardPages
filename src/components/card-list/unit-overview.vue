<template>
<div class="ui modal unit-overview-modal">
    <div class="header">{{unitDetail.name}}<div class="sub header">{{unitDetail.eponym}}</div></div>
    <div class="image content">
        <div class="image">
            <img v-bind:src="displayImageSrc" />
        </div>
    </div>
    <div class="actions">
        <div class="ui button" v-on:click="optionsQuit()">Cancel</div>
        <div class="ui button" v-on:click="optionsSubmit()">OK</div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
    props: ['unit'],
    data: function () {
        return {
            display: {
                frame: 'framed',
                idolized: 'normal'
            },
            unitDetail: this.unit
        }
    },
    computed: {
        displayImageSrc: function () {
            return `//card-images.skufes.moe/${this.display.mode}/cards/${this.unit.normal_card_id}.png`
        }
    },
    created: function () {
        this.$http.get(`//api.skufes.moe/db/unit/${this.unit.unit_id}`)
        .then(response => {
            this.unitDetail = response.body
        })
    }
}
</script>