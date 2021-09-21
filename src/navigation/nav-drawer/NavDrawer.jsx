import React, { useState } from "react";
import {
	AppBar,
	Avatar,
	Box,
	Card,
	CardContent,
	Divider,
	Drawer,
	IconButton,
	Toolbar,
	Typography,
	MenuList,
	MenuItem,
} from "@mui/material";
import {ArrowBackIosNewRounded, MenuOpen} from '@mui/icons-material';


import ciudadesFuturo from "../../assets/images/ciudadesFuturo.PNG"


export default function NavDrawer() {
	const [drawerToggle, setDrawerToggle] = useState(true);
	return (
		<div>
			<AppBar
        		position="fixed"
        		open={drawerToggle}
			>
				<Toolbar sx={{backgroundColor:"#009688", paddingTop:1}}>
					<Box display='flex' flexGrow={1}>
						<IconButton
           				 color="inherit"
            			 aria-label="open drawer"
            			 onClick={()=>setDrawerToggle(true)}
        	  			 edge="start"
            			 sx={{ mr: 2, ...(drawerToggle && { display: 'none' }) }}
         				>
            				<MenuOpen fontSize="large" sx={{flexGrow:1}} />
          				</IconButton>
					</Box>
					<img src={ciudadesFuturo} alt="Ciudades del Futuro"/>
        		</Toolbar>
			</AppBar>
			<Drawer
				variant="persistent"
				sx={{
					"& .MuiDrawer-paper": {
						width: 0.18,
						boxSizing: "border-box",
						flexShrink: 0,
					},
				}}
				anchor='left'
				hideBackdrop={true}
				open={drawerToggle}
				onOpen={() => setDrawerToggle(true)}
			>
				<Toolbar sx={{display:'flex',justifyContent:"flex-end",paddingTop:1.2}}>
					
					<IconButton aria-label="close drawer" onClick={()=>setDrawerToggle(false)}>
						<ArrowBackIosNewRounded />
					</IconButton>
				</Toolbar>
				<Divider />
				<Card sx={{ margin: 3, boxShadow: "none" }}>
					<CardContent
						sx={{
							display: "flex",
							backgroundColor: "#E4E4E4",
							paddingBottom: 18,
						}}
					>
						<Avatar
							sx={{ width: 56, height: 56, fontSize: "26px", marginRight: 3 }}
						>
							S
						</Avatar>
						<Box>
							<Typography variant='h6'>Sasha Berkowsky</Typography>
							<Typography variant='body2' color='text.secondary'>
								Analista
							</Typography>
						</Box>
					</CardContent>
				</Card>
				<Box sx={{ paddingLeft: 3 }}>
					<Typography variant='h6' gutterBottom>
						TRAMITES
					</Typography>

					<MenuList>
						<MenuItem>
							<Typography variant='subtitle1' color='text.secondary'>
								Pendientes
							</Typography>
						</MenuItem>
						<MenuItem>
							<Typography variant='subtitle1' color='text.secondary'>
								En Proceso
							</Typography>
						</MenuItem>
						<MenuItem>
							<Typography variant='subtitle1' color='text.secondary'>
								Historico
							</Typography>
						</MenuItem>
						<MenuItem>
							<Typography variant='subtitle1' color='text.secondary'>
								Dashboard
							</Typography>
						</MenuItem>
					</MenuList>
				</Box>
				<Box sx={{ paddingTop: 3, paddingLeft: 3 }}>
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
			</Drawer>
		</div>
	);
}
