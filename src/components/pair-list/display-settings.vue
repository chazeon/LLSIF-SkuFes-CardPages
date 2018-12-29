<template>
<modal :close="close" :show="show">
    <div class="header" slot="header">Display Settings</div>
    <div class="content" slot="content">
        <div class="ui form">
            <h4 class="ui dividing header">View</h4>
            <div class="grouped fields">
                <label>Frame and Background</label>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="framed" v-model="options.frame" />
                        <label>Framed</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="frameless" v-model="options.frame" />
                        <label>Without Frame</label>
                    </div>
                </div>
            </div>
            <div class="field"></div>
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
        //$(this.$el).modal()
    }
}
</script>
