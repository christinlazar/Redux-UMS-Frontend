import React, { useState,useEffect, useRef } from 'react'
import Header from '../components/Header'
import { FaUserAlt,FaUser } from 'react-icons/fa'
import { createUser,reset } from '../features/Admin/adminSlice'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function CreateUser() {
  
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmRef = useRef()
    const phoneRef = useRef()
    const phoneLengthRef = useRef()
    const passwordLength = useRef()
    const confirmPasswordLength  = useRef()
    const {isSuccess} = useSelector((state)=> state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  useEffect(()=>{
    if(isSuccess){
        navigate('/admindash')
    }
  },[isSuccess])

    const [user,setuser] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        phone:''
    })
    const onChange = (e) =>{
        setuser((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const OnSubmit = (e) =>{
        e.preventDefault()
        if(name.trim()!=="" && email.trim()!=="" && password.trim()!=="" && confirmPassword.trim()!=="" && phone.trim() != "" && phone.length == 10 && password.length >8 && confirmPassword.length>8){
            dispatch(createUser(user))
        }else{
            if(name.trim()==""){
             nameRef.current.style.display="block"
             nameRef.current.style.color = "red"
             setTimeout(() => {
                 nameRef.current.style.display="none"
             }, 3000);
            }
            if(email.trim()==""){
             emailRef.current.style.display="block"
             emailRef.current.style.color = "red"
             setTimeout(() => {
                 emailRef.current.style.display="none"
             }, 3000);

            }
            if(password.trim()==""){
             passwordRef.current.style.display="block"
             passwordRef.current.style.color = "red"
             setTimeout(() => {
                 passwordRef.current.style.display="none"
             }, 3000);

            } if(confirmPassword.trim()==""){
             confirmRef.current.style.display="block"
             confirmRef.current.style.color = "red"
             setTimeout(() => {
                 confirmRef.current.style.display="none"
             }, 3000);

            } if(phone.trim()== ""   ){
             phoneRef.current.style.display="block"
             phoneRef.current.style.color = "red"
             console.log("phonerefis",phoneRef.current.textContent)
             setTimeout(() => {
                 phoneRef.current.style.display="none"
             }, 3000);
            }
            if(phone.length != 0 ){
             phoneLengthRef.current.style.display = "block"
             phoneLengthRef.current.style.color = "red"
             setTimeout(() => {
                 phoneLengthRef.current.style.display="none"
             }, 3000);
            }
            if(password.length < 8 ){
               passwordLength.current.style.display = "block"
               passwordLength.current.style.color = "red"
               setTimeout(() => {
                 passwordLength.current.style.display="none"
             }, 3000);
            }
            if(confirmPassword.length < 8 ){
             confirmPasswordLength.current.style.display = "block"
             confirmPasswordLength.current.style.color = "red"
             setTimeout(() => {
                 confirmPasswordLength.current.style.display="none"
           }, 3000);
          }
         }
      

    }
    const {name,email,password,confirmPassword,phone} = user
    
  return (
    <div>
        <div>
          <Header type={'admin'}/>
        </div>
        <section className='heading'>
    <h4>
       <FaUser/>Create a User 
    </h4>
    <p> create 
        here 
    </p>
   </section>
   <section className='form'>
    <form onSubmit={OnSubmit}>
        <div className='form-group'>
            <input type="text" className='form-control' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange}></input>
            {/* <p  >invalid detials</p> */}
            <p  style={{display:"none"}} ref={nameRef} >Feild must conatian valid information</p>
        </div>
        <div className='form-group'>
            <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}></input>
            {/* <p   >invalid detials</p> */}
            <p style={{display:"none"}} ref={emailRef}>Feild must conatian valid information</p>
        </div>
        <div className='form-group'>
            <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}></input>
            {/* <p  >invalid detials</p> */}
            <p style={{display:"none"}} ref={passwordRef}>Feild must conatian valid information</p>
            <p style={{display:"none"}} ref={passwordLength}>Password must be above 8 characters</p>
        </div>
        <div className='form-group'>
            <input type="password" className='form-control' id='confirmPassword' name='confirmPassword' value={confirmPassword} placeholder='Enter your password' onChange={onChange}></input>
            {/* <p  >invalid detials</p> */}
            <p style={{display:"none"}} ref={confirmRef} >Feild must conatian valid information</p>
            <p style={{display:"none"}} ref={confirmPasswordLength}>Password must be above 8 characters</p>
        </div>
        <div className='form-group'>
            <input type="number" className='form-control' id='phone' name='phone' value={phone} placeholder='Enter your phone' onChange={onChange}></input>
            {/* <p  >invalid detials</p> */}
            <p style={{display:"none"}}ref={phoneRef}>Feild must conatian valid information</p>
            <p style={{display:"none"}}ref={phoneLengthRef}>phone num should be of length 10 </p>
        </div>
        <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
        </div>
    </form>
   </section>
    </div>
  )
}

export default CreateUser
