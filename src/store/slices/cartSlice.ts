import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Cart } from "../../components/layout/index/Products"
import useFetch from "../../hooks/fetchHook"

export const getCart = createAsyncThunk("cart/getCart", async () => {
	let url = "/cart"
	const data = await useFetch(url)
	return await data
})

interface CartState {
	value: Cart
	showCart: boolean
}

const initialState: CartState = {
	value: {
		items: [],
		totalItems: 0,
		totalPrice: 0,
	},
	showCart: false,
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setCart: (state, action) => {
			state.value = action.payload
		},
		toggleShowCart: (state) => {
			state.showCart = !state.showCart
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCart.fulfilled, (state, action) => {
			state.value = action.payload
		})
	},
})

export const { setCart, toggleShowCart } = cartSlice.actions

export const cartReducer = cartSlice.reducer
