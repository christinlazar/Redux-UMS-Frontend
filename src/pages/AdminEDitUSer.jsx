import React,{useState,useEffect, useRef} from 'react'
import Header from '../components/Header'
import { useSearchParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { updateEditUser ,resett} from '../features/Admin/adminSlice'
import { useNavigate } from 'react-router-dom'

function AdminEDitUSer() {
    const nameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const phoneLengthRef = useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [search,setSearch] = useSearchParams()
    const {userData,isError,isSuccess} = useSelector((state)=>state.admin)
    const [dataOfEditUser,setDataOfEditUser] = useState({
        name:'',
        email:'',
        phone:'',
    })
    const {name,email,phone} = dataOfEditUser
    const userId = search.get("_id")
    useEffect(()=>{
        const userId = search.get("_id")
        console.log(userId);
        const singleUserData = userData.filter((user)=> user._id == userId)
        if(singleUserData){
            setDataOfEditUser(()=>({
                name:singleUserData[0].name,
                email:singleUserData[0].email,
                phone:singleUserData[0].phone
            }))
        }
        if(isSuccess){
            navigate('/admindash')
        }
        dispatch(resett())
    },[setDataOfEditUser,isSuccess,dispatch])
    const onChange = (e) =>{
        setDataOfEditUser((state)=>({
            ...state,
            [e.target.name]:e.target.value
        }))
    }
    const OnSubmit = (e) =>{
        e.preventDefault()
        console.log(name,email,phone)
        if(name.trim() != "" && email.trim() != "" && phone.toString().trim() != "" && phone.toString().length == 10 ){
            dispatch(updateEditUser({userId,dataOfEditUser}))
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
               if(phone.toString().trim()== ""   ){
                phoneRef.current.style.display="block"
                phoneRef.current.style.color = "red"
                
                setTimeout(() => {
                    phoneRef.current.style.display="none"
                }, 3000);
               }
               if(phone.toString().length != 10 ){
                phoneLengthRef.current.style.display = "block"
                phoneLengthRef.current.style.color = "red"
                setTimeout(() => {
                    phoneLengthRef.current.style.display="none"
                }, 3000);
               }

        }
      
    }

  
  

  return (
    <>
    <Header type={'admin'}/>
    <div>
    <form onSubmit={OnSubmit} >
        <div className='form-group'>
            <input type="text" className='form-control' id='name' name='name' value={name}   placeholder='Enter your name' onChange={onChange}></input>
            <p  style={{display:"none"}} ref={nameRef} >Feild must conatian valid information</p>
        </div>
        <div className='form-group'>
            <input type="email" className='form-control' id='email' name='email' value={email}  placeholder='Enter your email' onChange={onChange}></input>
            <p  style={{display:"none"}} ref={emailRef} >Feild must conatian valid information</p>
        </div>
        <div className='form-group'>
            <input className='form-control' id='phone' name='phone' value={phone}  placeholder='Enter your phone' onChange={onChange}></input>
            <p  style={{display:"none"}} ref={phoneRef} >Feild must conatian valid information</p>
            <p  style={{display:"none"}} ref={phoneLengthRef} >Phone number must conatain 10 number</p>


        </div>
        {/* <div className="form-group">
           <input onChange={imageChange}  type="file"></input>
        </div> */}
        <div className="form-group">
            <button type='submit' className='btn btn-block'>update</button>
        </div>
    </form>
    </div>
    </>
  )
}

export default AdminEDitUSer
