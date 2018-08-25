import WpApi from '~/lib/WpApi.js'

export default ({ app }, inject) => {
  // Set `$wp` instance on `app`
  // This way we can use it in middleware and pages `asyncData`/`fetch`
  app.$wp = new WpApi('http://admin.theartinmotion.com')
}
