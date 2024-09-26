
import axios from "axios";
import {ACCESS_TOKEN} from "./constants"

const api=axios.create({
    baseURL:"http://127.0.0.1:8000"
})

api.interceptors.request.use(
    (config)=>{
        const access_token=localStorage.getItem(ACCESS_TOKEN)
        // alert("access token",access_token)
        if(access_token){
            config.headers.Authorization=`Bearer ${access_token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default api;