import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import SubNavbar from './components/SubNavbar';
import Home from './components/Home';
import Services from './components/Services';
import Specialisations from './components/Specialisations';
import Login from './components/Login';
import Signup from './components/Signup';
import Doctors from './components/Doctors';
import News from './components/News';
import Blog from './components/Blog';
import Blogitem from './components/Blogitem';
import Createblog from './components/Createblog';
import Footer from './components/Footer';
import Bookappointment from './components/Bookappointment';
import EditProfile from './components/EditProfile';
import Appointments from './components/Appointments';
import Report from './components/Report';
import Donate from './components/Donate';
import Store from './components/Store';
import AddItem from './components/AddItem';
import ViewCart from './components/ViewCart';
import CartState from './context/CartState';
import Item from './components/Item';

// Setting up links to endpoints
function App() {
  return (
    <>
    <CartState>
      <Router>
        <Navbar /> 
        <SubNavbar /> 
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/specialisations" element={<Specialisations/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/editprofile" element={<EditProfile/>}/>
          <Route path="/doctors" element={<Doctors/>}/>
          <Route path="/bookappointment/:id" element={<Bookappointment/>}/>
          <Route path="/appointments" element={<Appointments/>}/>
          <Route path="/report" element={<Report/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/blogitem/:id" element={<Blogitem/>}/>
          <Route path="/createblog" element={<Createblog/>}/>
          <Route path="/store" element={<Store/>}/>
          <Route path="/additem" element={<AddItem/>}/>
          <Route path="/viewcart" element={<ViewCart/>}/>
          <Route path="/item/:id" element={<Item/>}/>
          <Route path="/donate" element={<Donate/>}/>
        </Routes>
        {/* <Footer /> */}
      </Router>
      </CartState>
    </>
  );
}

export default App;
