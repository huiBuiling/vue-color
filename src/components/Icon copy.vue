<template>
  <div>
    <svg-icon v-if="props.icon" :name="props.icon" />
    <!-- <span v-if="props.title" slot="title">{{ props.title }}</span> -->
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
</script>
