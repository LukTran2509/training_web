import { createSlice} from "@reduxjs/toolkit";
// import axios from "axios";

// export const getUser = createAsyncThunk("posts/getPosts", async() => {
//     return axios.get("https://reqres.in/api/users?page=2")
//     .then((res) => res.data);
// });

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],
        isLoading: false,
    },
    reducers:{            
        getUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {getUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const user = (state) => state.user.value
export default userSlice.reducer;