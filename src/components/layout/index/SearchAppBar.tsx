import { styled, alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import { Avatar, Badge, Divider, IconButton } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useAppDispatch, useAppSelector } from "../../../hooks/custom"
import { ChangeEvent } from "react"
import { setSearching } from "../../../store/slices/productsSlice"
import { toggleShowCart } from "../../../store/slices/cartSlice"
import Logo from "../../../assets/FreshCartMarket.svg"
import { CustomAppBar } from "../../../style/components/customComponents/customComponents"
import { openDrawer } from "../../../store/slices/drawerSlice"
import { Menu } from "@mui/icons-material"

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	marginRight: theme.spacing(2),
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}))

export default function SearchAppBar() {
	const cart = useAppSelector((state) => state.cart.value)
	const isDrawerOpened = useAppSelector((state) => state.drawer.value.open)
	const searchProducts = useAppSelector((state) => state.products.search)
	const dispatch = useAppDispatch()
	const handleCartIconClick = () => {
		dispatch(toggleShowCart())
	}

	const handleInputChange = (e: ChangeEvent) => {
		//Synchronizing input of searchbar to the state.products.search
		const target = e.target as HTMLInputElement
		dispatch(setSearching(target.value))
	}

	const handleOpenDrawer = () => {
		dispatch(openDrawer())
	}

	return (
		<CustomAppBar
			open={isDrawerOpened}
			position="fixed"
			sx={{ overflowX: "hidden" }}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleOpenDrawer}
					edge="start"
					sx={{
						marginRight: 5,
						...(isDrawerOpened && { display: "none" }),
					}}
				>
					<Menu />
				</IconButton>
				<Avatar
					sx={{
						mr: 1,
					}}
					src={Logo}
				/>
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{
						flexGrow: 1,
						display: { xs: "none", sm: "block" },
					}}
				>
					FreshCart Market
				</Typography>

				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{ "aria-label": "search" }}
						onChange={handleInputChange}
						value={searchProducts}
					/>
				</Search>

				<Divider orientation="vertical" variant="middle" flexItem />

				<Box padding={2}>
					<Badge badgeContent={cart?.totalItems || 0} color="secondary">
						<ShoppingCartIcon
							sx={{ cursor: "pointer" }}
							onClick={handleCartIconClick}
						/>
					</Badge>
				</Box>
			</Toolbar>
		</CustomAppBar>
	)
}
