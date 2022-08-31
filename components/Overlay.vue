<template>
  <transition name="fade">
    <div
      class="flex items-center flex-col justify-center overflow-hidden fixed inset-0 z-30"
    >
      <div class="fixed inset-0 z-40 w-screen h-screen bg-black-coffee/70" />

      <slot />
    </div>
  </transition>
</template>
