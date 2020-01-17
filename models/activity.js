import {
  Http
} from '../utils/http.js'

class Activity {
  static locationD = 'a-2'
  static async getHomeLocationD() {
    return await Http.request({
      url: `activity/name/${Activity.locationD}`
    })
  }
}

export {
  Activity
}