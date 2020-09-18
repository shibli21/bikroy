import { Box } from "@chakra-ui/core";
import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <Box maxW="1100px" marginX="auto">
        {" "}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
