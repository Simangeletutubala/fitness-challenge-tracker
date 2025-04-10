
import './App.css';
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Challenges from './pages/Challenges'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

function App() {
  const isLoggedIn =  localStorage.getItem('authToken');
  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Navbar/> 
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/challenges' element={<Challenges/>}></Route>
            <Route path='/leaderboard' element={<Leaderboard/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
          </Routes>
        
        </>                           
        ) : (
          <Login/>
          
        )}
      
    </div>
  );
}

export default App;
