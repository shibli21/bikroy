import { Box } from "@chakra-ui/core";
import React from "react";

const Layout = ({ children }) => {
  return (
    <Box maxW="800px" marginX="auto">
      {children}
    </Box>
  );
};

export default Layout;
