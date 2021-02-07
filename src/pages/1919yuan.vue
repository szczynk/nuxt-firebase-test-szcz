<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a
            class="navbar-item"
            href="//github.com/szcz/nuxt-firebase-test-szcz"
          >
            <span> Repo </span>
          </a>
        </div>
        <div class="navbar-end">
          <a v-if="user" class="navbar-item" href="/">
            <figure class="image">
              <img
                class="is-rounded"
                :src="user.photoUrl"
                alt="Profile"
                height="28"
              />
            </figure>
          </a>
        </div>
      </div>
    </nav>
    <div>
      <section class="hero is-white is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="content">
              <p>Hello, {{ name }}</p>
            </div>
            <div class="block">
              <div class="buttons">
                <b-button
                  v-if="!isLoggedIn"
                  type="is-primary"
                  @click="doLoginWithGoogle"
                >
                  Sign in with Google
                </b-button>
                <b-button
                  v-if="isLoggedIn"
                  type="is-primary"
                  @click="$fire.auth.signOut()"
                >
                  Sign out
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
      ],
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    ...mapGetters({
      isLoggedIn: 'IS_AUTHENTICATED',
    }),
    name() {
      return this.user ? this.user.email : 'please log in.'
    },
  },
  methods: {
    async handleOAuthSuccess(result) {
      // Just a dummy example here showing fireStore operations,
      // but this is on client side.
      const { user } = result
      const { operationType } = result
      const info = result.additionalUserInfo
      if (user && operationType === 'signIn' && info.isNewUser) {
        await this.$fire.firestore.doc(`User/${user.uid}`).set({
          Uid: user.uid,
          Email: user.email,
          Created: this.$fireModule.firestore.Timestamp.now(),
        })
      }
    },
    async doLoginWithGoogle() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/userinfo.email')
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
      this.$fire.auth.useDeviceLanguage()
      const result = await this.$fire.auth.signInWithPopup(provider)
      await this.handleOAuthSuccess(result)
    },
  },
}
</script>

<style>
.navbar {
  background-color: blueviolet;
}
</style>
