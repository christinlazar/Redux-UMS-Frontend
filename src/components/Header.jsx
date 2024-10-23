import React,{useRef} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { logout,reset } from '../features/Auth/authSlice'
import { adminLogout,resett } from '../features/Admin/adminSlice'
function Header({type}) {
    const adminRef = useRef(null)
    const userRef = useRef(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.auth)
    const {admin} = useSelector((state)=>state.admin)
    const onLogout = () =>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    const adminlogout = () =>{
        dispatch(adminLogout())
        dispatch(resett())
        navigate('/adminlogin')
    }
    
  return (
 <header className='header'>
    <div className='logo'>
        <Link to='/'>GoalSetter</Link>
    </div>
    {type === 'admin' ?
        <ul>
        {
            admin  ? (
                
                <li>
                <button  onClick = {adminlogout}>
                <FaSignOutAlt/>
                    Logout
                </button>  
            </li>
            ) :  (
                <>
                <li >
                <Link to='/login'>
                <FaSignInAlt/>
                    Login
                </Link>
            </li>
                </>
            )
        } 
    </ul>
    :
    <ul>
    {
        user  ? (
            
            <li>
            <button  onClick = {onLogout}>
            <FaSignOutAlt/>
                Logout
            </button>  
        </li>
        ) :  (
            <>
            <li >
            <Link to='/login'>
            <FaSignInAlt/>
                Login
            </Link>
        </li>
        <li >
            <Link to='/register'>
                <FaUser/>
                Register
                </Link>
        </li></>
        )
    } 
</ul>
    }
    
</header>
  )
}

export default Header
