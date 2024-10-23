import Login from "./pages/Login";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from "./pages/Register";
import Header from "./components/Header";
import DashBoard from "./pages/DashBoard";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import AdminDash from "./pages/AdminDash";
import AdminEDitUSer from "./pages/AdminEDitUSer";
import CreateUser from "./pages/CreateUser";
function App() {
  return (
    <>
     <Router>
    <div className="container">
        <Routes>
          <Route path='/' element={<DashBoard/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path ="/profile" element={<Profile/>} />
            <Route path ='/adminlogin' element={<AdminLogin/>} />
            <Route path = '/admindash' element={<AdminDash/>}/>
            <Route path="/admindash/edituser" element={<AdminEDitUSer/>}/>
            <Route path="/createuser" element={<CreateUser/>}/>
        </Routes>
    </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
