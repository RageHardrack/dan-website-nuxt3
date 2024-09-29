<script lang="ts" setup>
interface Props {
  filterOptions: string[];
}

const { filterOptions } = defineProps<Props>();

const filterSelected = defineModel();

const onChangeFilterOptions = (optionSelected: string) =>
  (filterSelected.value = optionSelected);
</script>

<template>
  <header class="flex flex-wrap gap-x-1 gap-y-2">
    <button
      v-for="option in filterOptions"
      :key="option"
      @click="onChangeFilterOptions(option)"
      class="px-3 py-1 transition duration-300 ease-in-out border rounded-lg border-gold hover:bg-gold"
      :class="{ 'bg-gold font-semibold': option === filterSelected }"
    >
      {{ option }}
    </button>

    <button
      @click="onChangeFilterOptions('')"
      class="px-3 py-1 transition duration-300 ease-in-out border rounded-lg border-gold hover:bg-gold"
      :class="{ 'bg-gold font-semibold': filterSelected === '' }"
    >
      All
    </button>
  </header>
</template>
