import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';

import { Routes ,Route, BrowserRouter} from 'react-router-dom';
import Admins from './Pages/Admin';
import Sidebar from './Pages/Sidebar';
import Hover from './Pages/Hover';
import Notification from './Pages/Notification';



import notification_card from './Pages/notification_card';


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/admin' element={<Admins/>}/>
      <Route path='/sidebar' element={<Sidebar/>}/>
      <Route path='/hover' element={<Hover/>}/>
      <Route path='/notification_card' element={<notification_card />} />
      <Route path='/Notification' element={< Notification/>} />

    </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
