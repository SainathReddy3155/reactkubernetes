
import './App.css';
import Register from './components/Register.js'
import Login from './components/Login.js'
import PageNotFound from './components/PageNotFound.js';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ProctectedRoute from './components/ProtectedRoute.js';
import Dashboard from './components/Dashboard.js';





function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/dashboard' element={<ProctectedRoute><Dashboard/></ProctectedRoute>}/>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<PageNotFound/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
