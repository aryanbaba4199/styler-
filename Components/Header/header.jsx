import React, { useState } from "react";
import { AppBar, Toolbar, Box, List, ListItem } from "@mui/material";
import Image from "next/image";
import Logo from "@/public/images/stylersLight.png";
import SearchBar from "./search";
import Buttons from "./buttons";
import { IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";

const header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const openMenu = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const iconClick = () => {
    router.push("/")
  };

  return (
    <AppBar className="h-4">
      <Toolbar className="bg-slate-950 flex gap-2">
        <div className="md:hidden block">
          <IconButton className="flex gap-2" onClick={openMenu}>
            <MenuIcon className="text-white font-semibold"/>
          </IconButton>
          <Drawer open={open} onClose={handleClose} className="">
            <div className="pt-8 p-4 font-semibold bg-slate-950 h-[100%] text-white text-lg">
              <Buttons />
              <Link href="/seller" className="text-white">Admin</Link>
            </div>
          </Drawer>
        </div>
        <Box>
          <div className="flex justify-center items-center gap-2 hover:cursor-pointer" onClick={iconClick}>
            <Image src={Logo} alt="Stylers" className="w-32" />
           
           
          </div>
        </Box>
        <SearchBar />
        <div className="flex">
          <div className=" md:flex hidden ">
            <Buttons />
            <Link href="/seller" className="text-white">Admin</Link>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default header;
