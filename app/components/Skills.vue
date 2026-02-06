<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, computed, type ComputedRef } from 'vue';
import type { CVData } from '~/types';
import { RESUME_DATA } from '~/constants';

const portfolioData = inject<ComputedRef<CVData>>('portfolioData', computed(() => RESUME_DATA));

const marqueeRef = ref<HTMLElement | null>(null);
const marqueeWrapper = ref<HTMLElement | null>(null);
const skillsSectionRef = ref<HTMLElement | null>(null);
let ctx: any;

onMounted(async () => {
  if (process.client) {
    const gsap = (await import('gsap')).default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');

    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      // Marquee horizontal animation
      gsap.to(marqueeRef.value, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear"
      });

      // Marquee vertical parallax on scroll
      gsap.to(marqueeWrapper.value, {
        scrollTrigger: {
          trigger: marqueeWrapper.value,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        y: -100,
        ease: "none"
      });

      // Skills categories reveal
      const categories = gsap.utils.toArray('.skill-category');
      categories.forEach((cat: any) => {
        gsap.from(cat, {
          scrollTrigger: {
            trigger: cat,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power4.out"
        });
      });

      // Refresh ScrollTrigger once everything is set up
      ScrollTrigger.refresh();
    });
  }
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});

const allSkills = computed(() => [
  ...portfolioData.value.skills.languages,
  ...portfolioData.value.skills.frameworks,
  ...portfolioData.value.skills.tools
]);

// Duplicate for seamless loop
const marqueeContent = computed(() => [...allSkills.value, ...allSkills.value, ...allSkills.value]);

const categories = computed(() => [
  { name: 'Languages', items: portfolioData.value.skills.languages },
  { name: 'Frameworks & Libs', items: portfolioData.value.skills.frameworks },
  { name: 'Tools & Ecosystem', items: portfolioData.value.skills.tools }
]);
</script>

<template>
  <section class="py-32 bg-brand-black overflow-hidden">

    <!-- Brutalist Marquee with Parallax -->
    <div ref="marqueeWrapper"
      class="relative border-y border-brand-light/10 bg-brand-gray/10 py-10 mb-32 rotate-[-2deg] scale-110 origin-center z-10">
      <div ref="marqueeRef" class="flex whitespace-nowrap gap-12">
        <span v-for="(skill, i) in marqueeContent" :key="i"
          class="text-5xl md:text-7xl font-display font-bold uppercase text-transparent stroke-white outline-text opacity-40 hover:opacity-100 hover:text-brand-accent transition-all duration-300">
          {{ skill }} —
        </span>
      </div>
    </div>

    <!-- Brutalist Technical Arsenal Section -->
    <div ref="skillsSectionRef" class="max-w-7xl mx-auto px-6 md:px-12 mb-40">
      <div
        class="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-brand-light/10 pb-12">
        <h2 class="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-none">
          TECHNICAL<br />
          <span class="text-brand-accent">ARSENAL</span>
        </h2>
        <div class="max-w-xs">
          <p class="font-mono text-xs uppercase tracking-widest text-gray-500 leading-relaxed">
            [ SECTION 02 ] <br />
            Engineered tools and methodologies for high-performance development.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3">
        <div v-for="(cat, idx) in categories" :key="cat.name"
          class="skill-category group border-l border-brand-light/10 md:first:border-l-0 p-8 md:p-12 hover:bg-brand-gray/5 transition-all duration-500 relative overflow-hidden">

          <!-- Large Background Index -->
          <span
            class="absolute -right-4 -top-8 text-[12rem] font-display font-bold text-white/5 select-none pointer-events-none group-hover:text-brand-accent/5 transition-colors duration-500">
            0{{ idx + 1 }}
          </span>

          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-10">
              <div
                class="w-8 h-[1px] bg-brand-accent transform origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500">
              </div>
              <h3 class="font-mono text-xs text-brand-accent uppercase tracking-[0.2em]">{{ cat.name }}</h3>
            </div>

            <ul class="space-y-6">
              <li v-for="item in cat.items" :key="item" class="flex items-baseline gap-4 group/item">
                <span
                  class="text-4xl md:text-5xl font-display font-bold text-brand-light/90 group-hover/item:text-brand-accent group-hover/item:translate-x-2 transition-all duration-300">
                  {{ item }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Bottom Decorative Line -->
          <div
            class="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent transform scale-x-0 transition-transform duration-700 origin-left group-hover:scale-x-100">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
