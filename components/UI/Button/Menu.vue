<script setup lang="ts">
const emits = defineEmits(["pressButton"]);

const clicked = () => emits("pressButton");
</script>

<template>
  <button @click.prevent="clicked">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="w-8 h-8 fill-current text-gold"
    >
      <path
        d="M20,14H4c-1.105,0-2-0.895-2-2v0c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v0	C22,13.105,21.105,14,20,14z"
      />
      <path
        d="M20,7H4C2.895,7,2,6.105,2,5v0c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v0C22,6.105,21.105,7,20,7z"
      />
      <path
        d="M20,21H4c-1.105,0-2-0.895-2-2v0c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v0C22,20.105,21.105,21,20,21z"
      />
    </svg>
  </button>
</template>
