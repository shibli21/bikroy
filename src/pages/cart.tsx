import { Box, Heading, Stack } from "@chakra-ui/core";
import React from "react";
import Layout from "../components/Layout";
import { useUserCartQuery } from "../generated/graphql";

interface Props {}

const Cart = () => {
  const { data } = useUserCartQuery();

  return (
    <Layout>
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
    </Layout>
  );
};
export default Cart;
