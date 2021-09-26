import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	Menu as MenuIcon,
} from "@mui/icons-material";
import {
	AppBar as MuiAppBar,
	Avatar,
	Box,
	Card,
	CardContent,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	MenuList,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import { Link, NavLink as NLink } from "react-router-dom";
import ciudadesFuturo from "../assets/images/logo.png";

const drawerWidth = 0.2;

const activeStyle = {
	color: "#3D5AFE",
};

const navLinkStyle = {
	color: "grey",
	textDecoration: "none",
};

const NavLink = ({ children, to }) => (
	<NLink exact style={navLinkStyle} activeStyle={activeStyle} to={to}>
		{children}
	</NLink>
);

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth * 100}%`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth * 100}%)`,
		marginLeft: `${drawerWidth * 100}%`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(2, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ children }) {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position='fixed' open={open}>
				<Toolbar>
					<Box display='flex' flexGrow={1}>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							sx={{ mr: 2, ...(open && { display: "none" }) }}
						>
							<MenuIcon />
						</IconButton>
					</Box>
					<img src={ciudadesFuturo} alt='Ciudades del Futuro' />
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant='persistent'
				anchor='left'
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<Card sx={{ margin: 2, boxShadow: "none" }}>
					<CardContent
						sx={{
							display: "flex",
							backgroundColor: "#E4E4E4",
							padding: 1.5,
							"&:last-child": {
								paddingBottom: 1.5,
							},
						}}
					>
						<Avatar sx={{ width: 42, height: 42, fontSize: "22px" }}>S</Avatar>
						<Box sx={{ paddingLeft: 2, width: 1 }}>
							<Typography sx={{ fontWeight: "bold" }}>
								Sasha Berkowsky
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								Analista
							</Typography>
						</Box>
					</CardContent>
				</Card>
				<Box sx={{ paddingLeft: 3 }}>
					<Typography variant='h6'>TRAMITES</Typography>

					<MenuList>
						<MenuItem>
							<NavLink to='/'>Pendientes</NavLink>
						</MenuItem>
						<MenuItem>
							<NavLink to='/current'>En Proceso</NavLink>
						</MenuItem>
						<MenuItem>
							<NavLink to='/historical'>Historico</NavLink>
						</MenuItem>
						<MenuItem>
							<NavLink to='/dashboard'>Dashboard</NavLink>
						</MenuItem>
					</MenuList>
				</Box>
				<Box sx={{ paddingTop: 1, paddingLeft: 3 }}>
					<Typography variant='h6'>GENERAL</Typography>

					<MenuList>
						<MenuItem>
							<Typography variant='subtitle1' color='text.secondary'>
								Perfil
							</Typography>
						</MenuItem>
						<MenuItem>
							<Typography variant='subtitle1' color='text.secondary'>
								Cerrar Sesion
							</Typography>
						</MenuItem>
					</MenuList>
				</Box>
				<Divider />
				Para Nosotros: <br />
				TRÁMITES
				<List>
					<ListItem button>
						<NavLink activeStyle={activeStyle} to='/'>
							Dashboard
						</NavLink>
					</ListItem>
				</List>
				<Divider />
				GENERAL
				<List>
					<ListItem>
						<ListItemText>
							<Link to='/profile'>Perfil</Link>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Link to='/sign-in'>Singin</Link>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Link to='/password'>Password</Link>
						</ListItemText>
					</ListItem>
				</List>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				{children}
			</Main>
		</Box>
	);
}
