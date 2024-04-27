<template>
  <BaseCard :flashcard="flashcard">
    <template #right> Test </template>
    <template #default>
      <LongAnswerInput v-model="answer" />
    </template>
  </BaseCard>
</template>
<script setup lang="ts">
import BaseCard from '@/views/review/partials/BaseCard.vue';
interface Props {
  flashcard: App.Models.Flashcard;
}
defineProps<Props>();
const answer = ref('');
import { ref } from 'vue';
import LongAnswerInput from './LongAnswerInput.vue';
</script>
