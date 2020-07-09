import axios from 'axios'

const globoApiServerHelper = axios.create({
    baseURL: 'https://epg-api.video.globo.com/programmes/',
    responseType: 'json',
})

export default globoApiServerHelper