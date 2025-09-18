import { createSlice } from '@reduxjs/toolkit';
import { fetchChats, fetchMessages } from './actions/chatActions';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    currentChat: null,
    // messages: [],
    chatStatus: 'idle',
    messageStatus: 'idle',
    error: null,
  },


  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    // addMessage: (state, action) => {
    //   // If payload is an array, spread it, otherwise just push the object
    //   state.messages.push(action.payload);
    // },
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
    // setMessage: (state, action) => {
    //   state.messages.push(...messages,action.payload)
    // },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchChats actions
      .addCase(fetchChats.pending, (state) => {
        state.chatStatus = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.chats) {
          state.chats = action.payload.chats.map(chat => ({
            id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user: chat.user
          }));
        }
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle fetchMessages actions
      .addCase(fetchMessages.pending, (state) => {
        state.messageStatus = 'loading';
        state.messages = [];
      })
      .addCase('chat/fetchMessages/fulfilled', (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload || [];
      })
      .addCase('chat/fetchMessages/rejected', (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { setCurrentChat, addMessage, addChat, setMessage } = chatSlice.actions;
export default chatSlice.reducer;
