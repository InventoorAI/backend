<template>
  <Card class="rounded-md overflow-clip">
    <ContextMenu ref="cm" :model="menuModel" @hide="selectedCard = null" />
    <DataTable
      :value="data"
      stripedRows
      v-model:filters="filters"
      paginator
      :rows="10"
      :globalFilterFields="['question', 'name', 'category']"
      filter
      editMode="row"
      @row-edit-save="onRowEditSave"
      v-model:selection="selectedCards"
      contextMenu
      v-model:contextMenuSelection="selectedCard"
      @rowContextmenu="onRowContextMenu"
      lazy
      scrollable
      :first="first"
    >
      <template #header>
        <div class="flex items-center justify-end gap-2">
          <!-- @vue-ignore -->
          <SearchBar placeholder="Search Cards" v-model="filters.global" />

          <Button label="Export" @click="exportCSV($event)">
            <ArrowRight class="w-5 h-5" />
            Export
          </Button>
        </div>
      </template>

      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="question" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
      <ColumnGroup type="footer">
        <Row>
          <Column
            footer="Totals:"
            :colspan="3"
            footerStyle="text-align:right"
          />
          <Column :footer="10 + ''" />
          <Column :footer="30 + ''" />
        </Row>
      </ColumnGroup>
    </DataTable>
  </Card>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import DataTable, {
  DataTableRowContextMenuEvent,
  DataTableRowEditSaveEvent,
} from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Button from '@/components/Button.vue';
import SearchBar from '@/components/SearchBar.vue';
import Card from '@/components/Card.vue';

interface Props {
  data: App.Models.Flashcard[];
}

defineProps<Props>();

const first = ref(0);
const filters = reactive({
  global: '',
});
const onRowEditSave = (e: DataTableRowEditSaveEvent) => {
  console.log(e);
};

const viewCard = (card: App.Models.Flashcard) => {
  console.log(card);
};

const deleteCard = (card: App.Models.Flashcard) => {
  console.log(card);
};

const cm = ref();
const menuModel = ref([
  {
    label: 'View',

    // @ts-ignore
    command: () => viewCard(selectedCard),
  },
  {
    label: 'Delete',
    // @ts-ignore
    command: () => deleteCard(selectedCard),
  },
]);
const exportCSV = (event: MouseEvent) => {
  console.log(event);
};

const onRowContextMenu = (event: DataTableRowContextMenuEvent) => {
  cm.value.show(event.originalEvent);
};
const selectedCards = ref([]);
const selectedCard = ref<App.Models.Flashcard | null>(null);
</script>
