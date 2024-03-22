import { createSlice } from "@reduxjs/toolkit"

interface drawerState {
	value: {
		open: boolean
	}
}

const initialState: drawerState = {
	value: {
		open: false,
	},
}

export const drawerSlice = createSlice({
	name: "drawer",
	initialState,
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
