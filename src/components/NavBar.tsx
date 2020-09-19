import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import React from "react";

import Nextlink from "next/link";
import { useMeQuery } from "../generated/graphql";

const NavBar = () => {
  const { data } = useMeQuery();

  let body = null;

  console.log(data);

  if (data?.me) {
    body = (
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
    );
  } else {
    body = (
      <Box ml={"auto"} maxW="1100px">
        <Nextlink href="/login">
          <Link color="white" mr={4}>
            Login
          </Link>
        </Nextlink>
        <Nextlink href="/register">
          <Link color="white">Register</Link>
        </Nextlink>
      </Box>
    );
  }
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
        {body}
      </Flex>
    </Flex>
  );
};

export default NavBar;
