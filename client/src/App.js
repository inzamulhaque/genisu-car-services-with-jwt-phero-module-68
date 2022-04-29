import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import ServiceDetail from './Pages/ServiceDetail/ServiceDetail';
import NotFound from './Pages/Shared/NotFound/NotFound';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignIn/SignUp';
import RequireAuth from './Pages/SignIn/RequireAuth';
import CheckOut from './Pages/CheckOut/CheckOut';
import AddService from './Pages/AddService/AddService';
import ManageServices from './Pages/ManageServices/ManageServices';
import Order from './Pages/Order/Order';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/service/:serviceId' element={<ServiceDetail />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/checkout/:serviceId' element={<RequireAuth>
          <CheckOut />
        </RequireAuth>} />
        <Route path='/addservice' element={<RequireAuth>
          <AddService />
        </RequireAuth>} />
        <Route path='/manage' element={<RequireAuth>
          <ManageServices />
        </RequireAuth>} />
        <Route path='/orders' element={<RequireAuth>
          <Order />
        </RequireAuth>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
