import wp from '~/lib/wp'

export const state = () => ({
  menuIsActive: false,
  sidebarOpen: false,
  siteData: {},
  testValue: 'Initial',
  menu: {},
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
  },

  setMenu(state, payload) {
    state.menu = payload
  }
}

export const actions = {
  async nuxtServerInit({ commit, state }, context) {
    const { siteData } = await wp.siteData()
    const { menu } = await wp.menu()
    commit('setSiteData', siteData)
    commit('setMenu', menu)
  },

  async promiseTest({ commit }, payload) {
    await delay(1200)
    commit('setTestValue', 'New Value')
  }
}

export const getters = {
  currentPost: state => state.post,
  menuItems: state => state.menu.items,
  siteData: state => state.siteData,
  siteHome: state => state.siteData.home,
  siteTitle: state => state.siteData.name,
  siteDescription: state => state.siteData.description
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
