<template>
  <button
    :class="{
      'pl-1.5 border-green-400/80 border-r bg-green-400/80 hover:border-green-300 hover:bg-green-300 hover:pl-2 transition':
        props.variant === 'button',
      'border-none bg-green-400/50 pr-1 pl-0': props.variant === 'hole',
    }"
    class="bg-green-400 rounded-md border-green-400 border-y rounded-md border-y h-fit"
  >
    <div
      class="bg-slate-800 rounded-md pl-1 pr-1 flex py-1 px-1 items-center gap-1"
      :class="{
        'py-1': props.variant === 'button',
      }"
    >
      <slot />
    </div>
  </button>
</template>
<script setup lang="ts">
interface Props {
  variant: 'hole' | 'button';
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'button',
});
</script>
