import axios from 'axios';
import {API_URL} from '@env'

const baseUrl = API_URL

export const getList = async () => {
    try {
        const coinList = await axios.get(`${baseUrl}list`)
        return {
            status: coinList.status,
            data: coinList.data.data
        };
    } catch (error) {
        return {
            status: error.response.status || 500,
            message: error.response.message || 'Something went wrong!'
        }
    }
}

export const getDashboard = async () => {
    try {
        const dashboardData = await axios.post(`${baseUrl}dashboard`, {
            token: "nobi14564214"
        })
        return {
            status: dashboardData.status,
            data: dashboardData.data
        };
    } catch (error) {
        return {
            status: error.response.status || 500,
            message: error.response.message || 'Something went wrong!'
        }
    }
}