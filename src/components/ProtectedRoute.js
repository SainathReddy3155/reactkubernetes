import { Navigate } from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import api from '../api';

function ProctectedRoute({children}){
    const [authenticated,setIsAuthenticated]=useState(null)
    useEffect(()=>{
        auth().catch(()=>setIsAuthenticated(false))
    },[])


     const refreshtokenfunction=async()=>{
            const refreshtoken= localStorage.getItem(REFRESH_TOKEN)
            try{
                const res=await api.post('/api/token/refresh/',{refreshtoken:refreshtoken});
                if (res.status===200){
                    localStorage.setItem(ACCESS_TOKEN,res.data.access)
                    setIsAuthenticated(true)
                }
                else{
                    setIsAuthenticated(false)
                }
            }
            catch(error){
                console.log(error)
                setIsAuthenticated(false)
            }
     }


     const auth=async()=>{
            const token=localStorage.getItem(ACCESS_TOKEN)
            if(!token){
                setIsAuthenticated(false)
                return false
            }
            else{
                const decoded=jwtDecode(token)
                const expiration=decoded.exp
                const now=Date.now()/1000

                if(expiration<now){
                        console.log("expired token")
                        await refreshtokenfunction()
                }
                else{
                    setIsAuthenticated(true)
                }
            }
     }
      if(authenticated==null){
        <div>Loading...</div>
      }
      else{
        return authenticated ? children : <Navigate to="/login"/>
      }

}

export default ProctectedRoute