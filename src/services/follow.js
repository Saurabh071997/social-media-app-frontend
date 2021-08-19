import axios from 'axios'
import {API_URL} from './config.js'

export const followUser = async(profileId) => {
    const response = await axios.post(`${API_URL}/follow`, {
        follows:profileId
    })
    return response
}

export const unfollowUser = async(profileId) => {
    const response = await axios.delete(`${API_URL}/follow`,{
        data:{
            follows: profileId
        }
    })
    return response
}
