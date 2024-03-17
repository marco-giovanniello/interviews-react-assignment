import {
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	Typography,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../hooks/custom"
import { useCart } from "../../../hooks/useCart"
import { toggleShowCart } from "../../../store/slices/cartSlice"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"

export default function CartDrawer() {
	const dispatch = useAppDispatch()
	const cartopen = useAppSelector((state) => state.cart.showCart)
	const cart = useAppSelector((state) => state.cart.value)
	console.log(cart)
	const handleCart = useCart()
	const cartContent = cart.items.map((cartItem) => (
		<Box key={cartItem.product.id}>
			<Box
				display="flex"
				sx={{
					pt: 2,
					pb: 2,
				}}
				alignItems="start"
				justifyContent="space-between"
			>
				<Avatar
					src={cartItem.product.imageUrl}
					sx={{ width: 96, height: 96, mr: 2 }}
				/>
				<Box display="flex" flexDirection="column">
					<Typography color="primary.dark" variant="h6">
						{cartItem.product.name}
					</Typography>
					<Typography color="secondary.dark" variant="subtitle2">
						{cartItem.product.category}
					</Typography>
				</Box>
				<Typography variant="body1">${cartItem.product.price}</Typography>
				<Box
					position="relative"
					display="flex"
					flexDirection="row"
					alignItems="center"
				>
					<IconButton
						disabled={cartItem.product.loading}
						aria-label="delete"
						size="small"
						onClick={
							() =>
								handleCart(
									cartItem.product.id,
									-1
								) /*Removing from cart using custom hook*/
						}
					>
						<RemoveIcon fontSize="small" />
					</IconButton>

					<Typography variant="body1" component="div" mx={1}>
						{cartItem.quantity || 0}
					</Typography>

					<IconButton
						disabled={cartItem.product.loading}
						aria-label="add"
						size="small"
						onClick={
							() =>
								handleCart(
									cartItem.product.id,
									1
								) /*Adding to cart using custom hook*/
						}
					>
						<AddIcon fontSize="small" />
					</IconButton>
				</Box>
			</Box>
		</Box>
	))

	return (
		<>
			<Drawer
				open={cartopen}
				onClose={() => dispatch(toggleShowCart())}
				anchor="right"
				PaperProps={{
					sx: {
						width: {
							xs: "90%",
							sm: "30%",
						},
						background: "white",
					},
				}}
			>
				<Box
					height="100%"
					display="flex"
					flexDirection="column"
					padding={2}
					gap={2}
					justifyContent="space-between"
					boxSizing="border-box"
				>
					<Typography textAlign="center" variant="h6" color="primary.dark">
						Your cart
					</Typography>
					<Divider orientation="horizontal" />
					{cart.items.length > 0 ? (
						cartContent
					) : (
						<Typography textAlign="center" variant="h6" color="secondary.dark">
							Your cart is empty
						</Typography>
					)}

					<Divider orientation="horizontal" />
					<Box width="100%" paddingY={1}>
						<Button fullWidth>Proceed to payment</Button>
					</Box>
				</Box>
			</Drawer>
		</>
	)
}
