import { Box, CssBaseline, Toolbar } from "@mui/material"
import SearchAppBar from "../components/layout/index/SearchAppBar"
import { Categories } from "../components/layout/index/Categories"
import CheckoutComponent from "../components/layout/checkout/CheckoutComponent"

export default function Checkout() {
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
				<CheckoutComponent />
			</Box>
		</Box>
	)
}
