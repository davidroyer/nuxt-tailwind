export default function ({store}) {
  if (store.state.menuIsActive === true) {
    store.commit('toggleMenuState')
  }
}
