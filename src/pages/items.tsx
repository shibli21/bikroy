import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
} from "@chakra-ui/core";
import React from "react";
import { useDeleteItemMutation, useItemsQuery } from "../generated/graphql";

interface Props {}

const items = (props: Props) => {
  const { data, loading, error } = useItemsQuery();
  const [deleteItem] = useDeleteItemMutation();

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }
  if (error) {
    return <Heading>error fetching data</Heading>;
  }

  if (data && data.items.length === 0) {
    return <Heading>No items!!</Heading>;
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
              <Button
                variant="solid"
                variantColor="red"
                onClick={() => deleteItem({ variables: { id: i.id } })}
              >
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
