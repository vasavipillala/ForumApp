import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../utils/config';
import api from '../../utils/api';

export interface PostState {
  loading: boolean;
  error: string | null;
  posts: any[];
  selectedPost: any | null;
  getComments: any | null;
}

const initialState: PostState = {
  loading: false,
  error: null,
  posts: [],
  selectedPost: null,
  getComments: null
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.POSTS);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPostsById = createAsyncThunk(
  'posts/getPostsById',
  async ({ postId }: { postId: number }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get(`${endpoints.POSTS}/${postId}`);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getComments = createAsyncThunk(
  'posts/getComments',
  async ({ postId }: { postId: number }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get(`${endpoints.POSTS}/${postId}/comments`);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const PostSlice = createSlice({
  name: 'PostSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // GET POSTS
      .addCase(getPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        console.log('Total Posts Loaded:', action.payload.length);
      })
      .addCase(getPosts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load posts';
      })

      // GET POST BY ID
      .addCase(getPostsById.pending, state => {
        state.loading = true;
        state.error = null;
        state.selectedPost = null;
      })
      .addCase(getPostsById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
        console.log('Post Loaded:', action.payload.id);
      })
      .addCase(getPostsById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load post';
      })
       .addCase(getComments.pending, state => {
        state.loading = true;
        state.error = null;
        state.selectedPost = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.getComments = action.payload;
        console.log('Post Loaded:', action.payload.id);
      })
      .addCase(getComments.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load post';
      });
  },
});

export default PostSlice.reducer;
