<template>
<div :class="['ui', 'dimmer', 'modals', 'page', { 'active': show }]">
    <div :class="['ui', 'modal', { 'active': show }, 'custom-modal']">
        <i class="close icon" @click="close()"></i>
        <slot name="header"></slot>
        <slot name="content"></slot>
    </div>
</div>
</template>
<script>
export default {
    props: [ 'show', 'close' ]
}
</script>
<style>
.custom-modal {
    top: 50%;
    left: 50%;
    transform: translate(0%, -50%)
}
</style>