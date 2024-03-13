import { createBrowserRouter } from "react-router-dom"
import Index from "./routes/Index"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Index></Index>,
	},
])

export default router
