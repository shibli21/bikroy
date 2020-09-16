import { Box, Button, Flex, Grid, Image, Stack } from "@chakra-ui/core";
import React from "react";
import { useItemsQuery } from "../generated/graphql";

interface Props {}

const items = (props: Props) => {
  const { data } = useItemsQuery();

  if (!data) {
    return null;
  }

  return (
    <Box maxW="800px" marginX="auto">
      <br />
      <br />
      <br />
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {data.items.map((i) => (
          <Box shadow="md" mb={4}>
            <h1>{i.title}</h1>
            <h2>{i.description}</h2>
            <h2>{i.price}</h2>
            <Image src={i.image} alt={i.title} />
            <Flex justifyContent="space-between">
              <Button variant="solid" variantColor="teal">
                Edit 🖊
              </Button>
              <Button variant="solid" variantColor="orange">
                add to cart
              </Button>
              <Button variant="solid" variantColor="red">
                Delete
              </Button>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default items;
