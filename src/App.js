import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import BlogDetails from './Pages/BlogDetails';

import { Routes ,Route, BrowserRouter} from 'react-router-dom';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/blog-details' element={<BlogDetails/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
