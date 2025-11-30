export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@vite-pwa/nuxt', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY,
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Listar',
      short_name: 'Listar',
      theme_color: '#ffffff',
      start_url: '/',
      lang: 'pt-br',
      description: 'Lista de compras',
      screenshots: [
        {
          src: 'manifest/home-screen.png',
          sizes: '320x320',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Listar',
        },
      ],
      icons: [
        {
          src: 'manifest/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'manifest/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
})
