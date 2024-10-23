import axios from 'axios'


const API_URL = '/api/admin'
const adminLogin = async (adminData) =>{
    const response = await axios.post(API_URL + '/adminlogin',adminData)
    console.log(response.data)
    if(response){
        console.log("get back with response")
        localStorage.setItem('admin',JSON.stringify(response.data))
    }
    return response.data
}
const adminlogOut = async () => {
    try {
        localStorage.removeItem('admin')
    } catch (error) {
        throw new Error('something went wrong')
    }
}
const adminDeleteUser = async(userId,token) =>{
    try {
        console.log("getting in service")
        const response = await axios.post(API_URL + '/deleteuser',{id:userId},{headers:{'Authorization':`Bearer ${token}`}})
        if(response){
            localStorage.setItem('admin',JSON.stringify(response.data))
        }
        return response.data
    } catch (error) {
        throw new Error('something went wrong')
    }
}
const getUsers = async(token) =>{
    try {
        console.log("get users servuces")
        const response = await axios.get(API_URL  + '/getusers',{headers:{'Authorization':`Bearer ${token}`}})
        console.log(response);
        if(response){
            localStorage.setItem('admin',JSON.stringify(response.data))
        }
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}
const updateUser = async(token,{userId,dataOfEditUser}) =>{
    const response = await axios.post(API_URL + '/updateuser',{userId,dataOfEditUser},{headers:{'Authorization':`Bearer ${token}`}})
    if(response){
        console.log(response.data);
        const admindata = JSON.parse(localStorage.getItem('admin'))
        console.log(admindata);
        localStorage.setItem('admin',JSON.stringify({...admindata,userData:response.data.userData}))
    }
    return response.data
}
export const createUser = async(userData,token) =>{
    const response = await axios.post(API_URL + '/createuser',userData,{headers:{'Authorization':`Bearer ${token}` }})
    console.log(response.data)
    if(response){
        const localData = JSON.parse(localStorage.getItem('admin'))
        localStorage.setItem('admin',JSON.stringify({...localData,userData:response.data.userData}))
    }
    return response.data
}
const adminServices = {
    adminLogin,
    adminlogOut,
    adminDeleteUser,
    getUsers,
    updateUser,
    createUser,
}
export default adminServices