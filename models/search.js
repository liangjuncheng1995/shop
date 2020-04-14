import {
  Http
} from '../utils/http.js'
import {
  Paging
} from '../utils/paging'

class Search {
  static search(q) {
    return new Paging({
      url: `search?q=${q}`
    })

  }
}

export {
  Search
}