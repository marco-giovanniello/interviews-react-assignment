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
	removeFromCart,
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
	useEffect(() => {
		dispatch(getProducts())
		//Replaced by useAppDispatch
	}, [])
	useEffect(() => {
		console.dir(products)
	}, [products])

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
								<Card key={product.id} style={{ width: "100%" }}>
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
											<Box
												position="absolute"
												left={0}
												right={0}
												top={0}
												bottom={0}
												textAlign="center"
											>
												{product.loading && <CircularProgress size={20} />}
											</Box>
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
				</Box>
			) : (
				"Loading"
			)}
		</>
	)
}
