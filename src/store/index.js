export const state = () => ({
  menuIsActive: false,
  sidebarOpen: false,
  navLinks: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Examples", path: "/examples" },
    { name: "Contact", path: "/contact" }
  ],
  post: {}
});

export const mutations = {
  toggleMenuState(state) {
    state.menuIsActive = !state.menuIsActive;
  },

  toggleSidebar(state) {
    state.sidebarOpen = !state.sidebarOpen;
  },

  setMenuState(state, payload) {
    state.menuIsActive = !state.menuIsActive;
  },

  setCurrentPost(state, post) {
    state.post = post;
  }
};

export const getters = {
  currentPost: state => state.post
};
