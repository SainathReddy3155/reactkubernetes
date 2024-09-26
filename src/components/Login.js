import React, { useState,useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Alert, CardHeader, Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import api from '../api';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants'


const Login = () => {
      const navigate=useNavigate();

    useEffect(()=>{
      document.title='Login'
    },[])
    const [showpassword,setShowpassword]=useState(false)
    const [alerts,setAlerts]=useState(false)
    const[alertcontent,setAlertcontent]=useState('')
    const[alertseverity,setAlertseverity]=useState('')
    

     const alertclose=()=>{
      setAlerts(false)
     }
    const Onchangeshowpassword=()=>{
        if(showpassword!=true){
            setShowpassword(true)
        }
        else{
        setShowpassword(false)
        }
    }

    const resetForm = () => {
      setLogindata({ username: '', password: '' });
    };

     const [logindata,setLogindata]=useState({
      username:"",
      password:"",
     })

     const Onformdatachange=(e)=>{
      e.preventDefault();
      setLogindata({...logindata,[e.target.name]:e.target.value})
     }

     const Onformsubmit=async (e)=>{
      e.preventDefault();
      if(logindata.username==="" || logindata.password==="" ){
        // alert("Please enter all the details")
        setAlertcontent("Please enter all the details")
        setAlertseverity('error')
        setAlerts(true)
        return;
      }
      
      else{
        try{

        const res= await api.post('/api/token/',{
          username:logindata.username,
          password:logindata.password
        })
        if (res.status===200){
          // console.log(res.data)
          // console.log(res.data.access)
          // console.log(res.data.refresh)
          localStorage.setItem(ACCESS_TOKEN,res.data.access)
          localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
          
          setAlertcontent("Successfully Login")
          setAlertseverity('success')
          setAlerts(true)
          navigate('/dashboard')
        }
      }catch(error)
        {
          console.log(error.response.data.detail)
          setAlertcontent(error.response.data.detail=="No active account found with the given credentials"?'Invalid credentials':'Something went wrong Please try again')   
          setAlertseverity('error')
          setAlerts(true)
          resetForm();
        }
       
      }
     }
  return (
    <div>
       <Grid container direction="column" alignItems="center">
        <Grid item xs={12} md={8}>
        <Card sx={{width:350, marginTop:15}}>
            <CardHeader title='Login'></CardHeader>
            <CardContent>
            {/* <Alert severity="error">This is an error Alert.</Alert> */}
            <div>
              {alerts?<Alert severity={alertseverity} onClose={alertclose}>{alertcontent}</Alert>:<></>}
            </div>
              <form id="loginform" method="POST" onSubmit={Onformsubmit}>
                <FormControl>
                <TextField type="text" name="username" id='standard-basic_username'  variant="standard" label='Username'  sx={{marginTop:2, width:280}}  onChange={Onformdatachange} value={logindata.username}></TextField>
                <TextField type={showpassword?'text':'password'} name="password" id='standard-basic_password' variant="standard" label='Password' sx={{marginTop:2}}   onChange={Onformdatachange} value={logindata.password}></TextField>
                
                <FormControlLabel value="Showpasswords" control={<Checkbox />} label="Show Password" labelPlacement="end" onChange={Onchangeshowpassword}/>
                <Button type="submit" variant='contained' sx={{marginTop:2}}>Login</Button>
                </FormControl>
                </form>
                <h6>New user? <Link to='/'>Register</Link></h6>
            </CardContent>
        </Card>
        </Grid>

      </Grid>

    </div>
  )
}

export default Login