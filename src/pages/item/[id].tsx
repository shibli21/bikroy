import React from "react";
import {
  useDeleteItemMutation,
  useItemQuery,
  useMeQuery,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Spinner,
} from "@chakra-ui/core";
import Layout from "../../components/Layout";
import NextLink from "next/link";

const Item = () => {
  const { query } = useRouter();

  const intId = typeof query.id === "string" ? parseInt(query.id) : -1;
  const { data: meData } = useMeQuery();
  const { data, loading } = useItemQuery({
    variables: {
      id: intId,
    },
  });
  const [deleteItem] = useDeleteItemMutation();
  const router = useRouter();
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

  if (!data.item) {
    return (
      <Layout>
        <h1>No item found</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading>{data.item.title}</Heading>
      <h2>{data.item.description}</h2>
      <h2>{data.item.price}</h2>
      <Image src={data.item.image} alt={data.item.title} />
      <Flex mt={4}>
        <Button mr={2} variant="solid" variantColor="orange">
          <Icon name="add" mr={2} />
          Add to cart
        </Button>

        {meData?.me?.id === data.item.creator.id && (
          <>
            <Button mr={2} variant="solid" variantColor="teal">
              <Icon name="edit" mr={2} />
              <NextLink
                href="/item/edit/[id]"
                as={`/item/edit/${data.item.id}`}
              >
                Edit
              </NextLink>
            </Button>

            <Button
              mr={2}
              variant="solid"
              variantColor="red"
              onClick={() => {
                deleteItem({
                  variables: { id: data.item.id },
                  update: (cache) => {
                    cache.evict({ id: "Item:" + data.item.id });
                  },
                });
                router.push("/");
              }}
            >
              <Icon name="delete" mr={2} />
              Delete
            </Button>
          </>
        )}
      </Flex>
    </Layout>
  );
};

export default Item;
