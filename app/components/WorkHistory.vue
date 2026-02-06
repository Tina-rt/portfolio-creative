<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, computed, type ComputedRef } from 'vue';
import type { CVData } from '~/types';
import { RESUME_DATA } from '~/constants';

const portfolioData = inject<ComputedRef<CVData>>('portfolioData', computed(() => RESUME_DATA));

const containerRef = ref<HTMLElement | null>(null);
let ctx: any;

onMounted(async () => {
  if (process.client) {
    const gsap = (await import('gsap')).default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');

    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.work-item');

      items.forEach((item: any) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, containerRef.value || undefined);
  }
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section ref="containerRef" class="py-32 px-6 md:px-12 bg-brand-black relative">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-16 border-l-2 border-brand-accent pl-4">
        Experience Log
      </h2>

      <div class="flex flex-col">
        <div v-for="(job, idx) in portfolioData.experience" :key="idx"
          class="work-item group border-t border-brand-light/10 py-12 hover:bg-brand-gray/20 transition-colors duration-500 relative">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div class="md:col-span-3">
              <span class="font-mono text-sm text-brand-accent/80 block mb-2">{{ job.period }}</span>
              <h3 class="text-xl font-display font-medium text-white">{{ job.company }}</h3>
            </div>
            <div class="md:col-span-4">
              <h4
                class="text-2xl md:text-3xl font-display font-bold text-brand-light group-hover:text-white transition-colors">
                {{ job.role }}
              </h4>
            </div>
            <div class="md:col-span-5">
              <p class="text-gray-400 font-sans leading-relaxed text-sm md:text-base">
                {{ job.description }}
              </p>
            </div>
          </div>

          <!-- Hover reveal icon -->
          <!-- <div
            class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccff00" stroke-width="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>
