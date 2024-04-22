<template>
  <StatsSection />

  <div class="mt-4 border-b border-gray-200">
    <div class="sm:flex sm:items-baseline">
      <h3 class="text-base font-semibold leading-6 text-gray-900">Issues</h3>
      <div class="mt-4 sm:ml-10 sm:mt-0">
        <nav class="-mb-px flex space-x-8">
          <a
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.href"
            :class="[
              tab.current
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
            >{{ tab.name }}</a
          >
        </nav>
      </div>
    </div>
  </div>

  <DrawerList class="mt-6" />
</template>
<script setup lang="ts">
import StatsSection from "@/pages/Partials/StatSection.vue";
import DrawerList from "@/pages/Drawers/Partials/List.vue";

const tabs = [
  { name: "Open", href: "#", current: true },
  { name: "Closed", href: "#", current: false },
];
</script>
