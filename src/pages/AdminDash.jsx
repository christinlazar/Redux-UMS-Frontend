import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resett,adminDeleteUser,getAllusers,getUserToedit, } from '../features/Admin/adminSlice'

function AdminDash() {
  const [userDataDoup,setDoup] = useState(null)
  const refObj = useRef(0)
  const dispatch = useDispatch()
  const [search,setSearch] = useSearchParams()
  const {admin,userData,isSuccess,message} = useSelector((state)=>
    state.admin
  )
  const [searchValue,setSearchValue] = useState('')

  const navigate = useNavigate()
  useEffect(()=>{
    if(!admin){
    navigate('/adminlogin')
    }
    if(userData){
      setDoup(userData)
    }
    if(refObj.current == 1){
      // dispatch(getAllusers())

    }
    dispatch(resett())
    refObj.current = refObj.current++;
  },[admin,userData,dispatch,navigate,isSuccess,message])

 const deleteUser = (id) =>{
  console.log(id)
  dispatch(adminDeleteUser(id))
 }
const toSearch = () =>{
 const search = searchValue
 console.log(search);
 if(search.trim() === ""){
    console.log(userData);
    setDoup(userData)
 }
 else{
  setDoup(userDataDoup.filter((user)=>{
    if(user.name.toLowerCase().includes(search.toLowerCase())){
        return user
        }
        return null
        }))
 }
 
}

  return (
    <div>
        <Header type={'admin'}/>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
      <h1>ADMIN DASHBOARD</h1>
      <div className='searchDiv'>
      <input value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} type="search" placeholder='search'></input>
      <button onClick={toSearch} className='searchBtn'>search</button>
      </div>
      <div className='dashboardbtn'>
      <button type='button'className='dashbtn' onClick={()=> navigate('/createuser')} >create user</button>
      </div>
      <div>
  <table className='table'>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>DeleteUser</th>
      <th>Edit user</th>
    </tr>
  </thead>
  <tbody>
    { userDataDoup ? userDataDoup.map((user, index) => (
      <tr key={index}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td><button onClick={()=>deleteUser(user._id)} className='deletebtn'>Delete</button></td>
        <td><button onClick={()=>{setSearch({_id:user._id}); navigate(`edituser?_id=${user._id}`)}}>Edit</button></td>
      </tr> 
    )):null}
  </tbody>
</table>
      </div>
    </div>
    </div>
  )
}

export default AdminDash
