<template>
<modal :close="close" :show="show">
    <div class="header" slot="header">Sort Settings</div>
    <div class="content" slot="content">
        <div class="ui form">
            <h4 class="ui dividing header">Sort</h4>
            <div class="grouped fields">
                <label>Key</label>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="unit_id" v-model="options.sort.key"/>
                        <label>Card ID</label>
                    </div>
                </div>
            </div>
            <div class="grouped fields">
                <label>By</label>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="asc" v-model="options.sort.by" />
                        <label>Ascending</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="desc" v-model="options.sort.by" />
                        <label>Descending</label>
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
export default {
    props: [ 'options', 'show', 'close' ],
    data: function () {
        return {}
    },
    methods: {
    },
    mounted: function () {
    }
}
</script>