<script setup lang="ts">
export interface ErrorMessageProps {
  message?: string;
  retryText?: string;
}

export interface ErrorMessageEmits {
  (e: 'retry'): void;
}

withDefaults(defineProps<ErrorMessageProps>(), {
  message: 'Ocurrió un error al cargar los datos.',
  retryText: 'Reintentar',
});

const emit = defineEmits<ErrorMessageEmits>();

const onRetry = () => {
  emit('retry');
};
</script>

<template>
  <div
    role="alert"
    aria-live="polite"
    class="flex flex-col items-center justify-center w-full max-w-lg p-6 mx-auto my-8 text-center border rounded-xl bg-red-50 border-red-200 shadow-sm text-black-coffee gap-y-4"
  >
    <div
      class="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600"
    >
      <Icon name="mdi:alert-circle-outline" size="28px" aria-hidden="true" />
    </div>

    <p class="text-base font-medium text-gray-800">
      {{ message }}
    </p>

    <button
      type="button"
      @click="onRetry"
      class="px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 rounded-lg shadow bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
    >
      {{ retryText }}
    </button>
  </div>
</template>
