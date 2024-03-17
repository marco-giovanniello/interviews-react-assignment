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
import { useAppDispatch, useAppSelector } from "../../../hooks/custom"
import { getProducts, setLimit } from "../../../store/slices/productsSlice"

import { useCart } from "../../../hooks/useCart"

export type detailedCart = {
	product: Product
	quantity: number
}

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
	items: detailedCart[]
	totalPrice: number
	totalItems: number
}
export const Products = () => {
	const dispatch = useAppDispatch()
	const products = useAppSelector((state) => state.products)
	const productsQuery = {
		limit: products.limit,
		searchQuery: products.search,
		category: products.category,
	}

	const handleCart = useCart()

	//First get of products, plus getting products by category. All on dependency of limit(handling infinite scroll) and category
	useEffect(() => {
		console.log(productsQuery)
		dispatch(getProducts(productsQuery))
	}, [products.limit, products.category, products.search])

	//Use of infinite scroll
	useEffect(() => {
		const handleScroll = (e: Event) => {
			const scrollHeight = (e.target as Document).documentElement.scrollHeight
			const currentHeight =
				(e.target as Document).documentElement.scrollTop + window.innerHeight
			if (currentHeight + 1 >= scrollHeight) {
				console.log(products.loading)
				console.log(products.hasMore)
				if (!products.loading && products.hasMore) dispatch(setLimit())
			}
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [products])

	return (
		<>
			{products.total > 0 && (
				<Box boxSizing="border-box" height="100%">
					<Grid container spacing={2} p={2}>
						{products.value.map((product) => (
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
										<Typography
											gutterBottom
											variant="h6"
											component="div"
											color="primary.dark"
										>
											{product.name}
										</Typography>
										<Typography variant="body2" color="text">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
										</Typography>
									</CardContent>
									<CardActions>
										<Typography
											variant="h6"
											component="div"
											color="primary.dark"
										>
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
												disabled={!product.itemInCart || product.loading}
												aria-label="delete"
												size="small"
												onClick={
													() =>
														handleCart(
															product.id,
															-1
														) /*Removing from cart using custom hook*/
												}
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
												onClick={
													() =>
														handleCart(
															product.id,
															1
														) /*Adding to cart using custom hook*/
												}
											>
												<AddIcon fontSize="small" />
											</IconButton>
										</Box>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
					{products.loading && (
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
			)}
			{products.total === 0 && products.loading && (
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

			{products.total === 0 && !products.loading && (
				<Box
					boxSizing="border-box"
					height="100%"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Typography
						gutterBottom
						variant="h6"
						component="div"
						color="secondary.dark"
					>
						The search did not return any result
					</Typography>
				</Box>
			)}
		</>
	)
}
