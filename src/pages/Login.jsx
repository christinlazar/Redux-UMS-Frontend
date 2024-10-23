import React,{useState,useEffect, useRef} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login,reset } from '../features/Auth/authSlice'
import SpinnerComp from '../components/SpinnerComp'
import Header from '../components/Header'

function Login() {

    const dispatch = useDispatch()
    const {user, isError, isSuccess, isLoading, message} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    useEffect(()=>{
        if(isError){
            toast.error('login error')
        }
        if(isSuccess || user){
            console.log(isSuccess)
            navigate('/')
        }
        dispatch(reset())
    },[user, isError, isSuccess,message,navigate,dispatch])

    const[formData,setFormData] = useState({
        email:'',
        password:'',
    })
    const  {email,password} = formData
    const onChange = (e) =>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const OnSubmit = (e) =>{
        e.preventDefault()
        const userData = {
            email,
            password
        }
        console.log(email,password)
        if(email && password){
            dispatch(login(userData))
        }else{
            if(email.trim() == "" ){
               emailRef.current.style.display = "block"
               emailRef.current.style.color = "red"
               setTimeout(() => {
                emailRef.current.style.display = "none"
                }, 3000);
            }
             if(password.trim() == ""  ){
                passwordRef.current.style.display = "block"
               passwordRef.current.style.color = "red"
                setTimeout(() => {
                passwordRef.current.style.display = "none"
                }, 3000);
            }
        }
    }


    if(isLoading){
        return <SpinnerComp/>
    }
    
  return (
   <>
    <Header />
   <section className='heading'>
    <h4>
       <FaSignInAlt/>Login 
    </h4>
    <p>Login in to your Account</p>
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

export default Login
