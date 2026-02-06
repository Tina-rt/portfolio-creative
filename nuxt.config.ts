// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Tina Hubert | Fullstack Engineer",
      meta: [
        {
          name: "description",
          content:
            "Portfolio of Tina Hubert RATOLOJANAHARY - Fullstack Engineer",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Oswald:wght@400;500;700&display=swap",
        },
      ],
    },
  },
  future: {
    compatibilityVersion: 4,
  },
});
