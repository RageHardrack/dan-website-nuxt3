<script setup lang="ts">
import type { ISkillProperties } from '~/interfaces';

interface Props {
  skillProps: ISkillProperties;
}

const target = ref();

const { isOutside } = useMouseInElement(target);

const { skillProps } = defineProps<Props>();
</script>

<template>
  <article
    class="relative flex flex-col justify-center p-2 overflow-hidden duration-300 transform rounded-lg shadow-lg bg-secondary/30 hover:scale-105 aspect-square"
    ref="target"
    :title="skillProps.Name"
  >
    <img :src="skillProps.Image_URL" :alt="skillProps.Name" class="" />

    <Transition
      appear
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <Pill v-if="!isOutside" class="absolute top-1 left-1">
        {{ skillProps.Name }}
      </Pill>
    </Transition>
  </article>
</template>
