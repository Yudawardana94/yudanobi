import axios from 'axios';
import {setToken} from './AsyncService'
import {API_URL} from '@env'

const baseUrl = API_URL

export const userLogin = async (payload) => {
    try {
        const validated = await axios.post(`${baseUrl}login`, payload)
        if(validated.status !== 200) {
            throw new Error()
        }
        setToken(validated.data.token)
        return {
            status: validated.status, 
            data: validated.data
        }
    } catch (error) {
        if(error.response.status == 404) {
            return {
                status: error.response.status,
                message: 'incorrect email / password'
            }
        }
        return {
            status: error.response.status,
            message: error.message
        }
    }
}