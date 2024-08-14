import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import UserPage from './components/UserPage';
import Admin from './components/AdminPage';

function App() {
  // Функция для проверки, является ли пользователь администратором
  const isAdmin = () => {
    console.log();
    return localStorage.getItem('role') === 'admin';
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserPage />} />
        {isAdmin() ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
