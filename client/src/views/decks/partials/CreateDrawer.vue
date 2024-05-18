<template>
  <!-- drawer component -->

  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />
      <div
        class="fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 px-6 overflow-y-auto transition-transform bg-white dark:bg-slate-800"
        tabindex="-1"
        aria-labelledby="drawer-label"
        aria-hidden="true"
      >
        <h5
          id="drawer-label"
          class="inline-flex items-center mb-6 text-sm font-semibold text-slate-500 uppercase dark:text-slate-400"
        >
          New Deck
        </h5>
        <button
          type="button"
          @click="open = false"
          data-drawer-dismiss="drawer-create-deck-default"
          aria-controls="drawer-create-deck-default"
          class="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white"
        >
          <X class="w-4 h-4" aria-hidden="true" />

          <span class="sr-only">Close menu</span>
        </button>
        <form action="#">
          <ul class="space-y-3">
            <li v-for="(property, name) in newForm">
              <label
                for="difficulty"
                class="mb-2 text-sm font-medium text-slate-900 dark:text-white flex items-center capitalize justify-between"
              >
                <div class="flex items-center">
                  <button
                    class="text-slate-500 hover:text-slate-400"
                    type="button"
                  >
                    <GripVertical class="w-4 h-4 mr-1" aria-hidden="true" />
                  </button>

                  <button
                    class="text-slate-500 hover:text-slate-400"
                    type="button"
                  >
                    <component
                      v-if="property.icon"
                      :is="property.icon"
                      class="w-4 h-4 mr-2"
                      aria-hidden="true"
                    />
                    <Brush class="w-4 h-4 mr-2" aria-hidden="true" v-else />
                  </button>

                  <input
                    type="text"
                    class="bg-transparent border-none outline-none focus:ring-0 text-sm px-0 py-0 capitalize"
                    :value="name"
                  />
                </div>

                <button
                  type="button"
                  class="hover:text-slate-400 text-slate-500"
                >
                  <Pencil class="w-3.5" />
                </button>
              </label>
              <InputText v-model="newForm[name].value" class="w-full" />
            </li>
          </ul>

          <!--   <!-- Cover Image -->
          <!-- -->
          <!-- -->
          <!---->
          <!--   <div class="space-y-4"> -->
          <!--     <div class="col-span-full"> -->
          <!--       <div -->
          <!--         class="mt-2 flex justify-center rounded-lg border border-dashed border-slate-500/80 px-6 py-10" -->
          <!--       > -->
          <!--         <div class="text-center"> -->
          <!--           <PhotoIcon -->
          <!--             class="mx-auto h-12 w-12 text-slate-500" -->
          <!--             aria-hidden="true" -->
          <!--           /> -->
          <!--           <div class="mt-4 flex text-sm leading-6 text-slate-600"> -->
          <!--             <label -->
          <!--               for="file-upload" -->
          <!--               class="relative cursor-pointer rounded-md font-semibold text-green-400/60 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500 px-1" -->
          <!--             > -->
          <!--               <span>Upload a file</span> -->
          <!--               <input -->
          <!--                 id="file-upload" -->
          <!--                 name="file-upload" -->
          <!--                 @change="onFileChange" -->
          <!--                 type="file" -->
          <!--                 class="sr-only" -->
          <!--               /> -->
          <!--             </label> -->
          <!--             <p class="pl-1">or drag and drop</p> -->
          <!--           </div> -->
          <!--           <p class="text-xs leading-5 text-slate-600"> -->
          <!--             PNG, JPG, GIF up to 10MB -->
          <!--           </p> -->
          <!--         </div> -->
          <!--       </div> -->
          <!--     </div> -->
          <!--     <div class="pt-4"> -->
          <!--       <label -->
          <!--         for="difficulty" -->
          <!--         class="mb-2 text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2" -->
          <!--       > -->
          <!--         <FolderPen class="w-4 text-slate-500" /> -->
          <!--         Name</label -->
          <!--       > -->
          <!--       <InputText id="name" v-model="form.name" class="w-full" /> -->
          <!--     </div> -->
          <!---->
          <!--     <div> -->
          <!--       <label -->
          <!--         for="difficulty" -->
          <!--         class="mb-2 text-sm font-medium text-slate-900 dark:text-white flex items-center" -->
          <!--       > -->
          <!--         <FlagIcon class="w-4 h-4 mr-1 text-slate-500" aria-hidden="true" /> -->
          <!--         Difficulty</label -->
          <!--       > -->
          <!--       <DifficultyComboBox v-model="form.difficulty" /> -->
          <!--     </div> -->
          <!---->
          <!--     <div> -->
          <!--       <label -->
          <!--         for="difficulty" -->
          <!--         class="mb-2 text-sm font-medium text-slate-900 dark:text-white flex items-center" -->
          <!--       > -->
          <!--         <TagIcon class="w-4 h-4 mr-1 text-slate-500" aria-hidden="true" /> -->
          <!--         Tag</label -->
          <!--       > -->
          <!--       <TagSelect v-model="form.tags" class="w-full" /> -->
          <!--     </div> -->
          <!--     <!-- Contributor Section -->
          <!-- -->
          -->
          <!--     <div> -->
          <!--       <label class="flex items-center gap-1"> -->
          <!--         <Users class="w-4 h-4 text-slate-500" /> -->
          <!--         <h3 class="text-sm font-medium text-slate-100">Contributors</h3> -->
          <!--       </label> -->
          <!--       <div class="sm:col-span-2 mt-2"> -->
          <!--         <div class="flex -space-x-1"> -->
          <!--           <RouterLink -->
          <!--             v-for="person in form.contributors" -->
          <!--             :key="person.email" -->
          <!--             :to="`/users/${person.email}`" -->
          <!--             class="flex-shrink-0 rounded-full hover:opacity-75" -->
          <!--           > -->
          <!--             <img -->
          <!--               class="inline-block h-6 w-6 rounded-full border border-green-400/80" -->
          <!--               :src="person.imageUrl" -->
          <!--               :alt="person.name" -->
          <!--             /> -->
          <!--           </RouterLink> -->
          <!---->
          <!--           <button -->
          <!--             type="button" -->
          <!--             class="rounded-full bg-green-400 w-6 h-6 flex items-center justify-center" -->
          <!--           > -->
          <!--             <span class="absolute -inset-2" /> -->
          <!--             <span class="sr-only">Add team member</span> -->
          <!--             <PlusIcon class="h-4 w-4 text-white" aria-hidden="true" /> -->
          <!--           </button> -->
          <!--         </div> -->
          <!--       </div> -->
          <!--     </div> -->
          <!---->
          <!--     <!-- <PropertyList :properties="form.properties" /> -->
          -->
          <!---->
          <!--     <div> -->
          <!--       <label -->
          <!--         for="difficulty" -->
          <!--         class="mb-2 text-sm font-medium text-slate-900 dark:text-white flex items-center" -->
          <!--       > -->
          <!--         <Text class="w-4 h-4 mr-1 text-slate-500" aria-hidden="true" /> -->
          <!--         Description</label -->
          <!--       > -->
          <!--       <Textarea v-model="value" rows="5" cols="30" /> -->
          <!--     </div> -->
          <!--     <div class="flex w-full pb-4 space-x-4 md:px-4 md:absolute"> -->
          <!--       <button -->
          <!--         type="submit" -->
          <!--         class="text-white w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" -->
          <!--       > -->
          <!--         Add deck -->
          <!--       </button> -->
          <!--       <button -->
          <!--         type="button" -->
          <!--         data-drawer-dismiss="drawer-create-deck-default" -->
          <!--         aria-controls="drawer-create-deck-default" -->
          <!--         class="inline-flex w-full justify-center text-slate-500 items-center bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-slate-200 text-sm font-medium px-5 py-2.5 hover:text-slate-900 focus:z-10 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-500 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-600" -->
          <!--       > -->
          <!--         <svg -->
          <!--           aria-hidden="true" -->
          <!--           class="w-5 h-5 -ml-1 sm:mr-1" -->
          <!--           fill="none" -->
          <!--           stroke="currentColor" -->
          <!--           viewBox="0 0 24 24" -->
          <!--           xmlns="http://www.w3.org/2000/svg" -->
          <!--         > -->
          <!--           <path -->
          <!--             stroke-linecap="round" -->
          <!--             stroke-linejoin="round" -->
          <!--             stroke-width="2" -->
          <!--             d="M6 18L18 6M6 6l12 12" -->
          <!--           ></path> -->
          <!--         </svg> -->
          <!--         Cancel -->
          <!--       </button> -->
          <!--     </div> -->
          <!--   </div> -->
        </form>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup lang="ts">
