<script setup lang="ts">
import { BLOCK_ENUM } from "~~/constantes";
import { IPostBlock } from "~~/interfaces";

interface Props {
  item: IPostBlock;
}

const { item } = defineProps<Props>();

const { type, body, caption } = item;
</script>

<template>
  <div>{{ body }}</div>
</template>
