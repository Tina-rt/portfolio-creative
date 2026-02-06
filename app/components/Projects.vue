<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, computed, type ComputedRef } from 'vue';
import type { CVData } from '~/types';
import { RESUME_DATA } from '~/constants';

const portfolioData = inject<ComputedRef<CVData>>('portfolioData', computed(() => RESUME_DATA));
const { getDirectImageUrl } = useImage();

const containerRef = ref<HTMLElement | null>(null);
let ctx: any;

onMounted(async () => {
  if (process.client) {
    const gsap = (await import('gsap')).default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');

    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      const projects = gsap.utils.toArray('.project-card');

      projects.forEach((card: any) => {
        gsap.fromTo(card.querySelector('.project-img'),
          { y: "-10%" },
          {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            },
            y: "10%",
            ease: "none"
          }
        );
      });

    }, containerRef.value || undefined);
  }
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section ref="containerRef" class="py-24 bg-brand-black overflow-hidden">
    <div class="px-6 md:px-12 mb-24">
      <h2 class="text-7xl md:text-9xl font-display font-bold outline-text text-center opacity-30">
        SELECTED WORKS
      </h2>
    </div>

    <div class="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-32">
      <div v-for="(project, idx) in portfolioData.projects" :key="idx"
        :class="['project-card flex flex-col', idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row', 'gap-12 items-center']">

        <!-- Image Area with Parallax -->
        <div class="w-full md:w-3/5 relative overflow-hidden h-[400px] md:h-[600px] bg-brand-gray group">
          <div
            class="absolute inset-0 bg-brand-accent/10 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          </div>
          <img :src="getDirectImageUrl(project.cover_image || project.image)" :alt="project.title"
            class="project-img absolute top-0 left-0 w-full h-[120%] object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
        </div>

        <!-- Content Area -->
        <div class="w-full md:w-2/5 z-20">
          <span class="text-brand-accent font-mono text-sm mb-4 block tracking-widest">{{ project.date }}</span>
          <h3 class="text-4xl md:text-6xl font-display font-bold mb-6 leading-[0.9] uppercase">
            {{ project.title }}
          </h3>
          <p class="text-gray-400 mb-8 text-lg font-light leading-relaxed">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2 mb-8">
            <span v-for="(t, i) in project.tech" :key="i"
              class="px-3 py-1 border border-brand-light/20 text-xs font-mono uppercase text-brand-light/70 hover:bg-brand-light hover:text-black transition-colors cursor-default">
              {{ t }}
            </span>
          </div>

          <div v-if="project.link" class="mt-8">
            <a :href="project.link" target="_blank" rel="noopener noreferrer"
              class="group/link inline-flex items-center gap-2 text-brand-accent font-mono text-sm tracking-widest uppercase hover:text-brand-light transition-colors">
              <span>View Project</span>
              <svg class="transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
