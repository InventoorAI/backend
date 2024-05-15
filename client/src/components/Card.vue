<template>
  <div
    class="bg-green-400/70 rounded-lg pl-1.5 text-white w-full pr-[1.2px] pb-1 pt-[1.5px] shadow"
  >
    <div
      class="bg-slate-800 rounded-lg text-white/80 py-0.5 divide-y divide-gray-200 overflow-hidden"
    >
      <div class="px-4 py-5 sm:px-6" v-if="$slots['header']">
        <slot name="header" />
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
