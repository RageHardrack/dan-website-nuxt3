<script setup lang="ts">
const emits = defineEmits(['pressButton']);

const clicked = () => emits('pressButton');
</script>

<template>
  <button
    @click.prevent="clicked"
    aria-label="Abrir menú"
    class="cursor-pointer"
  >
    <Icon name="menu" size="40px" class="text-gold" />
  </button>
</template>
