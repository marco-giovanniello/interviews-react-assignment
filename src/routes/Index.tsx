import { Products } from "../components/layout/index/Products.tsx"
import { Box, CssBaseline } from "@mui/material"
import SearchAppBar from "../components/layout/index/SearchAppBar.tsx"
import { Categories } from "../components/layout/index/Categories.tsx"
import Cart from "../components/layout/index/Cart.tsx"

function Index() {
	return (
		<Box height="100vh" display="flex" flexDirection="column">
			<CssBaseline />
			<SearchAppBar />
			<Box flex={1} display="flex" flexDirection="row">
				<Categories />
				<Box flex={1}>
					<Products />{" "}
					{/* Removed prop drilling of function onCartChange into Products component and setted a reducer */}
				</Box>
				<Cart />
			</Box>
		</Box>
	)
}

export default Index
