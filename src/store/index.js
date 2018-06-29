export const state = () => ({
  menuIsActive: false,
  sidebarOpen: false,
  testValue: 'Initial',
  navLinks: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
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
  }
}

export const actions = {
  async promiseTest({ commit }, payload) {
    await delay(1200)
    commit('setTestValue', 'New Value')
  }
}

export const getters = {
  currentPost: state => state.post
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
