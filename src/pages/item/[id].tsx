import {
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Spinner,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  useDeleteItemMutation,
  useItemQuery,
  useMeQuery,
} from "../../generated/graphql";

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
      <Container maxW="6xl">
        <h1>No item found</h1>
      </Container>
    );
  }

  return (
    <Container maxW="6xl">
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
    </Container>
  );
};

export default Item;
