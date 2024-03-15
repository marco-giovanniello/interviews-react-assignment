import { useEffect } from "react"
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
	Typography,
	CircularProgress,
} from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import { useAppDispatch, useAppSelector } from "../hooks/custom"
import {
	addToCart,
	getProducts,
	getProductsByCategory,
	removeFromCart,
	setLimit,
	toggleLoading,
} from "../store/slices/productsSlice"
import { setCart } from "../store/slices/cartSlice"

export type Product = {
	id: number
	name: string
	imageUrl: string
	price: number
	category: string
	itemInCart: number
	loading: boolean
}

export type Cart = {
	items: Product[]
	totalPrice: number
	totalItems: number
}
export const Products = () => {
	const dispatch = useAppDispatch()
	const products = useAppSelector((state) => state.products.value)
	const productsLoading = useAppSelector((state) => state.products.loading)
	const limit = useAppSelector((state) => state.products.limit)
	const category = useAppSelector((state) => state.products.category)

	//First get of products, plus getting products by category. All on dependency of limit(handling infinite scroll) and category
	useEffect(() => {
		console.log(limit)
		if (category === "") {
			dispatch(getProducts(limit))
		} else {
			dispatch(getProductsByCategory({ category: category, limit: limit }))
		}
	}, [limit, category])

	//Use of infinite scroll
	useEffect(() => {
		const handleScroll = (e: Event) => {
			const scrollHeight = (e.target as Document).documentElement.scrollHeight
			const currentHeight =
				(e.target as Document).documentElement.scrollTop + window.innerHeight
			if (currentHeight + 1 >= scrollHeight) {
				dispatch(setLimit())
			}
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [limit])

	//function for adding products to cart
	function _addToCart(productId: number, quantity: number) {
		dispatch(toggleLoading(productId))
		fetch("/cart", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ productId, quantity }),
		}).then(async (response) => {
			if (response.ok) {
				const cart = await response.json()
				if (quantity === 1) dispatch(addToCart(productId))
				else dispatch(removeFromCart(productId))
				dispatch(toggleLoading(productId))
				dispatch(setCart(cart))
			}
			// Used store by redux and custom hooks useAppDispatch and useAppSelector for accessing and modify states of productSlice and cartSlice
		})
	}

	return (
		<>
			{products && products.length > 0 ? (
				<Box boxSizing="border-box" height="100%">
					<Grid container spacing={2} p={2}>
						{products.map((product) => (
							<Grid key={product.id} item xs={4}>
								{/* I removed :D */}
								<Card
									key={product.id}
									style={{ width: "100%" }}
									sx={{ position: "relative" }}
								>
									{product.loading && (
										<Box
											sx={{
												backgroundColor: "black",
												opacity: "40%",
											}}
											position="absolute"
											width="100%"
											height="100%"
											display="flex"
											justifyContent="center"
											alignItems="center"
											left={0}
											top={0}
										>
											<CircularProgress size={50} />
										</Box>
									)}
									<CardMedia
										component="img"
										height="150"
										image={product.imageUrl}
									/>
									<CardContent>
										<Typography gutterBottom variant="h6" component="div">
											{product.name}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
										</Typography>
									</CardContent>
									<CardActions>
										<Typography variant="h6" component="div">
											${product.price}
										</Typography>
										<Box flexGrow={1} />
										<Box
											position="relative"
											display="flex"
											flexDirection="row"
											alignItems="center"
										>
											<IconButton
												disabled={product.loading}
												aria-label="delete"
												size="small"
												onClick={() => _addToCart(product.id, -1)}
											>
												<RemoveIcon fontSize="small" />
											</IconButton>

											<Typography variant="body1" component="div" mx={1}>
												{product.itemInCart || 0}
											</Typography>

											<IconButton
												disabled={product.loading}
												aria-label="add"
												size="small"
												onClick={() => _addToCart(product.id, 1)}
											>
												<AddIcon fontSize="small" />
											</IconButton>
										</Box>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
					{productsLoading && (
						<Box
							width="100%"
							display="flex"
							justifyContent="center"
							alignItems="center"
						>
							<CircularProgress size={40} />
						</Box>
					)}
				</Box>
			) : (
				<Box
					boxSizing="border-box"
					height="100%"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<CircularProgress size={100} />
				</Box>
			)}
		</>
	)
}
