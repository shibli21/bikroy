import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useUserCartQuery } from "../generated/graphql";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

interface Props {}

const Cart = () => {
  const { data } = useUserCartQuery();

  return (
    <Container maxW="7xl">
      <Text
        textAlign="center"
        fontSize="3rem"
        fontWeight="semibold"
        color="gray.500"
      >
        CART
      </Text>
      <Center mb={4}>
        <Breadcrumb
          spacing="8px"
          separator={<FaArrowRight color="gray.500" />}
          color="gray.500"
        >
          <BreadcrumbItem>
            <NextLink href="/">Home</NextLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <NextLink href="/cart">Cart</NextLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Center>
      <Divider
        height="2px"
        bg="gray.500"
        mb={10}
        size="xl"
        orientation="horizontal"
      />
      <Grid
        gridTemplateColumns={["1fr ", "1fr 1fr", "1fr 1fr ", "1fr 1fr 1fr"]}
      >
        {data?.userCart?.map((cart, i) => (
          <>
            <Box key={cart.id} mb={4}>
              <Text
                fontSize="sm"
                mb={2}
                textTransform="uppercase"
                color="gray.500"
              >
                Product {i + 1}
              </Text>
              <Flex>
                <Image
                  src={cart.item.image}
                  height={100}
                  width={100}
                  objectFit="cover"
                />
                <Box ml={4}>
                  <Text fontSize="lg" fontWeight="semibold">
                    {cart.item.title}
                  </Text>
                  <Text>Size : XL</Text>
                  <Text>Color : Yellow</Text>
                </Box>
              </Flex>
              <Table fontWeight="semibold" w="50%">
                <Tbody>
                  <Tr>
                    <Td pl={0} border="none">
                      Discount
                    </Td>
                    <Td pl={0} border="none">
                      0%
                    </Td>
                  </Tr>
                  <Tr>
                    <Td pl={0} border="none">
                      Price
                    </Td>
                    <Td pl={0} border="none">
                      ${cart.item.price}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td pl={0} border="none">
                      Quantity
                    </Td>
                    <Td pl={0} border="none">
                      {cart.quantity}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td pl={0} border="none">
                      Total
                    </Td>
                    <Td pl={0} border="none">
                      ${cart.item.price * cart.quantity}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </>
        ))}
      </Grid>
      <Box w={["100%", "100%", "50%", "50%"]} ml="auto">
        <Box p={10} border="2px solid black">
          <Flex justify="space-between">
            <Text fontSize="md" textTransform="uppercase" color="gray.500">
              Sub total
            </Text>
            <Text fontSize="md" textTransform="uppercase" color="gray.500">
              $296
            </Text>
          </Flex>
          <Divider
            height="2px"
            bg="gray.500"
            my={2}
            size="xl"
            orientation="horizontal"
          />

          <Flex justify="space-between">
            <Text fontSize="md" textTransform="uppercase" color="gray.500">
              Shipping fee
            </Text>
            <Text fontSize="md" textTransform="uppercase" color="gray.500">
              $3.45
            </Text>
          </Flex>
          <Divider
            height="2px"
            bg="gray.500"
            my={2}
            size="xl"
            orientation="horizontal"
          />
          <Flex justify="space-between">
            <Text fontSize="md" textTransform="uppercase" color="gray.500">
              Total
            </Text>
            <Text fontSize="md" textTransform="uppercase" color="gray.500">
              $299.45
            </Text>
          </Flex>
        </Box>
        <Button
          borderRadius={0}
          bg="gray.900"
          color="gray.100"
          _hover={{
            bg: "gray.600",
          }}
          w="100%"
          mt={4}
        >
          Proceed to checkout
        </Button>
      </Box>
    </Container>
  );
};
export default Cart;
