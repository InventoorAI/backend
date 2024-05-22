<template>
  <DataTable :value="properties" stripedRows>
    <Column field="key" header="" class="text-sm"></Column>
    <Column field="key" header="Property" sortable class="text-sm"></Column>
    <Column field="value" header="Value" class="text-sm"></Column>
    <Column field="visible" header="Visible" class="text-sm"></Column>
  </DataTable>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

interface Props {
  properties: App.Models.Property[];
}
defineProps<Props>();
</script>
