import './App.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home/Home';
import { useContext } from 'react';
import { AuthContext } from './components/context/AuthContext'

function App() {

  const { currentUser } = useContext(AuthContext)

  const NotLoggedIn = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }

    return children
  }

  const LoggedIn = ({ children }) => {
    if(currentUser) {
      return <Navigate to='/' />
    }

    return children
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<NotLoggedIn><Home /></NotLoggedIn>} />
          <Route exact path='/login' element={<LoggedIn><Login /></LoggedIn>} />
          <Route exact path='/register' element={<LoggedIn><Signup /></LoggedIn>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
