<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
    show: boolean;
}>();

const emit = defineEmits<{
    (e: 'complete'): void;
}>();

const progress = ref(0);
let ctx: any;

onMounted(async () => {
    if (process.client && props.show) {
        const gsap = (await import('gsap')).default;

        ctx = gsap.context(() => {
            // Animate progress bar
            gsap.to(progress, {
                value: 100,
                duration: 2,
                ease: "power2.inOut",
                onUpdate: () => {
                    progress.value = Math.round(progress.value);
                }
            });

            // Animate text entrance
            gsap.from(".splash-title", {
                y: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power4.out",
                delay: 0.1
            });

            gsap.from(".splash-subtitle", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                delay: 0.4
            });

            // Glitch effect on title
            gsap.to(".splash-title", {
                x: "+=2",
                duration: 0.1,
                repeat: 3,
                yoyo: true,
                delay: 0.6,
                ease: "none"
            });
        });
    }
});

onUnmounted(() => {
    if (ctx) ctx.revert();
});
</script>

<template>
    <Transition name="splash" @after-leave="emit('complete')">
        <div v-if="show"
            class="fixed inset-0 z-[10000] bg-brand-black flex items-center justify-center overflow-hidden">
            <!-- Noise Overlay -->
            <div class="absolute inset-0 opacity-20 mix-blend-overlay bg-noise"></div>

            <!-- Animated Grid Background -->
            <div class="absolute inset-0 opacity-5">
                <div class="grid grid-cols-12 h-full">
                    <div v-for="i in 12" :key="i" class="border-r border-brand-light/10"></div>
                </div>
            </div>

            <!-- Content -->
            <div class="relative z-10 text-center px-6">
                <!-- Main Title -->
                <div class="overflow-hidden mb-8">
                    <h1
                        class="splash-title font-display font-bold text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight text-brand-light">
                        LOADING
                    </h1>
                </div>

                <!-- Subtitle -->
                <p
                    class="splash-subtitle font-mono text-sm md:text-base text-brand-accent tracking-widest uppercase mb-12">
                    Initializing Portfolio Engine
                </p>

                <!-- Progress Bar Container -->
                <div class="max-w-md mx-auto">
                    <!-- Progress Bar -->
                    <div class="relative h-1 bg-brand-gray border border-brand-light/20 overflow-hidden">
                        <div class="absolute inset-y-0 left-0 bg-brand-accent transition-all duration-100"
                            :style="{ width: `${progress}%` }"></div>
                    </div>

                    <!-- Progress Percentage -->
                    <div class="mt-4 flex justify-between items-center font-mono text-xs text-brand-light/60">
                        <span>{{ progress }}%</span>
                        <span class="text-brand-accent">{{ progress === 100 ? 'READY' : 'LOADING...' }}</span>
                    </div>
                </div>

                <!-- Decorative Elements -->
                <div class="absolute top-8 left-8 w-4 h-4 bg-brand-accent"></div>
                <div class="absolute bottom-8 right-8 w-4 h-4 border-2 border-brand-accent"></div>
                <div class="absolute top-1/2 left-8 w-px h-24 bg-brand-accent/30"></div>
                <div class="absolute top-1/2 right-8 w-px h-24 bg-brand-accent/30"></div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.splash-enter-active {
    transition: opacity 0.3s ease;
}

.splash-leave-active {
    transition: all 0.6s ease;
}

.splash-enter-from {
    opacity: 0;
}

.splash-leave-to {
    opacity: 0;
    transform: scale(1.05);
}
</style>
