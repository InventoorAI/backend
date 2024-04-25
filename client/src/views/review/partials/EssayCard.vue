<template>
  <BaseCard :flashcard="flashcard">
    <LongAnswerInput v-model="answer" />
  </BaseCard>
</template>
<script setup lang="ts">
import BaseCard from '@/views/review/partials/BaseCard.vue';
interface Props {
  flashcard: App.Models.Flashcard;
  answer: string;
}
defineProps<Props>();
const answer = ref('');
import { ref } from 'vue';
import LongAnswerInput from './LongAnswerInput.vue';
</script>
