
import './App.css';
import Navbar from './components/Navbar'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import Challenges from './components/pages/Challenges/Challenges'
import Leaderboard from './components/pages/Leaderboard'
import Profile from './components/pages/Profile'
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import CreateChallenge from './components/pages/Challenges/CreateChallenge'
import ViewChallenge from './components/pages/Challenges/ViewChallenge'

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
            <Route path='/createChallenge' element={<CreateChallenge/>}></Route>
            <Route path='/viewChallenge'  Component={ViewChallenge }></Route>
          </Routes>
        
        </>                           
        ) : (
          <Login/>
          
        )}
      
    </div>
  );
}

export default App;
