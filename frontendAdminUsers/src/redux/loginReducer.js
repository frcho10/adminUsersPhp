import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    message: "",
    isLoading: false,
    error: "",
}

export const validateAccess = createAsyncThunk(
    'loginReducer/validateAccess',
    async (dolar, thunkAPI) => {
        try{
            const response = await axios.get(`https://api.frankfurter.app/latest?amount=${dolar}&from=USD&to=MXN`);
    
            return response.data

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    });

export const loginReducer = createSlice({
    name: "loginReducer",
    initialState,
    reducers: {
        clearInfo: (state) => {
            state.message ="";
            state.isLoading= false;
            state.error= "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(validateAccess.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(validateAccess.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = "";
            state.message = action.payload.rates.MXN;
        });
        builder.addCase(validateAccess.rejected, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.error = action.payload;
            // state.error = action.error.message;
        });
    }
});



export const { clearInfo } = loginReducer.actions;
export default loginReducer.reducer;