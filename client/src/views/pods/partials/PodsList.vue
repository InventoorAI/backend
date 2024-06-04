<template>
  <div class="pl-20">
    <DataView :value="pods" :layout="layout as Layout" dataKey="_id">
      <template #header>
        <div class="flex justify-end">
          <SelectButton
            v-model="layout"
            :options="['list', 'grid']"
            :allowEmpty="false"
          >
            <template #option="{ option }">
              <Grid v-if="option === 'grid'" />
              <List v-else />
            </template>
          </SelectButton>
        </div>
      </template>

      <template #list="slotProps">
        <div class="flex flex-wrap">
          <PodListCard
            :isLoading="isLoading"
            v-for="(_, index) in slotProps.items"
            :key="index"
            v-model="slotProps.items[index]"
          />
        </div>
      </template>

      <template #grid="slotProps">
        <div class="flex flex-wrap">
          <PodGridCard
            :isLoading="isLoading"
            v-for="(_, index) in slotProps.items"
            :key="index"
            v-model="slotProps.items[index]"
          />
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
import { HexapodService } from '@/services/HexapodService';
import { Grid, List } from 'lucide-vue-next';
import DataView from 'primevue/dataview';
import SelectButton from 'primevue/selectbutton';
import { ref, onMounted } from 'vue';
import PodListCard from './PodListCard.vue';
import PodGridCard from './PodGridCard.vue';

onMounted(() => {
  HexapodService.getHexapods().then((response) => {
    pods.value = response.data;
    isLoading.value = false;
  });
});

const isLoading = ref(true);
const pods = ref();
type Layout = 'grid' | 'list' | undefined;
const layout = ref<Layout>('grid');
</script>
