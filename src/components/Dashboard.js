import React, { useEffect,useState } from 'react'
// import Button from '@mui/material/Button';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';

function Dashboard() {
  
  useEffect(()=>{
    document.title='Dashboard'
  },[])
  const navigate=useNavigate();

    const logout=async()=>{
        localStorage.clear();
        navigate('/login')
    }

  const [draweropen, setisDrawerOpen] = useState(false);


  return (
    <div>
      <MenuIcon onClick={()=>setisDrawerOpen(true)}/>
      Welcome to Home Page
      <Button type="submit" variant='contained' sx={{marginTop:2}} onClick={logout}>Logout</Button>
     <Drawer anchor='left' open={draweropen}></Drawer>
    </div>
  )
}

export default Dashboard
