<script setup lang="ts">
import { inject, computed, type ComputedRef } from 'vue';
import type { CVData } from '~/types';
import { RESUME_DATA } from '~/constants';

const portfolioData = inject<ComputedRef<CVData>>('portfolioData', computed(() => RESUME_DATA));
</script>

<template>
  <section class="py-24 px-6 md:px-12 bg-brand-black flex justify-center">
    <div class="max-w-4xl text-center">
      <p class="text-2xl md:text-4xl font-sans font-light leading-tight text-brand-light/90">
        <span class="text-brand-accent font-display font-bold text-4xl md:text-6xl mr-2">"</span>
        {{ portfolioData.summary }}
      </p>
    </div>
  </section>
</template>
