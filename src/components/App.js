import '../App.css';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
