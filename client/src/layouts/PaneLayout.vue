<template>
  <div
    class="mx-auto flex w-full items-start gap-x-8 mr-9 py-10 bg-slate-800 max-w-7xl"
  >
    <aside class="sticky top-8 hidden w-44 shrink-0 lg:block">
      <slot name="left" />
    </aside>

    <main class="flex-1">
      <slot name="main" />
    </main>

    <aside class="sticky top-8 hidden w-96 shrink-0 xl:block">
      <slot name="right" />
    </aside>
  </div>
</template>
