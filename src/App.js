import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import { Route,Routes} from 'react-router-dom'
import Cart from './components/Cart'
import Admin from './components/Admin'
// import Footer from './components/Footer'
import Mobiles from './components/Mobiles'
import Shoes from './components/Shoes'
import Laptops from './components/Laptops'
import Tv from './components/Tv'
import Books from './components/Books'
import View from './components/View'
import Wishlist from './components/Wishlist'
import Order from './components/Order'

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}>
          <Route path='orders' element={<Order/>}/>
          </Route>
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/shoes' element={<Shoes/>}/>
        <Route path='/mobiles' element={<Mobiles/>}/>
        <Route path='/tvs' element={<Tv/>}/>
        <Route path='/laptops' element={<Laptops/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/view/:id' element={<View/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
      </Routes>
    </div>
  );
}

export default App;
