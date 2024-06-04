<template>
  <div>
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
