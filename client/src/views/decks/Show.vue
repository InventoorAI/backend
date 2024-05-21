import SearchBar from '@/components/SearchBar.vue';
<template>
  <div>
    <BreadCrumbs />

    <div class="relative">
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1 flex items-center gap-2">
          <h2
            class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight"
          >
            {{ query.name }}
          </h2>
          <div class="flex items-center mt-1 gap-2">
            <Badge
              v-for="tag in query.tags"
              :key="tag.name"
              :color="tag.color"
              :icon="tag.icon"
              class="mr-2"
            >
              {{ tag.name }}
            </Badge>
          </div>
        </div>
      </div>
    </div>

    <div
      class="text-slate-400 flex items-center gap-2 divide-x divide-slate-300/40 mt-1"
    >
      <span class="flex items-center gap-1">
        <User class="text-sm w-5 text-green-300" />
        {{ query.recentStudents }}
      </span>

      <span class="pl-3">
        <Rating v-model="query.rating" :cancel="false" readonly />
      </span>

      <div class="pl-3 capitalize flex items-center gap-1">
        <DifficultyLevel :difficulty="query.difficulty" />
        <span class="mt-0.5">
          {{ query.difficulty }}
        </span>
      </div>
      <span> </span>
    </div>

    <p class="text-slate-400 mt-2">
      {{ query.description }}
    </p>
    <div class="flex items-center gap-2 mt-4">
      <Button class="">
        <div class="pr-1 flex text-slate-200 pl-1 items-center gap-2">
          <Play class="w-4 h-4" />
          Practice
        </div>
      </Button>

      <Button class="">
        <div class="pr-1 flex text-slate-200 pl-1 items-center gap-2">
          <PenBox class="w-4 h-4" />
          Exam
        </div>
      </Button>
    </div>

    <div class="grid mt-4 gap-2">
      <Card>
        <div class="h-80 w-full p-8">
          {{ query.flashcards[0].question }}
        </div>
      </Card>
      <div class="flex items-center gap-2 justify-between">
        <div class="flex items-center gap-2">
          <Button>
            <div class="p-1 text-slate-300">
              <Play class="w-5 h-5" />
            </div>
          </Button>
          <Button>
            <div class="p-1 text-slate-300">
              <Shuffle class="w-5 h-5" />
            </div>
          </Button>
        </div>
        <div class="flex items-center gap-3">
          <Button>
            <div class="p-1 text-slate-300">
              <ArrowLeft class="w-5 h-5" />
            </div>
          </Button>
          <p class="text-slate-400">
            <span class="font-bold">
              {{ 1 }}
            </span>
            / {{ query.total }}
          </p>

          <Button>
            <div class="p-1 text-slate-300">
              <ArrowRight class="w-5 h-5" />
            </div>
          </Button>
        </div>

        <div class="flex items-center gap-2">
          <Button>
            <div class="p-1 text-slate-300">
              <Settings class="w-5 h-5" />
            </div>
          </Button>
          <Button>
            <div class="p-1 text-slate-300">
              <Fullscreen class="w-5 h-5" />
            </div>
          </Button>
        </div>
      </div>
    </div>
    <div>
      <div class="flex items-center gap-2 mt-4">
        <div class="flex items-center">
          <Avatar
            v-for="contributor in query.contributors"
            :key="contributor.name"
            class="w-6 h-6 bg-green-400/40 rounded-full opacity-80"
          />
        </div>

        <p class="text-slate-400 text-md">
          <span class="text-green-400 font-semibold">
            {{ query.contributors.length }}
          </span>
          Contributors
        </p>
      </div>

      <div class="flex items-center text-slate-300 gap-1 mt-2">
        <Avatar class="bg-green-400/80 rounded-full" />
        <div class="-space-y-1">
          <div class="text-sm font-light">Created by</div>
          <div class="text-lg font-bold text-white">
            {{ query.contributors[0].name }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <Card class="rounded-md overflow-clip">
        <DataTable
          :value="query.flashcards"
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
              <Column :footer="10" />
              <Column :footer="30" />
            </Row>
          </ColumnGroup>
        </DataTable>
      </Card>

      <ContextMenu ref="cm" :model="menuModel" @hide="selectedCard = null" />
    </div>
  </div>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import SearchBar from '@/components/SearchBar.vue';
import { reactive, ref } from 'vue';
import PrimeButton from 'primevue/button';
import Rating from 'primevue/rating';
import {
  ArrowLeft,
  ArrowRight,
  CircleArrowDown,
  Cog,
  Fullscreen,
  PenBox,
  Play,
  Settings,
  Shuffle,
  User,
} from 'lucide-vue-next';

const filters = reactive({
  global: 'TEST',
});
const onRowEditSave = (e) => {
  console.log(e);
};

const cm = ref();
const menuModel = ref([
  {
    label: 'View',
    icon: 'pi pi-fw pi-search',
    command: () => viewProduct(selectedProduct),
  },
  {
    label: 'Delete',
    icon: 'pi pi-fw pi-times',
    command: () => deleteProduct(selectedProduct),
  },
]);
const onRowContextMenu = (event) => {
  cm.value.show(event.originalEvent);
};
const selectedCards = ref([]);
const selectedCard = ref(null);
const query = reactive({
  id: 1,
  difficulty: 'easy',
  imageUrl: '/src/assets/images/computational_methods.jpg',
  total: 10,
  new: 5,
  due: 3,
  leech: 2,
  suspended: 0,
  rating: 4.5,
  recentStudents: 31,
  properties: [
    {
      key: 'Chapter',
      type: 'number',
      value: 1,
    },
    {
      key: 'Code',
      type: 'text',
      value: 'CM-101',
    },
  ],
  contributors: [
    {
      name: 'John Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'john.doe@gmail.com',
    },
    {
      name: 'John Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'john.doe@gmail.com',
    },
    {
      name: 'John Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'john.doe@gmail.com',
    },
    {
      name: 'John Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'john.doe@gmail.com',
    },
  ],
  coverUrl: 'https://source.unsplash.com/random/900x700/?maths',
  name: 'Significance and Error',
  description:
    "A deck for chapter 3 of the course of Computational methods. This deck contains cards about numerical integration, including techniques like the trapezoidal rule, Simpson's rule, and Romberg algorithm, along with implementation in Octave",
  tags: [
    {
      name: 'Mathematics',
      color: 'green',
      icon: 'Maths',
    },
    {
      name: 'University',
      color: 'blue',
      icon: 'University',
    },
  ],
  flashcards: [
    {
      number: 1,
      question: 'What is the capital of France?',
      tags: [
        {
          name: 'Trivia',
          color: 'purple',
        },
      ],
      decks: [],
      type: 'Multiple Choice',
      level: 'Easy',
      callout: 'New Card',
      options: [
        {
          value: 'Paris',
          isCorrect: true,
          imgPath: 'https://source.unsplash.com/random/900x700/?paris',
        },
        {
          value: 'London',
          isCorrect: false,
          imgPath: 'https://source.unsplash.com/random/900x700/?london',
        },
        {
          value: 'Berlin',
          isCorrect: false,
          imgPath: 'https://source.unsplash.com/random/900x700/?berlin',
        },
        {
          value: 'Madrid',
          isCorrect: false,
          imgPath: 'https://source.unsplash.com/random/900x700/?madrid',
        },
      ],
    },
    {
      number: 2,
      question: 'Calculate $\\int{x^2}dx$',
      tags: [
        {
          name: 'Mathematics',
          color: 'green',
        },
      ],
      decks: [],
      type: 'Steps',
      level: 'Easy',
      callout: 'New Card',
    },
    {
      number: 3,
      question: 'What is the quadratic formula',
      tags: [
        {
          name: 'Mathematics',
          color: 'green',
        },
      ],
      decks: [],
      type: 'Multiple Choice',
      level: 'Easy',
      callout: 'New Card',
    },
  ],
});
interface Props {}
import Button from '@/components/Button.vue';
import DifficultyBar from '@/components/DifficultyBar.vue';
import DifficultyLevel from '@/components/DifficultyLevel.vue';
import Badge from '@/components/Badge.vue';
import Card from '@/components/Card.vue';
import Avatar from '@/components/Avatar.vue';
import ContextMenu from 'primevue/contextmenu';
</script>
