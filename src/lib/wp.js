import axios from 'axios'

class WpApi {
  constructor(siteurl) {
    this.apiBase = `${siteurl}/wp-json`
  }

  post(slug) {
    return axios
      .get(`${this.apiBase}/wp/v2/posts/?slug=${slug}`)
      .then(json => {
        return { post: json.data[0] }
      })
      .catch(e => {
        return { error: e }
      })
  }

  page(slug) {
    return axios
      .get(`${this.apiBase}/wp/v2/pages/?slug=${slug}`)
      .then(json => {
        return { page: json.data[0] }
      })
      .catch(e => {
        return { error: e }
      })
  }

  posts() {
    return axios
      .get(`${this.apiBase}/wp/v2/posts`, {
        params: {
          page: 1,
          per_page: 5
        }
      })
      .then(json => {
        return { posts: json.data }
      })
      .catch(e => {
        return { error: e }
      })
  }

  pages() {
    return axios
      .get(`${this.apiBase}/wp/v2/pages`, {
        params: {
          page: 1,
          per_page: 5
        }
      })
      .then(json => {
        return { pages: json.data }
      })
      .catch(e => {
        return { error: e }
      })
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
