import axios from 'axios'
import {API_URL} from './config'

export const getNotifications = async () => {
    const response = await axios.get(`${API_URL}/notification`)
    return response
}

export const updateNotifications = async (notifications) => {
    let responseList = []

    for(let i=0;i<notifications?.length ;i++){
        if(!notifications[i]?.read){
            const response = await axios.post(`${API_URL}/notification`,{
                notificationId: notifications[i]._id
            })

            responseList.push(response?.data?.data)
        } 
    }

    return responseList
}