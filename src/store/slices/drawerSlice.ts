import { createSlice } from "@reduxjs/toolkit"

export const drawerSlice = createSlice({
	name: "drawer",
	initialState: {
		value: {
			open: false,
		},
	},
	reducers: {
		openDrawer: (state) => {
			state.value.open = true
		},
		closeDrawer: (state) => {
			state.value.open = false
		},
	},
})

export const { openDrawer, closeDrawer } = drawerSlice.actions

export const drawerReducer = drawerSlice.reducer
