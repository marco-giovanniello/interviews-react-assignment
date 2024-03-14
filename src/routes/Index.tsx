import { Products } from "../components/Products.tsx"
import { Box, CssBaseline } from "@mui/material"
import SearchAppBar from "../components/layout/SearchAppBar.tsx"
import { Categories } from "../components/layout/Categories.tsx"
import { useAppSelector } from "../hooks/custom.tsx"

function Index() {
	const cart = useAppSelector((state) => state.cart.value)

	return (
		<Box height="100vh" display="flex" flexDirection="column">
			<CssBaseline />
			<SearchAppBar
				quantity={cart?.totalItems || 0}
				price={cart?.totalPrice || 0}
			/>
			<Box flex={1} display="flex" flexDirection="row">
				<Categories />
				<Box flex={1}>
					<Products />{" "}
					{/* Removed prop drilling of function onCartChange into Products component and setted a reducer */}
				</Box>
			</Box>
		</Box>
	)
}

export default Index
