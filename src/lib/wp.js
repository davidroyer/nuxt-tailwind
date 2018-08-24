import axios from 'axios'
const menuApiPath = 'menus/v1/menus/top'

class WpApi {
  constructor(siteurl) {
    this.apiBase = `${siteurl}/wp-json`
    this.menuItemsUrl = `${this.apiBase}/${menuApiPath}`
  }

  async menu() {
    const { data } = await axios.get(`${this.apiBase}/${menuApiPath}`)
    return { menu: data }
  }

  async post(slug) {
    const { data } = await axios.get(`${this.apiBase}/wp/v2/posts/?slug=${slug}`)
    return { post: data[0] }
  }

  async page(slug) {
    const { data } = await axios.get(`${this.apiBase}/wp/v2/pages/?slug=${slug}`)
    return { page: data[0] }
  }

  async posts() {
    const { data } = await axios.get(`${this.apiBase}/wp/v2/posts/?slug=${slug}`, {
      params: {
        page: 1,
        per_page: 5
      }
    })
    return { posts: data }
  }

  async pages() {
    const { data } = await axios.get(`${this.apiBase}/wp/v2/pages`, {
      params: {
        page: 1,
        per_page: 10
      }
    })
    return { pages: data }
  }

  fullSiteData() {
    return axios
      .get(this.apiBase)
      .then(json => {
        return { fullSiteData: json.data }
      })
      .catch(e => ({ error: e }))
  }

  siteData() {
    return axios
      .get(this.apiBase)
      .then(json => {
        const { name, description, url, home, gmt_offset, timezone_string } = json.data
        return { siteData: { name, description, url, home, gmt_offset, timezone_string } }
      })
      .catch(e => ({ error: e }))
  }
}

const wp = new WpApi('http://admin.theartinmotion.com')

export default wp
