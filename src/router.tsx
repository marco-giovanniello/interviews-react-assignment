import { createBrowserRouter } from "react-router-dom"
import Index from "./routes/Index"
import Checkout from "./routes/Checkout"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Index></Index>,
	},
	{
		path: "/checkout",
		element: <Checkout></Checkout>,
	},
])

export default router
