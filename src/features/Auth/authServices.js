import axios from 'axios'

const API_URL = '/api/users'

const register = async (userData) =>{
    try {
        console.log("getting here also")
        const response = await axios.post(API_URL,userData)
        console.log(response) 
        if(response.data){
            console.log(response.data)
            const localData = JSON.parse(localStorage.getItem('admin'))
            localStorage.setItem('user',JSON.stringify(response.data))
        }
        return response.data
    } catch (error) {
        console.log(error.message)
        throw new Error('eroor')
    }
}
const login = async(userData) =>{
    try {
        
        const response = await axios.post(API_URL + '/login',userData)
        console.log(response.data)
        if(response.data){
            localStorage.setItem('user',JSON.stringify(response.data))
        }
        return response.data
    } catch (error) {
        
    }
}
const updateUser = async(userData,token)=>{
       try{ const config = {
            headers:{
                Authorization: `Bearer ${token}`,
                
            }
        }
        console.log(userData);
        const response = await axios.post(API_URL +'/updateUser',userData,{headers:{'Authorization':`Bearer ${token}`}})
        if(response.data){
            const udata = JSON.parse(localStorage.getItem('user'))
            console.log(udata.token);
            const data = {
                ...response.data,
                token:udata.token
            }
            localStorage.setItem('user',JSON.stringify(data))
        }
        return response.data
        
   }catch(err){
        console.log(err);
   }
}
const logout = async () =>{
    try {
        localStorage.removeItem('user')
    } catch (error) {
        
    }
}
const authServices = {
    register,
    logout,
    login,
    updateUser
}

export default authServices