import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../api/axios";

interface UserState {
  user: UserCredentials | null;
  error?: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  error: null,
  isAuthenticated: false,
};
type UserCredentials = {
  username: string;
  password: string;
};

export const loginUser = createAsyncThunk<UserCredentials, UserCredentials>(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post("api/login", userCredentials);
    const response = await JSON.parse(request.config.data);
    console.log("response", response);
    return response;
  }
);

export const resetUserState = createAsyncThunk<void, void>(
  "user/resetUserState",
  async (_, { dispatch }) => {
    dispatch(setUser(null));
    dispatch(setError(null));
    dispatch(setIsAuthenticated(false));
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserCredentials | null>) => {
      state.user = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user = null;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        console.log(action.error.message);
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(resetUserState.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, setError, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
