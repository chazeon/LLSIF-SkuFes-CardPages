<!--template>
<div class="ui modal">
    <div class="header">Filter Settings</div>
    <div class="content">
        <div class="ui form">
            <h4 class="ui dividing header">Filtering</h4>
            <div class="field"><label>Character</label></div>
            <div class="field"><label>Grouping</label></div>
            <div class="field"><label>Rarity</label></div>
            <div class="field"><label>Origin</label></div>
            <div class="field"><label>Extra Skill</label></div>
            <div class="field"><label>Skill Type</label></div>
        </div>
    </div>
    <div class="actions">
        <div class="ui button">Cancel</div>
        <div class="ui button">OK</div>
    </div>
</div>
</template>
<script>
export default {
    props: [ 'options' ]
}
</script-->

<template>
<modal :close="close" :show="show">
    <div class="header" slot="header">Filter Settings</div>
    <div class="content" slot="content">
        <div class="ui form">
            <h4 class="ui dividing header">Unit</h4>
            <div class="grouped fields">
                <label>Group</label>
                <div class="inline three-dividing fields">
                    <tristate-checkbox :members="membersWithTag('group_muse')" name="μ's"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('group_aqours')" name="Aqours"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('others')" name="Others"></tristate-checkbox>
                </div>
                <label>Member</label>
                <div class="fields">
                    <div class="field" v-for="member in membersWithTag('group_muse')" :key="member.id">
                        <div class="ui checkbox">
                            <input type="checkbox" :value="member.id" v-model="member.model">
                            <label>{{member.name}}</label>
                        </div>
                    </div>
                </div>
                <div class="fields">
                    <div class="field" v-for="member in membersWithTag('group_aqours')" :key="member.id">
                        <div class="ui checkbox">
                            <input type="checkbox" :value="member.id" v-model="member.model">
                            <label>{{member.name}}</label>
                        </div>
                    </div>
                </div>
                <div class="fields">
                    <div class="field" v-for="member in membersWithTag('others')" :key="member.id">
                        <div class="ui checkbox">
                            <input type="checkbox" :value="member.id" v-model="member.model">
                            <label>{{member.name}}</label>
                        </div>
                    </div>
                </div>
                <label>Grade</label>
                <div class="inline three-dividing fields">
                    <tristate-checkbox :members="membersWithTag('muse_grade_1')" name="μ'sの1年生"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('muse_grade_2')" name="μ'sの2年生"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('muse_grade_3')" name="μ'sの3年生"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('aqours_grade_1')" name="Aqoursの1年生"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('aqours_grade_2')" name="Aqoursの2年生"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('aqours_grade_3')" name="Aqoursの3年生"></tristate-checkbox>
                </div>
                <label>Team</label>
                <div class="inline three-dividing fields">
                    <tristate-checkbox :members="membersWithTag('team_printemps')" name="Printemps"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('team_lilywhite')" name="lily white"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('team_bibi')" name="BiBi"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('team_cyaron')" name="CYaRon！"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('team_azalea')" name="AZALEA"></tristate-checkbox>
                    <tristate-checkbox :members="membersWithTag('team_guiltykiss')" name="Guilty Kiss"></tristate-checkbox>
                </div>
            </div>
        </div>
        <div class="ui form">
            <h4 class="ui dividing header">Unit</h4>
            <div class="grouped fields">
                <label>Rarity</label>
                <div class="inline fields">
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" value="1" v-model="options.filter.rarity"/>
                            <label>N</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" value="2" v-model="options.filter.rarity"/>
                            <label>R</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" value="3" v-model="options.filter.rarity"/>
                            <label>SR</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" value="5" v-model="options.filter.rarity"/>
                            <label>SSR</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" value="4" v-model="options.filter.rarity"/>
                            <label>UR</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grouped fields">
                <label>Attribute</label>
                <div class="inline fields">
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" value="1" v-model="options.filter.attribute" />
                            <label>Smile</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" value="2" v-model="options.filter.attribute" />
                            <label>Pure</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" value="3" v-model="options.filter.attribute" />
                            <label>Cool</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</modal>
</template>
<script>
import _ from 'lodash'
import Vue from 'vue'
import Modal from '../shared/modal.vue'
Vue.component('modal', Modal)
import TristateCheckbox from './tristate-checkbox.vue'
Vue.component('tristate-checkbox', TristateCheckbox)
export default {
    props: [ 'options', 'show', 'close', 'members' ],
    data: function () {
        return {
        }
    },
    methods: {
        membersWithTag: function (tag) {
            return this.members.filter(member => member.tags.indexOf(tag) !== -1)
        }
    },
    mounted: function () {
    }
}
</script>
<style>
</style>
