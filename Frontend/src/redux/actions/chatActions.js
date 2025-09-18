import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../chatSlice';

// Fetch all chats
export const fetchChats = createAsyncThunk(
    'chat/fetchChats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/chat/',
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching chats:', error);
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// Async Actions
export const createChat = createAsyncThunk(
    'chat/createChat',
    async (title, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/chat/',
                { title }, // ensure backend expects an object
                { withCredentials: true } // important
            );
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// export const sendMessage = createAsyncThunk('chat/message',
//     async (message, { rejectWithValue }) => {
//         console.log(message)
//         try {
//             const response = await axios.post('http://localhost:3000/api/chat/message', message, { withCredentials: true })
//             console.log(response.data)
//             return response.data
//         } catch (error) {
//             console.log(error)
//             return rejectWithValue(error.response?.data || "An error occured")
//         }
//     })

// Fetch all chats

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async (chatId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/chat/message/${chatId}`,
                { withCredentials: true }
            );
            // return { ...response.data.message };
            return response.data.message
        } catch (error) {
            console.error('Error fetching messages:', error);
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

// Sync Actions
export const setCurrentChat = (chat) => ({
    type: 'chat/setCurrentChat',
    payload: chat
});

// export const addMessage = (message) => ({
//     type: 'chat/addMessage',
//     payload: message
// });

export const addChat = (chat) => ({
    type: 'chat/addChat',
    payload: chat
});
// export const sendMessage = (chat) => ({
//     type: 'chat/sendMessage',
//     payload: chat
// });
