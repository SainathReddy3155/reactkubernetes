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
import {Link} from 'react-router-dom'
import axios from 'axios'
import api from '../api';
const Register = () => {
  useEffect=()=>{
    document.title='Register'
  }
// useEffect=()=>{
//   axios.get('http://127.0.0.1:8000/testingapi/').then((response)=>{
//     console.log(response)
//   }).catch((error)=>{
//     console.log(error.data['name'])
//   })
// }

  // useEffect=()=>{
  //   axios.get("http://127.0.0.1:8000/api/getproducts/").then((response)=>{
  //     console.log(response)
  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  // }

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
     const [registerdata,setRegisterdata]=useState({
      username:"",
      email:"",
      password:"",
      confirmpassword:""
     })

     const Onformdatachange=(e)=>{
      e.preventDefault();
      setRegisterdata({...registerdata,[e.target.name]:e.target.value})
     }

     const Onformsubmit=(e)=>{
      e.preventDefault();
      if(registerdata.username==="" ||registerdata.email==="" || registerdata.password==="" ||registerdata.confirmpassword==="" ){
        // alert("Please enter all the details")
        setAlertcontent("Please enter all the details")
        setAlertseverity('error')
        setAlerts(true)
      }
      else if(registerdata.password!==registerdata.confirmpassword){
        setAlertcontent("Passwords doesn't match")
        setAlertseverity('error')
        setAlerts(true)
      }
      else if(registerdata.password.length<8){
        setAlertcontent("Password must be more than 8 characters")
        setAlertseverity('error')
        setAlerts(true)
      }
      else{
        // alert("Success")
        

        axios.post('http://127.0.0.1:8000/api/register/',{
          username:registerdata.username,
          email:registerdata.email,
          password:registerdata.password
        }).then(response=>{
          // console.log(response['request']['statusText'])
          if(response['request']['statusText']==='Created')
            setAlertcontent("Successfully Regsitered")
            setAlertseverity('success')
            setAlerts(true)
        }).catch(error=>{
          // alert(error)
          // console.log(error['response']['data']['username'])
          
          setAlertcontent(error['response']['data']['username'])
        setAlertseverity('error')
        setAlerts(true)
        }).finally(()=>{
          setRegisterdata({
            username:"",
            email:"",
            password:"",
            confirmpassword:""
          });
        
        });
        // setAlertcontent("Successfully Regsitered")
        // setAlertseverity('success')
        // setAlerts(true)
        
      }
     }

  return (
    <div>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12} md={8}>
        <Card sx={{width:350, marginTop:15}}>
            <CardHeader title='Register'></CardHeader>
            <CardContent>
            {/* <Alert severity="error">This is an error Alert.</Alert> */}
            <div>
              {alerts?<Alert severity={alertseverity} onClose={alertclose}>{alertcontent}</Alert>:<></>}
              
            </div>
              <form id="regsiterform" method="POST" onSubmit={Onformsubmit}>
                <FormControl>
                <TextField type="text" name="username" id='standard-basic_username'  variant="standard" label='Username'  sx={{marginTop:2}} value={registerdata.username} onChange={Onformdatachange}></TextField>
                <TextField type="email" name="email" id='standard-basic_email'  variant="standard" label='Email id'  sx={{marginTop:2}} value={registerdata.email} onChange={Onformdatachange}></TextField>
                <TextField type={showpassword?'text':'password'} name="password" id='standard-basic_password' variant="standard" label='Password' sx={{marginTop:2}}  helperText="Password must contain atleast 2 special characters " value={registerdata.password} onChange={Onformdatachange}></TextField>
                <TextField type={showpassword?'text':'password'} name="confirmpassword" id='standard-basic_cpassword'  variant="standard" label='Confirm Password' sx={{marginTop:2}} value={registerdata.confirmpassword} onChange={Onformdatachange}></TextField>
                <FormControlLabel value="Showpasswords" control={<Checkbox />} label="Show Password" labelPlacement="end" onChange={Onchangeshowpassword}/>
                <Button type="submit" variant='contained' sx={{marginTop:2}}>Register</Button>
                </FormControl>
                </form>
                <h6>Already a user? <Link to='/login'>Login</Link></h6>
            </CardContent>
        </Card>
        </Grid>

      </Grid>
    </div>
  )
}

export default Register