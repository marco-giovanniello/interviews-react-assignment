import {
	Divider,
	Icon,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../hooks/custom"
import { setCategory } from "../../../store/slices/productsSlice"
import { closeDrawer } from "../../../store/slices/drawerSlice"
import {
	CustomDrawer,
	DrawerHeader,
	FontAwesomeSvgIcon,
} from "../../../style/components/customComponents/customComponents"
import { ChevronLeft } from "@mui/icons-material"
import {
	faBorderAll,
	faBreadSlice,
	faCarrot,
	faCheese,
	faCow,
	faDrumstickBite,
	faFish,
	faGlassWater,
} from "@fortawesome/free-solid-svg-icons"

const drawerWidth = {
	xs: "80%",
	sm: "20%",
}

const categories = [
	{
		text: "All",
		icon: <FontAwesomeSvgIcon icon={faBorderAll} />,
	},
	{
		text: "Fruit",
		icon: <FontAwesomeSvgIcon icon={faBreadSlice} />,
	},
	{
		text: "Vegetables",
		icon: <FontAwesomeSvgIcon icon={faCarrot} />,
	},
	{
		text: "Dairy",
		icon: <FontAwesomeSvgIcon icon={faCow} />,
	},
	{
		text: "Bakery",
		icon: <FontAwesomeSvgIcon icon={faBreadSlice} />,
	},
	{
		text: "Meat",
		icon: <FontAwesomeSvgIcon icon={faDrumstickBite} />,
	},
	{
		text: "Seafood",
		icon: <FontAwesomeSvgIcon icon={faFish} />,
	},
	{
		text: "Snacks",
		icon: <FontAwesomeSvgIcon icon={faCheese} />,
	},
	{
		text: "Beverages",
		icon: <FontAwesomeSvgIcon icon={faGlassWater} />,
	},
]

export const Categories = () => {
	const dispatch = useAppDispatch()
	const isDrawerOpened = useAppSelector((state) => state.drawer.value.open)

	const handleCategoryClick = (text: string) => {
		dispatch(setCategory(text))
	}

	const handleCloseDrawer = () => {
		dispatch(closeDrawer())
	}

	return (
		<CustomDrawer
			variant="permanent"
			open={isDrawerOpened}
			sx={{
				flexShrink: 0,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<DrawerHeader sx={{ ...(!isDrawerOpened && { display: "none" }) }}>
				<IconButton onClick={handleCloseDrawer}>
					<ChevronLeft />
				</IconButton>
			</DrawerHeader>
			<Divider />

			<Toolbar sx={{ ...(isDrawerOpened && { display: "none" }) }} />
			<List>
				{categories.map((category) => (
					<ListItem
						onClick={() => handleCategoryClick(category.text)}
						key={category.text}
						disablePadding
						sx={{ display: "block" }}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: isDrawerOpened ? "initial" : "center",
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: isDrawerOpened ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								{category.icon}
							</ListItemIcon>
							<ListItemText
								secondary={category.text}
								sx={{ opacity: isDrawerOpened ? 1 : 0 }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</CustomDrawer>
	)
}
