import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../../utils/config";
import api from "../../utils/api";

export interface UserState {
  loading: boolean;
  users: any[];
  selectedUser: any | null;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  users: [],
  selectedUser: null,
  error: null,
};

// Fetch all users
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.USERS);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Request failed");
    }
  }
);

export const getUsersById = createAsyncThunk(
  "users/getUsersById",
  async ({ userId }: { userId: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${endpoints.USERS}/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Request failed");
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(getUsers.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to load users";
    });

    // ---- GET USER BY ID ----
    builder.addCase(getUsersById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUsersById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedUser = action.payload;
    });

    builder.addCase(getUsersById.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to load user details";
    });
  },
});

export default userSlice.reducer;
