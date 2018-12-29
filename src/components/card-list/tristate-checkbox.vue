<template>
<div class="field">
    <div class="ui checkbox">
        <input type="checkbox" v-model="model" :indeterminate.prop="indeterminate">
        <label>{{name}}</label>
    </div>
</div>
</template>
<script>
export default {
    props: [ 'members', 'name' ],
    data: function () {
        return {
            model: this.getModel(),
            modelPassive: false
        }
    },
    methods: {
        getModel: function () {
            return this.members.reduce((sum, currMember) => sum && currMember.model, true)
        }
    },
    computed: {
        indeterminate: function () {
            return !this.model && this.members.reduce((sum, currMember) => sum || currMember.model, false)
        }
    },
    watch: {
        members: function () {
            let afterModel = this.getModel()
            if (afterModel !== this.model) {
                this.model = afterModel
                this.modelPassive = true
            }
        },
        model: function (val) {
            if (this.modelPassive) this.modelPassive = false
            else this.members.forEach(member => member.model = val)
        }
    }
}
</script>

