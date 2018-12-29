<template>
<div class="ui stackable grid container" id="main-container">
    <div class="ui six wide column" v-if="unit">
        <div class="ui basic center aligned segment">
            <img class="ui rounded image" v-bind:src="displayCardImageSrc" v-if="displayCardImageSrc" />
            <div class="ui two fluid tiny buttons" style="margin-top: 10px">
                <a class="ui button" v-on:click="toggleFrame()">{{text.frame[display.frame]}}</a>
                <a class="ui button" v-on:click="toggleIdolized()">{{text.idolized[display.idolized]}}</a>
            </div>
        </div>
    </div>
    <div class="ui ten wide column" v-if="unit">
        <div class="ui basic segment">
            <h3 class="ui header">
                <img class="ui image" v-bind:src="displayIconImageSrc" v-if="displayIconImageSrc" />
                <div class="content">
                    {{unit.name}}<div class="sub header">{{unit.eponym}}</div>
                </div>
            </h3>
        </div>
        <div class="ui basic segment">
            <div class="ui sub header">Basic Information</div>
        </div>
        <div class="ui basic segment">
            <div class="ui sub header">Property</div>
            <table class="ui very basic compact table">
                <tbody>
                    <tr>
                        <td>Rank Up</td>
                        <td><input v-model="options.unit_level_max" type="checkbox"></td>
                    </tr>
                    <tr>
                        <td>Level</td>
                        <td><input v-model="options.unit_level_id" type="number" min="1" :max="options.unit_level_max ? unit.after_level_max : unit.before_level_max"> / {{options.unit_level_max ? unit.after_level_max : unit.before_level_max}}</td>
                    </tr>
                    <tr>
                        <td>Love</td>
                        <td><input v-model="options.unit_love" type="number" min="0" :max="options.unit_level_max ? unit.after_love_max : unit.before_love_max"> / {{options.unit_level_max ? unit.after_love_max: unit.before_love_max}}</td>
                    </tr>
                    <tr v-if="unit.unit_level_up_pattern">
                        <td>Property</td>
                        <td>{{property.smile}} / {{property.pure}} / {{property.cool}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="ui basic segment">
            <div class="ui sub header">Skills</div>
            <table class="ui very basic compact table">
                <tbody>
                    <tr v-if="unit.unit_skill">
                        <td>Skill Name</td>
                        <td>{{unit.unit_skill.name}}</td>
                    </tr>
                    <tr v-if="unit.unit_skill">
                        <td>Skill Level</td>
                        <td><input v-model="options.unit_skill_level_id" type="number" min="1" :max="unit.unit_skill.unit_skill_level.length"> / {{unit.unit_skill.unit_skill_level.length}} <span v-if="unit.unit_skill.unit_skill_level_up_pattern[options.unit_skill_level_id - 1]" >(next: {{unit.unit_skill.unit_skill_level_up_pattern[options.unit_skill_level_id - 1].next_exp}})</span></td>
                    </tr>
                    <tr v-if="unit.unit_skill">
                        <td>Skill Description</td>
                        <td>{{unit.unit_skill.unit_skill_level[options.unit_skill_level_id].description}}</td>
                    </tr>
                    <tr v-if="unit.unit_leader_skill">
                        <td>Leader Skill Name</td>
                        <td>{{unit.unit_leader_skill.name}}</td>
                    </tr>
                    <tr v-if="unit.unit_leader_skill">
                        <td>Leader Skill Description</td>
                        <td>{{unit.unit_leader_skill.description}}</td>
                    </tr>
                    <tr v-if="unit.unit_leader_skill_extra">
                        <td>Leader Extra Skill Description</td>
                        <td>{{unit.unit_leader_skill_extra.member_tag.description}}のメンバーは{{unit.unit_attribute.name}}が{{unit.unit_leader_skill_extra.effect_value}}%UPする</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import _ from 'lodash'
export default {
    props: [ 'unit_id' ],
    data: function () {
        return {
            display: {
                idolized: 'normal',
                frame: 'framed'
            },
            text: {
                idolized: { normal: 'Normal', idolized: 'Idolized' },
                frame: { framed: 'Framed', frameless: 'Frameless', transparent: 'Transparent' }
            },
            unit: {},
            options: {
                unit_level_id: 1,
                unit_skill_level_id: 1,
                unit_level_max: false,
                unit_love: 0
            }
            //unit: { unit_id: parseInt(this.unit_id) }
        }
    },
    computed: {
        cardImageDomain: function () {
             return window.location.host === 'card.skufes.moe' 
                ? 'skufes-card-images.zeoncdn.cn'
                : 'skufes-card-images-intl.zeoncdn.cn'
        },
        displayCardImageSrc: function () {
            if (!this.unit.unit_id) return null
            if (this.display.idolized === 'idolized')
                return `//${this.cardImageDomain}/${this.display.frame}/card/${this.unit.rank_max_card_id}.png`
            else
                return `//${this.cardImageDomain}/${this.display.frame}/card/${this.unit.normal_card_id}.png`
        },
        displayIconImageSrc: function () {
            if (!this.unit.unit_id) return null
            if (this.display.idolized === 'idolized')
                return `//${this.cardImageDomain}/${this.display.frame}/icon/${this.unit.rank_max_card_id}.png`
            else
                return `//${this.cardImageDomain}/${this.display.frame}/icon/${this.unit.normal_card_id}.png`
        },
        property: function () {
            return {
                smile: this.unit.smile_max - this.unit.unit_level_up_pattern[this.options.unit_level_id - 1].smile_diff + (this.unit.attribute_id === 1 ? parseInt(this.options.unit_love) : 0),
                pure: this.unit.pure_max - this.unit.unit_level_up_pattern[this.options.unit_level_id - 1].pure_diff + (this.unit.attribute_id === 2 ? parseInt(this.options.unit_love) : 0),
                cool: this.unit.cool_max - this.unit.unit_level_up_pattern[this.options.unit_level_id - 1].cool_diff + (this.unit.attribute_id === 3 ? parseInt(this.options.unit_love) : 0),
            }
        }
    },
    created: function () {
        this.$http.get(`//api.skufes.moe/db/unit/${this.unit_id}`)
        .then(response => this.unit = response.body)
    },
    methods: {
        toggleOption: function (option, text) {
            let options = _.keys(text)
            let optionId = options.indexOf(option)
            optionId = (optionId + 1) % options.length
            return options[optionId]
        },
        toggleIdolized: function () {
            this.display.idolized = this.toggleOption(this.display.idolized, this.text.idolized)
        },
        toggleFrame: function () {
            this.display.frame = this.toggleOption(this.display.frame, this.text.frame)
        }
    }
}
</script>
<style>
#main-container {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>