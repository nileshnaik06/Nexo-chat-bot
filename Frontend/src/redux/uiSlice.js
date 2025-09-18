import { createSlice } from '@reduxjs/toolkit';
import { toggleSidebar as toggleSidebarAction } from './actions/uiActions';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    user: [],
    isSidebarOpen: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    }
    // currentUser: (state, action) => {
    //   state.user.push(action.payload)
    // }
  },
});

export const { toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
