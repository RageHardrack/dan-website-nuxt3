<script setup lang="ts">
const emits = defineEmits(["pressButton"]);

const clicked = () => emits("pressButton");
</script>

<template>
  <button @click.prevent="clicked">
    <Icon name="menu" size="40px" class="text-gold" />
  </button>
</template>
