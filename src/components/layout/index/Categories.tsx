import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material"
import { useAppDispatch } from "../../../hooks/custom"
import { setCategory } from "../../../store/slices/productsSlice"

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
		dispatch(setCategory(text))
	}

	return (
		<Box minWidth={drawerWidth} sx={{ borderRight: "1px solid grey" }}>
			<List
				sx={{
					padding: 1,
				}}
			>
				{categories.map((text) => (
					<>
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
						<Divider orientation="horizontal" />
					</>
				))}
			</List>
		</Box>
	)
}
