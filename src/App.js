import './App.css';
import CreatePost from './Pages/CreatePost';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import BlogDetails from './Pages/BlogDetails';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SavedBlogs from './Pages/SavedBlogs';
import MyBlogs from './Pages/MyBlogs';


import Admindashboard from './Pages/admindashboard';
import Admins from './Pages/Admin';
import Addadmin from './Pages/addadmin';
import Adminlogin from './Pages/adminlogin';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/saved' element={<SavedBlogs />} />
          <Route path='/my-blogs' element={<MyBlogs />} />
          <Route path='/blog-detail' element={<BlogDetails />} />
          <Route path="/admindashboard" element={<Admindashboard/>}/>
          <Route path='/admin' element={<Admins/>}/>
          <Route path='/addadmin' element={<Addadmin/>}/>
          <Route path='/loginadmin' element={<Adminlogin/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
