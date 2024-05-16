<template>
  <Combobox as="div" v-model="selected" @update:modelValue="query = ''">
    <div class="relative mt-2">
      <ComboboxInput
        class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        @change="query = $event.target.value"
        @blur="query = ''"
        :display-value="displayValue as any"
        :placeholder="placeholder"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions
        v-if="filteredPeople.length > 0"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-slate-800 shadow-lg border-slate-600 border py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="(option, idx) in filteredPeople"
          :key="idx"
          :value="option"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pr-9',
              active ? 'bg-green-400/80 text-white' : 'text-slate-300',
              active ? option.activeClasses : option.inactiveClasses,
              option.icon || option.imageUrl ? 'pl-3' : 'pl-1',
            ]"
          >
            <div class="flex items-center">
              <img
                :src="option.imageUrl"
                v-if="option.imageUrl"
                alt=""
                class="h-6 w-6 flex-shrink-0 rounded-full"
              />
              <component
                :is="option.icon"
                v-else-if="option.icon"
                class="h-5 w-5 flex-shrink-0 rounded-full"
              />
              <span :class="['ml-3 truncate', selected && 'font-semibold']">
                {{ option.name }}
              </span>
            </div>

            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-green-600',
              ]"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup lang="ts" generic="T extends Option">
export type Option = {
  name: string;
  value: string;
  imageUrl?: string;
  icon?: any;
  inactiveClasses?: string;
  activeClasses?: string;
};
import { computed, ref } from 'vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue';
import { useVModel } from '@vueuse/core';

interface Props {
  modelValue: T;
  items: T[];
  placeholder: string;
  displayValue(option: T): string;
}

interface Emits {
  (e: 'update:modelValue', value: T): void;
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  items: () => [] as T[],
  displayValue: (option: T) => option.name,
});
const emit = defineEmits<Emits>();
const selected = useVModel(props, 'modelValue', emit);
const query = ref('');
const filteredPeople = computed(() =>
  query.value === ''
    ? props.items
    : props.items.filter((option) => {
        return option.name.toLowerCase().includes(query.value.toLowerCase());
      }),
);
</script>
