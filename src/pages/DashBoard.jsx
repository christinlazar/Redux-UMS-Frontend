import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
function DashBoard() {
  const {user} = useSelector((state)=> state.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
    console.log(user);
  })
   return (
    <>
    <Header /> 
    <div>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>profile</p>
      </section>
      <Link to="/profile">click here to profile</Link>
    </div>
    </>

  )
}

export default DashBoard
