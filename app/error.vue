<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-bone text-black-coffee"
  >
    <h1 class="text-7xl font-bold text-primary mb-4">
      {{ props.error.statusCode || 500 }}
    </h1>
    <h2 class="text-2xl font-semibold mb-2">
      {{
        props.error.statusCode === 404
          ? 'Page Not Found'
          : 'Something went wrong'
      }}
    </h2>
    <p class="text-gray-600 max-w-md mb-8">
      {{
        props.error.statusMessage ||
        props.error.message ||
        'An unexpected error occurred while loading this page.'
      }}
    </p>
    <button
      @click="handleError"
      class="px-6 py-3 font-semibold text-white transition duration-300 rounded-lg bg-primary hover:opacity-90 shadow-md cursor-pointer"
    >
      Return to Home
    </button>
  </div>
</template>
