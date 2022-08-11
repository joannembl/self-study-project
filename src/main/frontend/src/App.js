import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import User from "./pages/User";
import HomePage from "./pages/HomePage";
import EditUser from "./pages/EditUser";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/edit-user/:id' element={<EditUser />} />
          <Route path='/create-user' element={<CreateUser />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
