<script setup lang="ts">
const emits = defineEmits(["closeModal"]);
</script>

<template>
  <Teleport to="body">
    <Overlay @click="emits('closeModal')">
      <article
        class="z-50 rounded-lg shadow-lg w-11/12 max-w-7xl bg-bone fixed overflow-hidden"
      >
        <slot />
      </article>
    </Overlay>
  </Teleport>
</template>
