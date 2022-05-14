import axios from 'axios';
import {setToken} from './AsyncService'
import {API_URL} from '@env'

const baseUrl = API_URL

export const userLogin = async (payload) => {
    try {
        // const validated = await axios.post(baseUrl + 'login', {
        //     email: 'test@usenobi.com',
        //     password: 'Test123'
        // })
        const validated = await axios.get('https://swapi.dev/api/people/1')
        console.log(validated.data, "---ini validated")
        if(validated.status !== 200) {
            throw new Error()
        }
        setToken(validated.data.token)
        return {status: validated.status, data: validated.data}
    } catch (error) {
        console.log(error.message,'---error')
        return error.response
    }
}