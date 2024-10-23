import React,{useEffect,useRef,useState} from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { updateUser,reset } from '../features/Auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header'
function Profile() {
    const nameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const phoneLengthRef = useRef()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user,isError,isLoading,isSuccess,message} = useSelector((state)=> state.auth)
     useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        console.log(user);
        if(!user){
            console.log("gggg");
            navigate('/login',{replace:true})
        }
        if(user){
            setFormData({
                name:user.name,
                email:user.email,
                phone:user.phone,
                image:user.image,
            })
        }
        if(isSuccess){
            navigate('/')   
        }
        dispatch(reset())
    },[user,dispatch,isError,isSuccess,message,navigate])
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        image:'',
        phone:''
    })
   const {name,email,phone,image} = formData
    const [imagePreview,setImagePreview] = useState(null)
    const imageChange = (e) =>{
        const file = e.target.files[0]
        if(file){
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl)
            setFormData((state)=>{
                return{
                    ...state,
                    image:file
                }
            })
        }
    }
    const onChange = (e) =>{
      setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
      }))
    }
    const OnSubmit = (e) =>{
        e.preventDefault()
        
        if(name.trim() != "" && email.trim() != "" && phone.toString().trim() != "" && phone.toString().length == 10 ){
            console.log(formData);
            const form = new FormData()
            form.append('name',name)
            form.append('image',image)
            form.append('email',email)
            form.append('phone',phone)
            console.log(form);
            dispatch(updateUser(form))
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
    <Header/>
    <div className='container'>
        <h3>profile</h3>
       
        <div className='profilePic'>
            {
                imagePreview?(
                    <img src={imagePreview}alt='profile' style={{ borderRadius: "30px", padding: "0px"}}></img>  
                ):(
                    <img src={user && user.image}alt='profile' style={{borderRadius: "30px", padding: "0px"}}></img>
                )
            }
        </div>
      
      <section className='form'>
    <form onSubmit={OnSubmit} >
        <div className='form-group'>
            <input type="text" className='form-control' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange}></input>
            <p  style={{display:"none"}} ref={nameRef} >Feild must conatian valid information</p>
        </div>
        <div className='form-group'>
            <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}></input>
            <p style={{display:"none"}} ref={emailRef}>Feild must conatian valid information</p>
        </div>
        <div className='form-group'>
            <input className='form-control' id='phone' name='phone' value={phone} placeholder='Enter your phone' onChange={onChange}></input>
            <p style={{display:"none"}}ref={phoneRef}>Feild must conatian valid information</p>
            <p style={{display:"none"}}ref={phoneLengthRef}>phone num should be of length 10 </p>
        </div>
        <div className="form-group">
           <input onChange={imageChange}  type="file"></input>
        </div>
        <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
        </div>
    </form>
   </section>
    </div>
    </>
  )
}

export default Profile
