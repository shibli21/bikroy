import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import React from "react";

import Nextlink from "next/link";

const NavBar = () => {
  return (
    <Flex
      position="sticky"
      top={0}
      mb={4}
      zIndex={1}
      bg="black"
      align="center"
      p={2}
    >
      <Flex maxW={1100} m="auto" align="center" flex={1}>
        <Nextlink href="/">
          <Link color="white">
            <Heading>Bikory</Heading>
          </Link>
        </Nextlink>
        <Box ml={"auto"} maxW="1100px">
          <Nextlink href="/items">
            <Link color="white" mr={4}>
              Buy Items
            </Link>
          </Nextlink>
          <Nextlink href="/create-item">
            <Link>
              <Button variant="solid">Sell Item</Button>
            </Link>
          </Nextlink>
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
