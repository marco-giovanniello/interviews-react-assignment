import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Cart } from "../../components/Products"
import useFetch from "../../hooks/fetchHook"

export const getCart = createAsyncThunk("cart/getCart", async () => {
	let url = "/cart"
	const data = await useFetch(url)
	return await data
})

interface CartState {
	value: Cart | any
}

const initialState: CartState = {
	value: {},
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setCart: (state, action) => {
			state.value = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCart.fulfilled, (state, action) => {
			state.value = action.payload
		})
	},
})

export const { setCart } = cartSlice.actions

export const cartReducer = cartSlice.reducer
