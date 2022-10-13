import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import userApi from "../api/userApi";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const { id } = action.payload;
      const index = state.findIndex((el) => el.id === id);
      if (index !== -1) {
        state[index].amount += 1;
      } else {
        state.push(action.payload);
      }
    },
    decreaseItemsToCart(state, action) {
      const id = action.payload;
      const index = state.findIndex((el) => el.id === id);
      if (state[index].amount === 1) {
        return;
      } else {
        state[index].amount -= 1;
      }
    },
    increaseItemsToCartByAmount(state, action) {
      const { id } = action.payload.product;
      const index = state.findIndex((el) => el.id === id);
      if (index !== -1) {
        state[index].amount += action.payload.quantity;
      } else {
        state.push({
          ...action.payload.product,
          amount: action.payload.quantity,
        });
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const index = state.findIndex((el) => el.id === id);
      state.splice(index, 1);
    },
  },
});
export const cartActions = cartSlice.actions;

export const getMe = createAsyncThunk("user/getMe", async (params, thunk) => {
  const currentUser = await userApi.getMe();
  return currentUser;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    isLoggedin: false,
  },
  reducers: {
    logoutHandler(state) {
      state.isLoggedin = false;
      state.current = {};
    },
  },

  extraReducers: {
    [getMe.fulfilled]: (state, action) => {
      state.isLoggedin = true;
      state.current = action.payload;
    },
  },
});
export const UserAction = userSlice.actions;
const store = configureStore({
  reducer: { cart: cartSlice.reducer, user: userSlice.reducer },
});
export default store;
