import wp from '~/lib/wp'

export const state = () => ({
  menuIsActive: false,
  sidebarOpen: false,
  siteData: { test: 'SOMETHING' },
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
    state.siteData = payload
  }
}

export const actions = {
  async nuxtServerInit({ commit, state }, context) {
    const { siteData } = await wp.siteData()
    console.log('siteData: ', siteData)

    commit('setSiteData', siteData)
  },
  async promiseTest({ commit }, payload) {
    await delay(1200)
    commit('setTestValue', 'New Value')
  }

  // async getSiteInfo() {
  //   const { siteData } = await wp.siteData()
  //   commit('setSiteData', siteData)
  // }
}

export const getters = {
  currentPost: state => state.post,
  siteHome: state => state.siteData.home,
  siteTitle: state => state.siteData.name,
  siteDescription: state => state.siteData.description
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
