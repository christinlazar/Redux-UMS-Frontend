import React,{useRef, useState,useEffect} from 'react'
import { FaSign,FaSignInAlt,FaSignOutAlt } from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogin,resett } from '../features/Admin/adminSlice'
import Header from '../components/Header'
function AdminLogin() {
    const dispatch = useDispatch()

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const navigate = useNavigate()
    const {admin,isError,isSuccess,isLoading,message} = useSelector((state)=>state.admin)

    useEffect(()=>{
        if(isSuccess){
            navigate('/admindash')
        }
        if(admin){
            navigate('/admindash')
        }
        dispatch(resett())
    },[navigate,isSuccess,isError,message,admin])

    const onChange = (e) =>{
       setFormData((prevState) =>({
        ...prevState,
        [e.target.name]:e.target.value
       }))
    }
    const OnSubmit = (e) =>{
        e.preventDefault()
        console.log(formData)
        dispatch(adminLogin(formData))
    }
    const[formData,setFormData] = useState({
        email:'',
        password:''
    })
    const {email,password} = formData 
  return (
    <>
    <Header type={'admin'}/>
   <section className='heading'>
    <h4>
       <FaSignInAlt/>Admin-Login 
    </h4>
   </section>
   <section className='form'>
    <form onSubmit={OnSubmit}>
        <div className='form-group'>
            <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}></input>
                <p ref={emailRef} style={{display:"none"}} className='emailError'>You should enter a proper email</p>
           
        </div>
        <div className='form-group'>
            <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}></input>
            <p ref={passwordRef} style={{display:"none"}}  className='passwordError'>You should enter a proper password</p>
          
        </div>
        <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
        </div>
    </form>
   </section>
   </>
  )
}

export default AdminLogin
