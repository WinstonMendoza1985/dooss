import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from "@mui/material"
import HomePage from "./components/HomePage"
import BookingPage from './components/BookingPage';
import UserList from './components/UserList';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import UserProfile from './components/UserProfile/UserProfile';
import { useState, useEffect } from 'react';
import UserRegister from './components/UserProfile/UserRegister';
import Logout from './components/Logout';

function App() {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const tok = localStorage.getItem('authToken');

  useEffect(() => {
    if(tok) {
      setIsLogin(true);
    }
  });


  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={isLogin ? <BookingPage />:<Login setToken={setToken} />} />
          <Route path="/dashboard" element={isLogin ? <Dashboard /> : <Login setToken={setToken} />} />
          <Route path="/users" element={isLogin ?<UserList />: <Login setToken={setToken} />} />
          <Route path="/profile" element={isLogin ? <UserProfile token={tok} /> : <Login setToken={setToken} />} />
          <Route path="/login" element={isLogin ? <UserProfile token={tok} /> : <Login setToken={setToken} />} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
