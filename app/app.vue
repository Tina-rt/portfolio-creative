<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';

const { data: portfolioData, loading, error, fetchData } = usePortfolioData();
const showSplash = ref(true);
const splashComplete = ref(false);

// Provide data to all child components
provide('portfolioData', portfolioData);
provide('portfolioLoading', loading);

onMounted(async () => {
  console.log("Portfolio Loaded: Brutalist Engine Active - Nuxt Edition");

  // Fetch data from Google Sheets
  await fetchData();

  if (error.value) {
    console.warn('Using fallback static data:', error.value);
  }

  // Wait a bit before hiding splash to ensure smooth transition
  setTimeout(() => {
    showSplash.value = false;
  }, 1000);
});

const handleSplashComplete = () => {
  splashComplete.value = true;
};
</script>

<template>
  <div>
    <!-- Splash Screen -->
    <ClientOnly>

      <SplashScreen :show="showSplash || loading" @complete="handleSplashComplete" />
    </ClientOnly>

    <!-- Main Content -->
    <div v-show="!showSplash && !loading"
      class="relative min-h-screen bg-brand-black text-brand-light selection:bg-brand-accent selection:text-black">
      <!-- Noise Overlay -->
      <div class="fixed inset-0 z-[50] pointer-events-none opacity-20 mix-blend-overlay bg-noise"></div>

      <!-- Cursor -->
      <div class="hidden md:block">
        <CustomCursor />
      </div>

      <main class="relative z-10">
        <Hero />
        <About />
        <WorkHistory />
        <Projects />
        <Skills />
        <Awards />

        <!-- Footer -->
        <footer
          class="py-24 px-6 md:px-12 border-t border-brand-light/10 flex flex-col items-center justify-center text-center">
          <h2 class="text-4xl md:text-6xl font-display font-bold uppercase mb-8">
            Let's Build Something <br />
            <span class="text-brand-accent">Rule-Breaking</span>
          </h2>
          <a :href="`mailto:${portfolioData.email}`"
            class="text-xl font-mono hover:text-brand-accent transition-colors underline decoration-1 underline-offset-8">
            {{ portfolioData.email }}
          </a>

          <!-- Socials in Footer -->
          <div class="mt-8 flex gap-6">
            <a v-if="portfolioData.socials.github" :href="portfolioData.socials.github" target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-brand-accent transition-all duration-300 transform hover:scale-110"
              title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a v-if="portfolioData.socials.linkedin" :href="portfolioData.socials.linkedin" target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-brand-accent transition-all duration-300 transform hover:scale-110"
              title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a v-if="portfolioData.socials.twitter" :href="portfolioData.socials.twitter" target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-brand-accent transition-all duration-300 transform hover:scale-110"
              title="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a v-if="portfolioData.socials.instagram" :href="portfolioData.socials.instagram" target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-brand-accent transition-all duration-300 transform hover:scale-110"
              title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
          <p class="mt-8 text-gray-600 text-sm">
            © {{ new Date().getFullYear() }} {{ portfolioData.name }}.
          </p>
        </footer>
      </main>
    </div>
  </div>
</template>
