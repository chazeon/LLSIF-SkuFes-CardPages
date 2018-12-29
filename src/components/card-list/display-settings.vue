<template>
<modal :close="close" :show="show">
    <div class="header" slot="header">Display Settings</div>
    <div class="content" slot="content">
        <div class="ui form">
            <h4 class="ui dividing header">Server</h4>
            <div class="grouped fields">
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="skufes-card-images.zeoncdn.cn" v-model="options.server"/>
                        <label>SKUFES CN</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="skufes-card-images-intl.zeoncdn.cn" v-model="options.server"/>
                        <label>SKUFES International</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="card.llsupport.cn" v-model="options.server"/>
                        <label>LLSupport CN</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="card.lovelivesupport.com" v-model="options.server"/>
                        <label>LLSupport International</label>
                    </div>
                </div>
            </div>
            <h4 class="ui dividing header">View</h4>
            <div class="grouped fields">
                <label>Idolized</label>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="normal" v-model="options.idolized"/>
                        <label>Normal</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="idolized" v-model="options.idolized"/>
                        <label>Idolized</label>
                    </div>
                </div>
            </div>
            <div class="grouped fields" >
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
                <div class="field">
                    <div class="ui radio checkbox" v-bind:class="{ disabled: options.server !== 'skufes.moe' }">
                        <input type="radio" value="transparent" v-model="options.frame" />
                        <label>Transparent Background</label>
                    </div>
                </div>
            </div>
            <div class="grouped fields"  v-bind:class="{ disabled: options.server === 'skufes.moe' }">
                <label>Frame Version</label>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="40" v-model="options.frameVersion" />
                        <label>New</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" value="30" v-model="options.frameVersion"/>
                        <label>Old</label>
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
