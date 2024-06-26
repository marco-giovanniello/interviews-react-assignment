import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Product } from "../../components/layout/index/Products"
import useFetch from "../../hooks/fetchHook"

interface queryParams {
	limit: number
	category?: string
	searchQuery?: string
	page?: number
}

export const getProducts = createAsyncThunk(
	"products/getProducts",
	async (params: queryParams) => {
		let url
		if (params.category?.toUpperCase() === "ALL" && params.searchQuery === "") {
			url = `/products?limit=${params.limit}`
		} else if (
			params.category?.toUpperCase() === "ALL" &&
			params.searchQuery !== ""
		) {
			url = `/products?q=${params.searchQuery}&limit=${params.limit}`
		} else if (
			params.category?.toUpperCase() !== "ALL" &&
			params.searchQuery === ""
		) {
			url = `/products?category=${params.category}&limit=${params.limit}`
		} else {
			url = `/products?q=${params.searchQuery}&category=${params.category}&limit=${params.limit}`
		}

		const data = await useFetch(url)
		return data
	}
)

export const getInfiniteProducts = createAsyncThunk(
	"products/getInfiniteProducts",
	async (params: queryParams) => {
		let url
		if (params.category?.toUpperCase() === "ALL" && params.searchQuery === "") {
			url = `/products?limit=${params.limit}&page=${params.page}`
		} else if (
			params.category?.toUpperCase() === "ALL" &&
			params.searchQuery !== ""
		) {
			url = `/products?q=${params.searchQuery}&limit=${params.limit}&page=${params.page}`
		} else if (
			params.category?.toUpperCase() !== "ALL" &&
			params.searchQuery === ""
		) {
			url = `/products?category=${params.category}&limit=${params.limit}&page=${params.page}`
		} else {
			url = `/products?q=${params.searchQuery}&category=${params.category}&limit=${params.limit}&page=${params.page}`
		}

		const data = await useFetch(url)
		return data
	}
)

interface ProductsState {
	value: Product[]
	limit: number
	search: string
	category: string
	loading: boolean
	hasMore: boolean
	total: number
	page: number
}

const initialState: ProductsState = {
	value: [],
	limit: 15,
	search: "",
	category: "All",
	loading: false,
	hasMore: false,
	total: 0,
	page: 0,
}

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setCategory: (state, action) => {
			state.category = action.payload
			state.limit = 15
		},
		setSearching: (state, action) => {
			state.search = action.payload
		},
		setLimit: (state) => {
			state.limit += 15
		},
		setPage: (state) => {
			state.page += 1
		},
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
			const { products, hasMore, total } = action.payload
			state.value = products
			state.hasMore = hasMore
			state.total = total
			state.loading = false
		})
		builder.addCase(getProducts.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getInfiniteProducts.fulfilled, (state, action) => {
			const { products, hasMore, total } = action.payload
			state.value = [...state.value, ...products]
			state.hasMore = hasMore
			state.total = total
			state.loading = false
		})
		builder.addCase(getInfiniteProducts.pending, (state) => {
			state.loading = true
		})
	},
})

export const {
	setProducts,
	addToCart,
	removeFromCart,
	toggleLoading,
	setCategory,
	setLimit,
	setSearching,
	setPage,
} = productsSlice.actions

export const productsReducer = productsSlice.reducer
