import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import adminServices from "./adminServices";
const admin = JSON.parse(localStorage.getItem('admin'))


const initialState = {
    admin : admin ? admin : null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    userData:admin ? admin.userData :[],
    message:''
}

export const adminLogin = createAsyncThunk('admin/adminlogin',async(admin,thunkAPI) =>{
    try {
        console.log("getting in admin slice");
        return await adminServices.adminLogin(admin)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toSring()
        thunkAPI.rejectWithValue(message)
    }
})

export const adminLogout = createAsyncThunk('admin/adminlogout',async(admin,thunkAPI)=>{
    try {
        return await adminServices.adminlogOut()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toSring()
        thunkAPI.rejectWithValue(message)
    }
})
export const adminDeleteUser = createAsyncThunk('admin/deleteuser',async(userId,thunkAPI)=>{
    try {
        console.log("getting in admindelete slice")
        const token = thunkAPI.getState().admin.admin.token
        console.log(token) 
        return await adminServices.adminDeleteUser(userId,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        thunkAPI.rejectWithValue(message)
    }
})
export const getAllusers = createAsyncThunk('admin/getusers',async(_,thunkAPI)=>{
    try{
        console.log("get users slice")
        const token = thunkAPI.getState().admin.admin.token
        console.log(token)
        return await adminServices.getUsers(token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        thunkAPI.rejectWithValue(message)
    }
})
export const getUserToedit = createAsyncThunk('admin/getedituser',async(id,thunkAPI)=>{
    try {
        console.log("inside toget edit user data")
        const token = thunkAPI.getState().admin.admin.token
        return await adminServices.getedituser(token,id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        thunkAPI.rejectWithValue(message)
    }
})
export const updateEditUser = createAsyncThunk('admin/updateuser',async({userId,dataOfEditUser},thunkAPI)=>{
    try {
        const token = thunkAPI.getState().admin.admin.token
        return await adminServices.updateUser(token,{userId,dataOfEditUser})
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        thunkAPI.rejectWithValue(message)
    }
})
export const createUser = createAsyncThunk('admin/createuser',async(userData,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().admin.admin.token
        return await adminServices.createUser(userData,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        thunkAPI.rejectWithValue(message)
    }
})
export const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
       resett:(state) =>{
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = ''
       }
    },
    extraReducers : (builder) => {
        builder.
        addCase(adminLogin.pending,(state) =>{
            state.isLoading = true
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{
            console.log(action.payload.userData)
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload
            state.userData = action.payload.userData
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.admin = null;
            state.userData = null;
        })

        .addCase(adminDeleteUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(adminDeleteUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.admin = action.payload;
            state.userData = action.payload.userData
        })
        .addCase(adminDeleteUser.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload
        })
        .addCase(getAllusers.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllusers.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.admin = action.payload;
            state.userData = action.payload.userData
        })
        .addCase(getAllusers.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload
        })
// ----------------------------------------------------------
.addCase(updateEditUser.pending,(state)=>{
    state.isLoading = true
})
.addCase(updateEditUser.fulfilled,(state,action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    state.userData = action.payload.userData
})
.addCase(updateEditUser.rejected,(state,action)=>{
    state.isError = true;
    state.isLoading = false;
    state.message = action.payload
})
// -------------------------------------------------
.addCase(createUser.pending,(state)=>{
    state.isLoading = true
})
.addCase(createUser.fulfilled,(state,action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    state.userData = action.payload.userData
})
.addCase(createUser.rejected,(state,action)=>{
    state.isError = true;
    state.isLoading = false;
    state.message = action.payload
})
// -------------------------------------------------
        .addCase(adminLogout.fulfilled,(state)=>{
            state.admin = null
            state.userData = null
        })

    }
}) 

export const {resett} = adminSlice.actions
export default adminSlice.reducer