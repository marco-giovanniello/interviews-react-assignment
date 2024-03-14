import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material"
import { useAppDispatch } from "../../hooks/custom"
import {
	getProducts,
	getProductsByCategory,
} from "../../store/slices/productsSlice"

const drawerWidth = 180

const categories = [
	"All",
	"Fruit",
	"Vegetables",
	"Dairy",
	"Bakery",
	"Meat",
	"Seafood",
	"Snacks",
	"Beverages",
]

export const Categories = () => {
	const dispatch = useAppDispatch()

	const handleCategoryClick = (text: string) => {
		if (text.toUpperCase() !== "ALL") {
			dispatch(getProductsByCategory(text))
		} else {
			dispatch(getProducts())
		}
	}

	return (
		<Box minWidth={drawerWidth} sx={{ borderRight: "1px solid grey" }}>
			<List>
				{categories.map((text) => (
					<ListItem
						onClick={() => handleCategoryClick(text)}
						key={text}
						disablePadding
					>
						<ListItemButton>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)
}
