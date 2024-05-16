<template>
  <!-- drawer component -->
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
      data-drawer-dismiss="drawer-create-deck-default"
      aria-controls="drawer-create-deck-default"
      class="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <form action="#">
      <!-- Cover Image -->

      <div class="space-y-4">
        <div class="col-span-full">
          <div
            class="mt-2 flex justify-center rounded-lg border border-dashed border-slate-500/80 px-6 py-10"
          >
            <div class="text-center">
              <PhotoIcon
                class="mx-auto h-12 w-12 text-slate-500"
                aria-hidden="true"
              />
              <div class="mt-4 flex text-sm leading-6 text-slate-600">
                <label
                  for="file-upload"
                  class="relative cursor-pointer rounded-md font-semibold text-green-400/60 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500 px-1"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    @change="onFileChange"
                    type="file"
                    class="sr-only"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-slate-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
            >Name</label
          >
          <input
            type="text"
            name="title"
            v-model="form.name"
            id="name"
            class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type deck name"
            required
          />
        </div>
        <div>
          <label
            for="brand"
            class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
            >Brand</label
          >
          <input
            type="text"
            name="title"
            id="brand"
            class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="deck brand"
          />
        </div>

        <div>
          <label
            for="difficulty"
            class="mb-2 text-sm font-medium text-slate-900 dark:text-white flex items-center"
          >
            <FlagIcon class="w-4 h-4 mr-1 text-slate-500" aria-hidden="true" />
            Difficulty</label
          >
          <DifficultyComboBox v-model="form.difficulty" />
        </div>
        <div>
          <label
            for="price"
            class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
            >Price</label
          >
          <input
            type="number"
            name="price"
            id="price"
            class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="$2999"
            required=""
          />
        </div>
        <div>
          <label
            for="category"
            class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
            >Category</label
          >
          <select
            id="category"
            class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option selected="">Select category</option>
            <option value="TV">TV/Monitors</option>
            <option value="PC">PC</option>
            <option value="GA">Gaming/Console</option>
            <option value="PH">Phones</option>
          </select>
        </div>
        <div>
          <label
            for="description"
            class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
            >Description</label
          >
          <textarea
            id="description"
            rows="4"
            class="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Enter event description here"
          ></textarea>
        </div>
        <div
          class="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute"
        >
          <button
            type="submit"
            class="text-white w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Add deck
          </button>
          <button
            type="button"
            data-drawer-dismiss="drawer-create-deck-default"
            aria-controls="drawer-create-deck-default"
            class="inline-flex w-full justify-center text-slate-500 items-center bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-slate-200 text-sm font-medium px-5 py-2.5 hover:text-slate-900 focus:z-10 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-500 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-600"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 -ml-1 sm:mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { PhotoIcon } from '@heroicons/vue/24/outline';
import { reactive } from 'vue';
import DifficultyComboBox from './DifficultyComboBox.vue';
import { FlagIcon } from 'lucide-vue-next';

const form = reactive({
  id: 1,
  difficulty: 'easy',
  imageUrl: '/src/assets/images/computational_methods.jpg',
  total: 10,
  new: 5,
  due: 3,
  leech: 2,
  suspended: 0,
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
  owners: [
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
</script>
