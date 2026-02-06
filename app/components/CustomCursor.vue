<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const cursorRef = ref<HTMLElement | null>(null);
const followerRef = ref<HTMLElement | null>(null);

let gsapInstance: any = null;

const onMouseMove = (e: MouseEvent) => {
  if (!gsapInstance || !cursorRef.value || !followerRef.value) return;

  // Direct movement for the small dot
  gsapInstance.to(cursorRef.value, {
    left: e.clientX,
    top: e.clientY,
    duration: 0,
  });

  // Smooth inertia for the follower circle
  gsapInstance.to(followerRef.value, {
    left: e.clientX,
    top: e.clientY,
    duration: 0.6,
    ease: "power2.out",
  });
};

const onMouseDown = () => {
  if (!gsapInstance || !cursorRef.value || !followerRef.value) return;
  gsapInstance.to([cursorRef.value, followerRef.value], { scale: 0.8, duration: 0.2 });
};

const onMouseUp = () => {
  if (!gsapInstance || !cursorRef.value || !followerRef.value) return;
  gsapInstance.to([cursorRef.value, followerRef.value], { scale: 1, duration: 0.2 });
};

onMounted(async () => {
  if (process.client) {
    // Dynamically import GSAP only on client side
    const gsap = await import('gsap');
    gsapInstance = gsap.default;

    // Initialize cursor position off-screen
    if (cursorRef.value && followerRef.value) {
      gsapInstance.set([cursorRef.value, followerRef.value], { left: -100, top: -100 });
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mouseup', onMouseUp);
  }
});
</script>

<template>
  <ClientOnly>
    <div>
      <div ref="cursorRef"
        class="fixed w-3 h-3 bg-brand-accent rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2" />
      <div ref="followerRef"
        class="fixed w-12 h-12 border border-brand-accent rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 opacity-50" />
    </div>
  </ClientOnly>
</template>
