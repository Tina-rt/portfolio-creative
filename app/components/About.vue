<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, computed, type ComputedRef } from 'vue';
import type { CVData } from '~/types';
import { RESUME_DATA } from '~/constants';

const portfolioData = inject<ComputedRef<CVData>>('portfolioData', computed(() => RESUME_DATA));

const aboutRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);
let ctx: any;

onMounted(async () => {
  if (process.client) {
    const gsap = (await import('gsap')).default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');

    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      gsap.from(textRef.value, {
        scrollTrigger: {
          trigger: aboutRef.value,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });
  }
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section ref="aboutRef" class="py-24 px-6 md:px-12 bg-brand-black flex justify-center overflow-hidden">
    <div class="max-w-4xl text-center">
      <p ref="textRef" class="text-2xl md:text-4xl font-sans font-light leading-tight text-brand-light/90">
        <span class="text-brand-accent font-display font-bold text-4xl md:text-6xl mr-2">"</span>
        {{ portfolioData.summary }}
      </p>
    </div>
  </section>
</template>
