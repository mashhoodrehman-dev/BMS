<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },

  emits: ["retry"],
});
</script>

<template>
  <p>{{ message }}</p>
  <button @click="$emit('retry')">Retry</button>
</template>
