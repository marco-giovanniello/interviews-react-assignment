import { setCart } from "../store/slices/cartSlice"
import {
	addToCart,
	removeFromCart,
	toggleLoading,
} from "../store/slices/productsSlice"
import { useAppDispatch } from "./custom"

export function useCart() {
	const dispatch = useAppDispatch()

	const handleCartUpdate = async (productId: number, quantity: number) => {
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

	return handleCartUpdate
}
