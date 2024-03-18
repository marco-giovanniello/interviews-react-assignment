import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../hooks/custom"
import { setCategory } from "../../../store/slices/productsSlice"
import { closeDrawer } from "../../../store/slices/drawerSlice"

const drawerWidth = {
	xs: "80%",
	sm: "20%",
}

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
	const isDrawerOpened = useAppSelector((state) => state.drawer.value.open)

	const handleCategoryClick = (text: string) => {
		dispatch(setCategory(text))
	}

	return (
		<Drawer
			variant="permanent"
			open={isDrawerOpened}
			onClose={() => dispatch(closeDrawer())}
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				"& .MuiDrawer-paper": {
					width: drawerWidth,
				},
			}}
		>
			<Toolbar />
			<Box>
				<List
					sx={{
						padding: 1,
					}}
				>
					{categories.map((text) => (
						<ListItem
							onClick={() => handleCategoryClick(text)}
							key={text}
							disablePadding
						>
							<ListItemButton>
								<ListItemText
									sx={{
										color: "secondary.dark",
										fontWeight: 700,
									}}
									primary={text}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	)
}
