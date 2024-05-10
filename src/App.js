import './App.css';
import CreatePost from './Pages/CreatePost';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import BlogDetails from './Pages/BlogDetails';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SavedBlogs from './Pages/SavedBlogs';
import MyBlogs from './Pages/MyBlogs';
import Profilepage from './Pages/Profilepage';
import NotificationPage from './Pages/Notifications';

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
          <Route path='/profilepage' element={<Profilepage />} />
          <Route path='/blog-detail/:id' element={<BlogDetails />} />
          <Route path='/notifications' element={<NotificationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
