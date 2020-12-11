import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { useUserCartQuery } from "../generated/graphql";

interface Props {}

const Cart = () => {
  const { data } = useUserCartQuery();

  return (
    <Container maxW="6xl">
      <Heading>Your cart</Heading>
      <Stack isInline m={4}>
        <Heading ml={4}>Item</Heading>
        <Heading ml={4}>Quantity</Heading>
      </Stack>
      {data?.userCart?.map((cart) => (
        <>
          <Box key={cart.id}>
            <Stack isInline m={4}>
              <Heading ml={4}>{cart.item.title}</Heading>
              <Heading ml={4}>{cart.quantity}</Heading>
            </Stack>
          </Box>
        </>
      ))}
    </Container>
  );
};
export default Cart;
