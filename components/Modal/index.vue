<script setup lang="ts">
import { useUIStore } from "~~/store";

const store = useUIStore();

const closeModal = store.closeModal;
</script>

<template>
  <Teleport to="body">
    <Overlay @click="closeModal">
      <article
        class="fixed z-50 w-11/12 overflow-hidden rounded-lg shadow-lg max-w-7xl bg-bone"
      >
        <slot />
      </article>
    </Overlay>
  </Teleport>
</template>
