import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { styled, Theme, CSSObject, PaletteOptions } from "@mui/material/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { SvgIcon, SvgIconPropsColorOverrides } from "@mui/material"

export const drawerWidth = {
	xs: "100%",
	sm: "20%",
}

export const openedMixin = (theme: Theme): CSSObject => ({
	[theme.breakpoints.up("sm")]: {
		width: drawerWidth.sm,
	},
	[theme.breakpoints.between("xs", "sm")]: {
		width: drawerWidth.xs,
	},
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
})

type FontAwesomeSvgIconProps = {
	icon: any
}

export const FontAwesomeSvgIcon = React.forwardRef<
	SVGSVGElement,
	FontAwesomeSvgIconProps
>((props, ref) => {
	const { icon } = props

	const {
		icon: [width, height, , , svgPathData],
	} = icon

	return (
		<SvgIcon color="primary" ref={ref} viewBox={`0 0 ${width} ${height}`}>
			{typeof svgPathData === "string" ? (
				<path d={svgPathData} />
			) : (
				/**
				 * A multi-path Font Awesome icon seems to imply a duotune icon. The 0th path seems to
				 * be the faded element (referred to as the "secondary" path in the Font Awesome docs)
				 * of a duotone icon. 40% is the default opacity.
				 *
				 * @see https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#changing-opacity
				 */
				svgPathData.map((d: string, i: number) => (
					<path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
				))
			)}
		</SvgIcon>
	)
})

export const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: 0,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
})

export const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	boxShadow:
		"0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
	backgroundColor: theme.palette.primary.main,
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}))

export interface AppBarProps extends MuiAppBarProps {
	open: boolean
}

export const CustomAppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		[theme.breakpoints.up("xs")]: {
			width: `calc(100% - ${drawerWidth.xs})`,
			marginLeft: drawerWidth.xs,
		},
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth.sm})`,
			marginLeft: drawerWidth.sm,
		},
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

export const CustomDrawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}))
