import { Products } from "../components/layout/index/Products.tsx"
import { Box, CssBaseline, Toolbar } from "@mui/material"
import SearchAppBar from "../components/layout/index/SearchAppBar.tsx"
import { Categories } from "../components/layout/index/Categories.tsx"
import Cart from "../components/layout/index/Cart.tsx"
import { useAppSelector } from "../hooks/custom.tsx"
import { useEffect } from "react"

function Index() {
	const isDrawerOpened = useAppSelector((state) => state.drawer.value.open)
	useEffect(() => {
		console.log(isDrawerOpened)
	}, [isDrawerOpened])

	return (
		<Box display="flex">
			<CssBaseline />
			<SearchAppBar />
			<Categories />
			<Box
				boxSizing="border-box"
				component="main"
				sx={{ flexGrow: 1, overflow: "hidden" }}
			>
				<Toolbar />
				<Products />
			</Box>
			{!isDrawerOpened && (
				<>
					{/* Removed prop drilling of function onCartChange into Products component and setted a reducer */}

					<Cart />
				</>
			)}
		</Box>
	)
}

export default Index
