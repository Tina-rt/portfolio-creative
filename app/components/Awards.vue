<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, computed, type ComputedRef } from 'vue';
import type { CVData } from '~/types';
import { RESUME_DATA } from '~/constants';

const portfolioData = inject<ComputedRef<CVData>>('portfolioData', computed(() => RESUME_DATA));

const awardRef = ref<HTMLElement | null>(null);
let ctx: any;

onMounted(async () => {
    if (process.client) {
        const gsap = (await import('gsap')).default;
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
            // Awards reveal
            const awards = gsap.utils.toArray('.award-item');
            awards.forEach((award: any) => {
                gsap.from(award, {
                    scrollTrigger: {
                        trigger: award,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });

            ScrollTrigger.refresh();
        });
    }
});

onUnmounted(() => {
    if (ctx) ctx.revert();
});
</script>

<template>
    <section class="py-32 bg-brand-black overflow-hidden border-t border-brand-light/10">
        <div ref="awardRef" class="max-w-4xl mx-auto px-6 md:px-12">
            <div class="flex items-center gap-4 mb-16">
                <div class="h-6 w-6 bg-brand-accent"></div>
                <h2 class="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">Recognition & Awards
                </h2>
            </div>

            <div class="grid gap-8">
                <div v-for="(award, idx) in portfolioData.awards" :key="idx"
                    class="award-item group p-8 md:p-10 border border-brand-light/10 hover:border-brand-accent/50 transition-all duration-500 bg-brand-gray/5 hover:bg-brand-gray/10 relative overflow-hidden">

                    <div class="flex flex-col md:flex-row justify-between md:items-start gap-6 relative z-10">
                        <div class="flex-1">
                            <span class="font-mono text-xs text-brand-accent uppercase tracking-widest mb-4 block">[ 0{{
                                idx + 1 }} ]</span>
                            <h4
                                class="text-2xl md:text-3xl font-bold font-display text-brand-light group-hover:text-brand-accent transition-colors duration-300">
                                {{ award.title }}
                            </h4>
                        </div>

                        <div class="flex flex-col items-start md:items-end gap-2">
                            <span
                                class="text-brand-accent font-bold text-sm bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-sm uppercase tracking-wider">
                                {{ award.place }}
                            </span>
                            <span class="text-gray-500 font-mono text-sm uppercase tracking-widest">{{ award.date
                            }}</span>
                        </div>
                    </div>

                    <div class="mt-8 relative z-10">
                        <p class="text-gray-400 text-lg leading-relaxed max-w-2xl font-sans italic">
                            "{{ award.description }}"
                        </p>
                    </div>

                    <!-- Decorative element -->
                    <div
                        class="absolute right-0 bottom-0 w-24 h-24 bg-brand-accent/5 translate-x-12 translate-y-12 rotate-45 group-hover:bg-brand-accent/10 transition-colors duration-500">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
