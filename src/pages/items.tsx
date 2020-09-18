import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Link,
  Spinner,
} from "@chakra-ui/core";
import React from "react";
import { useDeleteItemMutation, useItemsQuery } from "../generated/graphql";
import NextLink from "next/link";
import Layout from "../components/Layout";

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
    return (
      <Layout>
        <Heading>No items!!</Heading>
      </Layout>
    );
  }
  return (
    <Layout>
      <Box maxW="800px" marginX="auto">
        <br />
        <br />
        <br />
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {data.items.map((i) => (
            <Box shadow="md" mb={4} key={i.id}>
              <NextLink href="/item/[id]" as={`/item/${i.id}`}>
                <Link>
                  <Heading fontSize="xl"> {i.title}</Heading>
                </Link>
              </NextLink>
              <h2>Description : {i.description}</h2>
              <h2>Price : {i.price}</h2>
              <Image src={i.image} alt={i.title} />
              <Flex my={4} ml={2}>
                <Button mr={2} variant="solid" variantColor="teal">
                  <Icon name="edit" mr={2} />
                  <NextLink href="/item/edit/[id]" as={`/item/edit/${i.id}`}>
                    Edit
                  </NextLink>
                </Button>
                <Button mr={2} variant="solid" variantColor="orange">
                  <Icon name="add" mr={2} />
                  Add to cart
                </Button>
                <Button
                  mr={2}
                  variant="solid"
                  variantColor="red"
                  onClick={() => deleteItem({ variables: { id: i.id } })}
                >
                  <Icon name="delete" mr={2} />
                  Delete
                </Button>
              </Flex>
            </Box>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default items;
