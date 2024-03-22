import { Box, CssBaseline } from "@mui/material"
import SearchAppBar from "../components/layout/index/SearchAppBar"
import { Categories } from "../components/layout/index/Categories"
import CheckoutComponent from "../components/layout/checkout/CheckoutComponent"

export default function Checkout() {
	return (
		<Box height="100vh" display="flex" flexDirection="column">
			<CssBaseline />
			<SearchAppBar />
			<Box flex={1} display="flex" flexDirection="row" sx={{}}>
				<Categories />
				<CheckoutComponent />
			</Box>
		</Box>
	)
}
