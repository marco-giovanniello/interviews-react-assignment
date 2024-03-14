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
export const getProductsByCategory = createAsyncThunk(
	"products/getProductsByCategory",
	async (category: string) => {
		let url = "/products?category=" + category
		const data = await useFetch(url)
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
		addToCart: (state, action) => {
			let index: number = state.value.findIndex(
				(product) => product.id === action.payload
			)
			if (index === -1) {
				throw new Error("Il prodotto non è stato trovato nel catalogo")
			} else {
				if (state.value[index].itemInCart) {
					state.value[index].itemInCart += 1
				} else {
					state.value[index].itemInCart = 1
				}
			}
		},
		removeFromCart: (state, action) => {
			let index: number = state.value.findIndex(
				(product) => product.id === action.payload
			)
			if (index === -1) {
				throw new Error("Il prodotto non è stato trovato nel catalogo")
			} else {
				if (state.value[index].itemInCart) {
					state.value[index].itemInCart -= 1
				}
			}
		},
		toggleLoading: (state, action) => {
			let index: number = state.value.findIndex(
				(product) => product.id === action.payload
			)
			if (index === -1) {
				throw new Error("Il prodotto non è stato trovato nel catalogo")
			} else {
				state.value[index].loading = !state.value[index].loading
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.value = action.payload
		})
		builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
			state.value = action.payload
		})
	},
})

export const { setProducts, addToCart, removeFromCart, toggleLoading } =
	productsSlice.actions

export const productsReducer = productsSlice.reducer