import Label from 'primevue/label';
import { PhotoIcon } from '@heroicons/vue/24/outline';
import { reactive } from 'vue';
import Textarea from 'primevue/textarea';
import DifficultyComboBox from './DifficultyComboBox.vue';
import {
  Brush,
  FlagIcon,
  FolderPen,
  GripVertical,
  Pen,
  Pencil,
  PlusIcon,
  TagIcon,
  Text,
  User2,
  Users,
  X,
} from 'lucide-vue-next';
import TagSelect from './TagSelect.vue';
import PropertyList from './PropertyList.vue';
import InputText from 'primevue/inputtext';
import { Dialog, TransitionRoot } from '@headlessui/vue';
import { useVModel } from '@vueuse/core';

const newForm = reactive({
  name: {
    type: 'text',
    icon: FolderPen,
    value: 'Chapter 1',
    required: true,
    removable: false,
    placeholder: 'Name',
    movable: false,
    editable: false,
    default: 'Chapter 1',
  },
  difficulty: {
    type: 'text',
    icon: FlagIcon,
    value: 'easy',
    required: true,
    removable: false,
    placeholder: 'Difficulty',
    movable: false,
    editable: false,
    default: 'easy',
    items: ['easy', 'medium', 'hard'],
  },
});
const form = reactive({
  name: '',
  difficulty: 'easy',
  imageUrl: '/src/assets/images/computational_methods.jpg',
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
  ],
  coverUrl: 'https://source.unsplash.com/random/900x700/?maths',
  description:
    "A deck for chapter 3 of the course of Computational methods. This deck contains cards about numerical integration, including techniques like the trapezoidal rule, Simpson's rule, and Romberg algorithm, along with implementation in Octave",
  tags: [],
});

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.coverUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};
interface Props {
  open: boolean;
}
const props = defineProps<Props>();
interface Emits {
  (e: 'update:open', value: boolean): void;
}
const emits = defineEmits<Emits>();
const open = useVModel(props, 'open', emits);
</script>
