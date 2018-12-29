<template>
    <div class="ui container" id="main-container">
        <div class="ui form">
            <div class="fields">
                <div class="field">
                    <label>Perfect %</label>
                    <input type="number" placeholder="100" v-model.number="options.perfectRate">
                </div>
                <div class="field">
                    <label>Combo</label>
                    <input type="number" placeholder="500" v-model.number="options.combo">
                </div>
                <div class="field">
                    <label>Hold %</label>
                    <input type="number" placeholder="25" v-model.number="options.holdRate">
                </div>
                <div class="field">
                    <label>Length / s</label>
                    <input type="number" placeholder="120" v-model.number="options.songLength">
                </div>
                <div class="field">
                    <label>Level</label>
                    <input type="number" placeholder="8" v-model.number="options.skillLevel">
                </div>
            </div>
        </div>
        <table class="ui sortable table">
            <thead>
                <tr>
                    <th :class="{ 'ascending': !options.desc, 'descending': options.desc, 'sorted': options.sort === 'id'}" @click="switchSort('id')">#</th>
                    <th :class="{ 'ascending': !options.desc, 'descending': options.desc, 'sorted': options.sort === ''}">Icon</th>
                    <th :class="{ 'ascending': !options.desc, 'descending': options.desc, 'sorted': options.sort === ''}">Skill Level</th>
                    <th :class="{ 'ascending': !options.desc, 'descending': options.desc, 'sorted': options.sort === 'smile-prop'}" @click="switchSort('smile-prop')">Smile</th>
                    <th :class="{ 'ascending': !options.desc, 'descending': options.desc, 'sorted': options.sort === 'pure-prop'}" @click="switchSort('pure-prop')">Pure</th>
                    <th :class="{ 'ascending': !options.desc, 'descending': options.desc, 'sorted': options.sort === 'cool-prop'}" @click="switchSort('cool-prop')">Cool</th>
                    <th :class="{ 'ascending': !options.desc, 'descending': options.desc, 'sorted': options.sort === 'smile-strength'}" @click="switchSort('smile-strength')">Smile</th>
                    <th :class="{ 'ascending': !options.desc, 'descending': options.desc, 'sorted': options.sort === 'pure-strength'}" @click="switchSort('pure-strength')">Pure</th>
                    <th :class="{ 'ascending': !options.desc, 'descending': options.desc, 'sorted': options.sort === 'cool-strength'}" @click="switchSort('cool-strength')">Cool</th>
                    <th :class="{ 'ascending': !options.desc, 'descending': options.desc, 'sorted': options.sort === 'max-strength'}" @click="switchSort('max-strength')">Max Strength</th>
                    <th :class="{ 'ascending': !options.desc, 'descending': options.desc, 'sorted': options.sort === 'skill-strength'}" @click="switchSort('skill-strength')">Skill</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="unit in filteredUnits" :key="unit.id">
                    <td>{{unit.unit.unit_id}}</td>
                    <td><img class="ui mini image" :src="`//skufes-card-images.zeoncdn.cn/framed/icon/${unit.cardId}.png`"></td>
                    <td>{{unit.skillLevel.toLocaleString()}}</td>
                    <td>{{unit.property.smile.toLocaleString()}}</td>
                    <td>{{unit.property.pure.toLocaleString()}}</td>
                    <td>{{unit.property.cool.toLocaleString()}}</td>
                    <td>{{unit.strength.smile.toLocaleString()}}</td>
                    <td>{{unit.strength.pure.toLocaleString()}}</td>
                    <td>{{unit.strength.cool.toLocaleString()}}</td>
                    <td>{{unit.maxStrength.toLocaleString()}}</td>
                    <td>{{unit.skillStrength.toLocaleString()}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

import Vue from 'vue'
import VueResource from 'vue-resource'
import _ from 'lodash'
import SIFConst from './plugins/SIFConst.js'
import SIFCombo from './plugins/SIFCombo.js'

Vue.use(VueResource)

function comboScore(note) {
    let score_rate = 1.0
    return _.reduce(SIFCombo, (sum, combo_score) => {
        let notes_in_range = _.clamp(note - combo_score.combo_cnt + 10, 0, 10)
        let result = sum + notes_in_range * score_rate
        score_rate = combo_score.score_rate
        return result
    }, 0)
}

class Unit {
    constructor (unit, options) {
        this.unit = unit
        this.rankMax = false
        //this.skillLevel = options.skill
        this.options = options
    }
    get skillLevel() {
        return this.options.skillLevel
    }
    get love() {
        return this.rankMax ? this.unit.after_love_max : this.unit.before_love_max
    }
    get property() {
        return {
            smile: this.unit.smile_max - this.unit.unit_level_up_pattern[this.rankMax ? 1 : 0].smile_diff + (this.unit.attribute_id === SIFConst.ATTRIBUTE.SMILE ? this.love : 0),
            pure: this.unit.pure_max - this.unit.unit_level_up_pattern[this.rankMax ? 1 : 0].pure_diff + (this.unit.attribute_id === SIFConst.ATTRIBUTE.PURE ? this.love : 0),
            cool: this.unit.cool_max - this.unit.unit_level_up_pattern[this.rankMax ? 1 : 0].cool_diff + (this.unit.attribute_id === SIFConst.ATTRIBUTE.COOL ? this.love : 0)
        }
    }
    get cardId() {
        return this.rankMax ? this.unit.rank_max_card_id : this.unit.normal_card_id
    }
    get skillStrength() {
        return this.calcSkillStrength()
    }
    get strength() {
        return {
            smile: this.property.smile * 1.15 /* * 1.1 */ + this.skillStrength,
            pure: this.property.pure * 1.15 /* * 1.1 */ + this.skillStrength,
            cool: this.property.cool * 1.15 /* * 1.1 */ + this.skillStrength
        }
    }
    get maxStrength() {
        return Math.max(this.strength.smile, this.strength.pure, this.strength.cool)
    }
    get skill() {
        return _.assign(
            {},
            this.unit.unit_skill,
            _.filter(this.unit.unit_skill.unit_skill_level, level => level.skill_level === this.skillLevel)[0]
        )
    }
    calcSkillStrength() {
        //console.log(`${this.calcEffectRateEachChance()}, ${this.calcTriggerChance()}, ${this.calcScorePerTrigger()}`)
        return this.calcEffectRateEachChance() * this.calcTriggerChance() * this.calcScorePerTrigger() * 2.5 * 100 // / (.94 + .4 * .5)
    }
    calcScorePerTrigger() {
        switch(this.skill.skill_effect_type) {
            case SIFConst.SKILL_EFFECT.score_plus:
                return this.skill.effect_value
            default:
                return 0.0
        }
    }
    calcTriggerChance() {
        switch(this.skill.trigger_type) {
            case SIFConst.SKILL_TRIGGER_TYPE.notes_count:
            case SIFConst.SKILL_TRIGGER_TYPE.combo_count:
                return 1 / this.skill.trigger_value
            case SIFConst.SKILL_TRIGGER_TYPE.perfect_count:
                return 1 / this.skill.trigger_value * (this.options.perfectRate / 100)
            case SIFConst.SKILL_TRIGGER_TYPE.time:
                return this.options.songLength / this.options.combo / this.skill.trigger_value
            default:
                return 0.0
        }
    }
    calcEffectRateEachChance() {
        let scoreBonusNormal = 1.25 * (this.options.perfectRate / 100) + 1.1 * (1 - this.options.perfectRate / 100)
        let scoreBonusHold = scoreBonusNormal * scoreBonusNormal
        return (this.skill.activation_rate / 100) /
            (this.options.combo / comboScore(this.options.combo)) /
            (this.options.holdRate / 100 * scoreBonusHold + (1 - this.options.holdRate / 100) * scoreBonusNormal)
    }
    setSkill(level) {
        this.skillLevel = level
        return this
    }
    setRank(max) {
        this.rankMax = max
        return this
    }
    duplicate() {
        return new Unit(this.unit)
    }
}

export default {
    data: function () {
        return {
            units: [],
            ready: false,
            options: {
                skillLevels: _.range(1, 9),
                skillLevel: 4,
                perfectRate: 95,
                combo: 700,
                holdRate: 8,
                songLength: 120,
                sort: 'max-strength',
                desc: true
            }
        }
    },
    computed: {
        filteredUnits: function () {
            let result = this.units
            result = _.sortBy(result, unit => {
                switch (this.options.sort) {
                    case 'id': return unit.id
                    case 'smile-prop': return unit.property.smile
                    case 'pure-prop': return unit.property.pure
                    case 'cool-prop': return unit.property.cool
                    case 'smile-strength': return unit.strength.smile
                    case 'pure-strength': return unit.strength.pure
                    case 'cool-strength': return unit.strength.cool
                    case 'max-strength': return unit.maxStrength
                    case 'skill-strength': return unit.skillStrength
                }
            })
            if (this.options.desc) result = _.reverse(result)
            result = _.filter(result, unit => !Number.isNaN(unit.skillStrength))
            return result
        }
    },
    mounted: function () {
        this.$http.get('//api.skufes.moe/db/unit_skill').then(response => {
            this.units = _.map(response.body, unit => new Unit(unit, this.options))
            this.units = _.filter(this.units, unit => unit.unit.unit_skill.unit_skill_level !== undefined)
            this.ready = true
        })
    },
    methods: {
        switchSort: function (key) {
            if (this.options.sort === key)
                this.options.desc = !this.options.desc
            else
                this.options.sort = key
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

