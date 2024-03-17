import "./style/index.css"
import "./mocks/browser.ts"
import React from "react"
import ReactDOM from "react-dom/client"
import { enableMockServiceWorker } from "./mocks/browser.ts"
import { Provider } from "react-redux"
import store from "./store/store.ts"
import { RouterProvider } from "react-router-dom"
import router from "./router.tsx"
import { ThemeProvider } from "@mui/material"
import { theme } from "./style/theme.ts"

enableMockServiceWorker().then(() => {
	ReactDOM.createRoot(document.getElementById("root")!).render(
		<React.StrictMode>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<RouterProvider router={router} />
				</ThemeProvider>
			</Provider>
		</React.StrictMode>
	)
})
