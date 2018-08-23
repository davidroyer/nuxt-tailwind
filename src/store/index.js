import wp from '~/lib/wp'

export const state = () => ({
  menuIsActive: false,
  sidebarOpen: false,
  site_data: { test: 'SOMETHING' },
  testValue: 'Initial',
  navLinks: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Articles', path: '/articles' },
    { name: 'Examples', path: '/examples' },
    { name: 'Contact', path: '/contact' }
  ],
  post: {}
})

export const mutations = {
  toggleMenuState(state) {
    state.menuIsActive = !state.menuIsActive
  },

  toggleSidebar(state) {
    state.sidebarOpen = !state.sidebarOpen
  },

  setMenuState(state, payload) {
    state.menuIsActive = !state.menuIsActive
  },

  setCurrentPost(state, post) {
    state.post = post
  },

  setTestValue(state, payload) {
    state.testValue = payload
  },

  setSiteData(state, payload) {
    state.site_data = payload
  }
}

export const actions = {
  async nuxtServerInit({ commit, state }, context) {
    const { site_data } = await wp.siteData()
    console.log('site_data: ', site_data)

    commit('setSiteData', site_data)
  },
  async promiseTest({ commit }, payload) {
    await delay(1200)
    commit('setTestValue', 'New Value')
  }

  // async getSiteInfo() {
  //   const { site_data } = await wp.site_data()
  //   commit('setSiteData', site_data)
  // }
}

export const getters = {
  currentPost: state => state.post,
  siteHome: state => state.site_data.home,
  siteTitle: state => state.site_data.name,
  siteDescription: state => state.site_data.description
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
