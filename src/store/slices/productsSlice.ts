import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Product } from "../../components/Products"
import useFetch from "../../hooks/fetchHook"

export const getProducts = createAsyncThunk(
	"products/getProducts",
	async () => {
		const data = await useFetch("/products?limit=200")
		return await data
	}
)

interface ProductsState {
	value: Product[]
}

const initialState: ProductsState = {
	value: [],
}

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.value = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.value = action.payload
		})
	},
})

export const { setProducts } = productsSlice.actions

export const productsReducer = productsSlice.reducer
