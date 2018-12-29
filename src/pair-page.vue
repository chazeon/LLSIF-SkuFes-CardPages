<template>
<div class="ui centered stackable grid container" id="main-container">
    <div class="ui eight wide column">
        <img class="ui rounded image" v-bind:src="`//skufes-card-images.zeoncdn.cn/${display.frame}/pair/${pair_id}.png`" />
        <table class="ui center aligned unstackable table" v-if="pair.length > 0">
            <thead>
            <tr>
                <th>{{leftUnit.name}}</th>
                <th>{{rightUnit.name}}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{{leftUnit.eponym}}</td>
                <td>{{rightUnit.eponym}}</td>
            </tr>
            </tbody>
        </table>
        <a class="ui fluid button" v-on:click="toggleFrame()">{{text.frame[display.frame]}}</a>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import _ from 'lodash'
export default {
    props: [ 'pair_id' ],
    data: function () {
        return {
            pair: [],
            display: {
                frame: 'framed'
            },
            text: {
                frame: { framed: 'Framed', frameless: 'Frameless' }
            },
        }
    },
    methods: {
        toggleOption: function (option, text) {
            let options = _.keys(text)
            let optionId = options.indexOf(option)
            optionId = (optionId + 1) % options.length
            return options[optionId]
        },
        toggleFrame: function () {
            this.display.frame = this.toggleOption(this.display.frame, this.text.frame)
        }
    },
    computed: {
        leftUnit: function () { return _.find(this.pair, pair_unit => pair_unit.position === 0).unit },
        rightUnit: function () { return _.find(this.pair, pair_unit => pair_unit.position === 1).unit }
    },
    created: function () {
        this.$http.get(`//api.skufes.moe/db/pair/${this.pair_id}`)
        .then(response => this.pair = response.body)
    }
}
</script>
<style>
#main-container {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>