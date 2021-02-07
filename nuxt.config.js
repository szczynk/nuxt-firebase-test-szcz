/* eslint-disable nuxt/no-cjs-in-config */
// Set up Firebase Admin SDK with API key.
// API key json file is in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const admin = require('firebase-admin')

const webpack = require('webpack')

require('dotenv').config()

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  })
}

module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  loading: { color: '#fff' },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    { src: '@/plugins/auth-listener', mode: 'client' },
    { src: '~/plugins/bootstrap', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
    ['cookie-universal-nuxt', { parseJSON: false }],
    // Doc: https://firebase.nuxtjs.org
    '@nuxtjs/firebase',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // BootstrapVue
  // check node_modules/bootstrap-vue/index.js to see plugin you want to use
  bootstrapVue: {
    componentPlugins: [
      'AlertPlugin',
      'AspectPlugin',
      'AvatarPlugin',
      'BadgePlugin',
      'BreadcrumbPlugin',
      'ButtonPlugin',
      'ButtonGroupPlugin',
      'ButtonToolbarPlugin',
      'CalendarPlugin',
      'CardPlugin',
      'CarouselPlugin',
      'CollapsePlugin',
      'DropdownPlugin',
      'EmbedPlugin',
      'FormPlugin',
      'FormCheckboxPlugin',
      'FormDatepickerPlugin',
      'FormFilePlugin',
      'FormGroupPlugin',
      'FormInputPlugin',
      'FormRadioPlugin',
      'FormRatingPlugin',
      'FormTagsPlugin',
      'FormSelectPlugin',
      'FormSpinbuttonPlugin',
      'FormTextareaPlugin',
      'FormTimepickerPlugin',
      'ImagePlugin',
      'InputGroupPlugin',
      'JumbotronPlugin',
      'LayoutPlugin',
      'LinkPlugin',
      'ListGroupPlugin',
      'MediaPlugin',
      'ModalPlugin',
      'NavPlugin',
      'NavbarPlugin',
      'OverlayPlugin',
      'PaginationPlugin',
      'PaginationNavPlugin',
      'PopoverPlugin',
      'ProgressPlugin',
      'SidebarPlugin',
      'SkeletonPlugin',
      'SpinnerPlugin',
      'TablePlugin',
      'TableLitePlugin',
      'TableSimplePlugin',
      'TabsPlugin',
      'TimePlugin',
      'ToastPlugin',
      'TooltipPlugin',
    ],
    directivePlugins: [
      'VBHoverPlugin',
      'VBModalPlugin',
      'VBPopoverPlugin',
      'VBScrollspyPlugin',
      'VBTogglePlugin',
      'VBTooltipPlugin',
      'VBVisiblePlugin',
    ],
  },

  // @nuxtjs/firebase (https://firebase.nuxtjs.org/guide)
  firebase: {
    // injectModule: true,
    // lazy: false,
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
    services: {
      auth: {
        persistence: 'session',
      },
      firestore: true,
      storage: true,
      // performance: true,
      // analytics: true
    },
    // customEnv: false,
    // onFirebaseHosting: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      lang: 'id',
      ogHost: process.env.BASE_URL,
    },
    manifest: {
      lang: 'id',
      start_url: process.env.BASE_URL,
    },
    // workbox: {
    //   importScripts: [
    //     // ...
    //     '/firebase-auth-sw.js'
    //   ],
    //   // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
    //   // only set this true for testing and remember to always clear your browser cache in development
    //   dev: process.env.NODE_ENV === 'development'
    // }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['jquery', 'bootstrap'],
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
    transpile: ['/^nuxt-fire/'],
    extend(config, { isDev, isClient, loaders: { vue } }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            configFile: '.eslintrc.js',
          },
        })
      }
      if (isClient) {
        vue.transformAssetUrls = {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src',
        }
      }
    },

    babel: {
      compact: true,
    },
  },
  srcDir: 'src',
}
