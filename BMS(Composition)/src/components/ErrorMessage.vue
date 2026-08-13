<script setup lang="ts">
defineProps<{
  message: string
}>()
defineEmits<{
  return: []
}>()
</script>
<template>
  <p>{{ message }}</p>
  <button @click="$emit('retry')">Retry</button>
</template>
