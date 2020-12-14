import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import Footer from "../../components/Footer";
import {
  useAddToCartMutation,
  useItemQuery,
  UserCartDocument,
} from "../../generated/graphql";

const Item = () => {
  const { query } = useRouter();
  const intId = typeof query.id === "string" ? parseInt(query.id) : -1;
  const { data, loading } = useItemQuery({
    variables: {
      id: intId,
    },
  });

  const [addToCart, { loading: cartLoading }] = useAddToCartMutation();

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
      <Container maxW="7xl">
        <h1>No item found</h1>
      </Container>
    );
  }

  return (
    <Container maxW="7xl">
      <Grid
        mt={10}
        gap={4}
        templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
      >
        <Box>
          <Image borderRadius={4} src={data.item.image} alt={data.item.title} />
          <Flex mt={6}>
            <Image
              mr={4}
              height="100px"
              borderRadius={4}
              src={data.item.image}
              alt={data.item.title}
            />
            <Image
              mr={4}
              height="100px"
              borderRadius={4}
              src={data.item.image}
              alt={data.item.title}
            />
            <Image
              height="100px"
              borderRadius={4}
              src={data.item.image}
              alt={data.item.title}
            />
          </Flex>
        </Box>
        <Box justifySelf="center" alignSelf="center">
          <Heading fontWeight="semibold" textTransform="uppercase">
            {data.item.title}
          </Heading>
          <h2>{data.item.description}</h2>
          <Flex align="center" mt={6}>
            <Text mr={4}>Price :</Text>
            <Text fontSize="2xl" fontWeight="semibold">
              ${data.item.price}.45
            </Text>
          </Flex>
          <Flex mt={4}></Flex>
          <Grid templateColumns="1fr 1fr" mt={6} gap={4}>
            <Box>
              <Text>Size</Text>
              <Select
                mt={2}
                borderRadius={0}
                border="2px solid"
                borderColor="gray.900"
                w="70px"
              >
                <option value="option1">XL</option>
                <option value="option2">L</option>
                <option value="option3">M</option>
              </Select>
            </Box>
            <Box>
              <Box>
                <Text>Color</Text>

                <RadioGroup mt={4} defaultValue="2">
                  <Stack spacing={5} direction="row">
                    <Radio
                      value="1"
                      bg="red.500"
                      borderRadius={0}
                      _checked={{
                        bg: "red.500",
                        border: "2px solid",
                        borderColor: "gray.900",
                      }}
                    />
                    <Radio
                      value="2"
                      bg="yellow.300"
                      borderRadius={0}
                      _checked={{
                        bg: "yellow.500",
                        border: "2px solid",
                        borderColor: "gray.900",
                      }}
                    />
                    <Radio
                      value="3"
                      bg="green.500"
                      borderRadius={0}
                      _checked={{
                        bg: "green.500",
                        border: "2px solid",
                        borderColor: "gray.900",
                      }}
                    />
                    <Radio
                      value="4"
                      bg="orange.500"
                      borderRadius={0}
                      _checked={{
                        bg: "orange.500",
                        border: "2px solid",
                        borderColor: "gray.900",
                      }}
                    />
                  </Stack>
                </RadioGroup>
              </Box>
            </Box>
            <Box mt={6}>
              <Text>Quantity</Text>
              <Select
                mt={2}
                borderRadius={0}
                border="2px solid"
                borderColor="gray.900"
                w="70px"
              >
                <option value="option1">1</option>
                <option value="option2">2</option>
                <option value="option3">3</option>
              </Select>
            </Box>
            <Button
              mt={14}
              isLoading={cartLoading}
              borderRadius={0}
              textTransform="uppercase"
              bg="gray.900"
              color="white"
              fontWeight="normal"
              _hover={{
                bg: "gray.700",
              }}
              mr={2}
              onClick={() =>
                addToCart({
                  variables: {
                    id: intId,
                  },
                  refetchQueries: [
                    {
                      query: UserCartDocument,
                    },
                  ],
                })
              }
            >
              Add to cart
            </Button>
          </Grid>
        </Box>
      </Grid>
      <Footer />
    </Container>
  );
};

export default Item;
