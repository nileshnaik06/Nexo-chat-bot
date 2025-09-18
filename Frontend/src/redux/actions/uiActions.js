
// Sync Actions
export const toggleSidebar = () => ({
  type: 'ui/toggleSidebar'
});

// just practice///
// export const userData = createAsyncThunk(
//   'fetchUser',
//   async ({ rejectWithValue }) => {
//     try {
//       const responce = await axios.get("https://nexo-chat-bot.onrender.com/api/auth/fetchUser", {
//         withCredentials: true,
//       });
//       const data = await res.json();

//       if (data?.user) {
//         Navigate("/")
//       } else {
//         Navigate("/login")
//       }
//       return dispatchEvent(currentUser(data))
//     } catch (error) {
//       navigate("/login");
//       console.log(error)
//       return rejectWithValue(error.response?.data || 'An error occurred');
//     }
//   }
// );


export const currentUser = (user) => ({
  type: 'auth/fetchUser',
  payload: user
});

