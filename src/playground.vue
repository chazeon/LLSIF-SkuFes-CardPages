<template>
<div class="ui container">
<div class="ui form">
<div class="ui field" v-for="option in options">
<div class="ui checkbox">
    <input type="checkbox" name="example" v-model="selected" :value="option.name">
    <label>{{option.name}}</label>
</div>
</div>
<div class="ui field" v-for="tag in tags">
<div class="ui checkbox">
    <input type="checkbox" name="example" :indeterminate.prop="getTagIndeterminate(tag)" :checked.prop="getTagChecked(tag)">
    <label>{{tag}}</label>
</div>
</div>
</div>
</div>
</template>
<script>
import _ from 'lodash'
export default {
    data: function () {
        return {
            options: [
                { name: "Value 1", tags: [ "All", "Tag A", "Tag C" ], group: "Group A" },
                { name: "Value 2", tags: [ "All", "Tag A", "Tag B" ], group: "Group A" },
                { name: "Value 3", tags: [ "All", "Tag B", "Tag C" ], group: "Group B" }
            ],
            selected: [ "Value 1", "Value 2" ],
            all_tags: [ "Tag A", "Tag B", "Tag C", "All" ]
        }
    },
    methods: {
        getTagMembers: function (tag) {
            return _.filter(this.options, option => option.tags.indexOf(tag) !== -1)
        },
        getTagCheckedMembers: function (tag) {
            return _.filter(this.getTagMembers(tag), option => this.selected.indexOf(option.name) !== -1)
        },
        getTagChecked: function (tag) {
            return this.getTagCheckedMembers(tag).length === this.getTagMembers(tag).length
        },
        getTagIndeterminate: function (tag) {
            return this.getTagCheckedMembers(tag).length > 0 && this.getTagChecked(tag) === false
        }
    },
    computed: {
        tags: function () {
            return this.all_tags
        }
    }
}
</script>
</script>