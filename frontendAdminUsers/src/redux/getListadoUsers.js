import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    usersList: [],
    isLoading: false,
    error: "",
}

    export const getUsers = createAsyncThunk(
        'usersReducer/getUsers',
        async (thunkAPI) => {
            try{
                const response = await axios.get(`http://localhost:8000/api/users`);
                return response.data

            }catch(error){
                return thunkAPI.rejectWithValue(error.response.data.message)
            }
        });

    export const addUser = createAsyncThunk(
        'usersReducer/addUser',
        async (data, thunkAPI) => {
            try{
                const response = await axios.post(`http://localhost:8000/api/user`, data);
                return response.data
    
            }catch(error){
                return thunkAPI.rejectWithValue(error.response.data.message)
            }
        });

    export const editUser = createAsyncThunk(
        'usersReducer/editUser',
        async (data, thunkAPI) => {
            try{
                const response = await axios.put(`http://localhost:8000/api/user/${data.id}`, data);
                return response.data
    
            }catch(error){
                return thunkAPI.rejectWithValue(error.response.data.message)
            }
        });

        export const deleteUser = createAsyncThunk(
            'usersReducer/deleteUser',
            async (id, thunkAPI) => {
                try{
                    const response = await axios.delete(`http://localhost:8000/api/user/${id}`);
                    return response.data
        
                }catch(error){
                    return thunkAPI.rejectWithValue(error.response.data.message)
                }
            });

export const usersReducer = createSlice({
    name: "usersReducer",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = "";
            state.usersList = action.payload
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });


        builder.addCase(addUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.usersList = action.payload
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });


        builder.addCase(editUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.usersList = action.payload
        });
        builder.addCase(editUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });


        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.usersList = action.payload
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});



export default usersReducer.reducer;