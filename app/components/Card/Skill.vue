<script setup lang="ts">
import type { ISkillProperties } from '~/interfaces';

interface Props {
  skillProps: ISkillProperties;
}

const { skillProps } = defineProps<Props>();

const hasImageError = ref(false);

const handleImageError = () => {
  hasImageError.value = true;
};
</script>

<template>
  <article
    class="group relative flex flex-col items-center justify-between p-2 overflow-hidden duration-300 transform rounded-lg shadow-lg bg-secondary/30 hover:scale-105 aspect-square"
    :title="skillProps.Name"
  >
    <div
      class="flex items-center justify-center flex-1 w-full overflow-hidden p-1"
    >
      <img
        v-if="!hasImageError && skillProps.Image_URL"
        :src="skillProps.Image_URL"
        :alt="skillProps.Name"
        class="object-contain max-w-full max-h-full aspect-square"
        loading="lazy"
        decoding="async"
        @error="handleImageError"
      />
      <div
        v-else
        data-testid="image-fallback"
        class="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-gold font-bold text-lg shadow-inner"
        aria-hidden="true"
      >
        {{ skillProps.Name ? skillProps.Name.charAt(0).toUpperCase() : '?' }}
      </div>
    </div>

    <footer
      data-testid="skill-name"
      class="w-full text-center truncate text-[11px] md:text-xs font-semibold text-bone px-1 py-0.5 rounded bg-black-coffee/60 backdrop-blur-sm"
    >
      {{ skillProps.Name }}
    </footer>
  </article>
</template>
