<script setup lang="ts">
import { ISkillProperties } from "~~/interfaces";

interface Props {
  skillProps: ISkillProperties;
}

const target = ref();

const { isOutside } = useMouseInElement(target);

const { skillProps } = defineProps<Props>();
</script>

<template>
  <article
    class="relative flex flex-col justify-between overflow-hidden duration-300 transform rounded-lg shadow-lg bg-secondary bg-opacity-30 hover:scale-105"
    ref="target"
    :title="skillProps.Name"
    v-motion-slide-left
  >
    <img
      :src="skillProps.Image_URL"
      :alt="skillProps.Name"
      class="aspect-square"
    />
    <transition name="fade" appear>
    <Pill v-if="!isOutside" class='absolute top-1 left-1'>
      {{ skillProps.Name }}
    </Pill>
    </transition>
  </article>
</template>