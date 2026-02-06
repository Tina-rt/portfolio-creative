import { ref, computed } from "vue";
import type { CVData } from "~/types";
import { RESUME_DATA } from "~/constants";

export const usePortfolioData = () => {
  const data = ref<CVData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Use static data as fallback
  const portfolioData = computed(() => data.value || RESUME_DATA);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;

    // Track start time to ensure minimum 1.2s loading
    const startTime = Date.now();
    const minLoadingTime = 1200; // 1.2 seconds

    try {
      // Call the server API route to fetch data
      const response = await $fetch<CVData>("/api/portfolio");

      if (response) {
        data.value = response;
      }
    } catch (err) {
      console.error("Error fetching portfolio data:", err);
      error.value = err instanceof Error ? err.message : "Failed to fetch data";
      // Fallback to static data on error
      data.value = RESUME_DATA;
    } finally {
      //   console.log(data.value);
      // Ensure minimum loading time
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      loading.value = false;
    }
  };

  return {
    data: portfolioData,
    loading,
    error,
    fetchData,
  };
};
