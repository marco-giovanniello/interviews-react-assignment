import { ThemeOptions, createTheme } from "@mui/material/styles"

export const Colors = {
	primary: "#bfd8af",
	secondary: "#e0e0e0",
	success: "#4b7531",
	error: "#ff1200",
	info: "#6cd6c5",
	warning: "#c5903b",
	///////////////////////////
	//// Black and white //////
	///////////////////////////
	white: "#fff",
	black: "#000",
	///////////////////////////
	//// Gradients colors /////
	///////////////////////////
	buttonGradient:
		"linear-gradient(90deg, rgba(153,188,133,1) 50%, rgba(191,216,175,1) 91%, rgba(212,231,197,1) 100%)",
}

export const themeOptions: ThemeOptions = {
	palette: {
		mode: "light",
		primary: {
			main: "#bfd8af",
		},
		secondary: {
			main: "#e0e0e0",
		},
		error: {
			main: "#ff1200",
		},
		warning: {
			main: "#c5903b",
		},
		success: {
			main: "#4b7531",
		},
		info: {
			main: "#6cd6c5",
		},
		divider: "rgba(0,0,0,0.24)",
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					background:
						"linear-gradient(90deg, rgba(153,188,133,1) 50%, rgba(191,216,175,1) 91%, rgba(212,231,197,1) 100%)",
					border: 0,
					borderRadius: 3,
					boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
					color: "white",
					height: 48,
					padding: "0 30px",
				},
			},
		},
	},
	shape: {
		borderRadius: 4,
	},
	spacing: 8,
}

export const theme = createTheme(themeOptions)
