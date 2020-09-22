import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import React from "react";

import Nextlink from "next/link";
import {
  MeDocument,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";

const NavBar = () => {
  const { data } = useMeQuery();
  const [logout, { loading }] = useLogoutMutation();

  let body = null;

  if (data?.me) {
    body = (
      <Box ml={"auto"} maxW="1100px">
        <Nextlink href="/items">
          <Link color="white" mr={4}>
            Shop
          </Link>
        </Nextlink>
        <Nextlink href="/create-item">
          <Link mr={4} color="white">
            Sell
          </Link>
        </Nextlink>
        <Nextlink href="/">
          <Link mr={4} color="white">
            {data.me.name}
          </Link>
        </Nextlink>
        <Link color="white">
          <Button
            color="black"
            variant="solid"
            isLoading={loading}
            onClick={() =>
              logout({
                refetchQueries: [
                  {
                    query: MeDocument,
                  },
                ],
              })
            }
          >
            Logout
          </Button>
        </Link>
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
