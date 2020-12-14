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
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../components/Footer";
import {
  useAddToCartMutation,
  useDeleteItemMutation,
  useItemsQuery,
  useMeQuery,
} from "../generated/graphql";

interface Props {}

const items = (props: Props) => {
  const { data, loading, error } = useItemsQuery();
  const [deleteItem] = useDeleteItemMutation();
  const { data: meData } = useMeQuery();
  const [addToCart] = useAddToCartMutation();

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
      <Container maxW="6xl">
        <Heading>No items!!</Heading>
      </Container>
    );
  }
  return (
    <>
      <Container maxW="7xl">
        <Text
          textAlign="center"
          fontSize="3rem"
          fontWeight="semibold"
          color="gray.500"
        >
          SHOP
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
              <NextLink href="/items">Shop</NextLink>
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
        <Flex justify="space-between" mb={4}>
          <Menu closeOnSelect={false}>
            <MenuButton>
              <Button
                border="2px solid"
                borderColor="gray.900"
                borderRadius={0}
                variant="outline"
              >
                FILTER
              </Button>
            </MenuButton>
            <MenuList
              minWidth="140px"
              borderRadius={0}
              border="2px solid black"
              py={0}
            >
              <MenuOptionGroup type="checkbox">
                <MenuItemOption value="men">Men</MenuItemOption>
                <MenuItemOption value="women">Women</MenuItemOption>
                <MenuItemOption value="children">Children</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton>
              <Text fontWeight="semibold">SORT BY </Text>
            </MenuButton>
            <MenuList
              minWidth="180px"
              borderRadius={0}
              border="2px solid black"
            >
              <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
                <MenuItemOption value="asc">Ascending</MenuItemOption>
                <MenuItemOption value="desc">Descending</MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup type="checkbox">
                <MenuItemOption value="Latest">Latest</MenuItemOption>
              </MenuOptionGroup>
              <MenuOptionGroup title="Price" type="radio">
                <MenuItemOption value="high">High to Low</MenuItemOption>
                <MenuItemOption value="low">Low to High</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
        <Center>
          <Grid
            templateColumns={[
              "1fr",
              "1fr 1fr",
              "1fr 1fr 1fr",
              "1fr 1fr 1fr 1fr",
            ]}
            gap={6}
          >
            {data.items.map((i) => (
              <Box bg="gray.50" mb={4} key={i.id}>
                <Image
                  src={i.largeImage}
                  alt={i.title}
                  height="380px"
                  width="auto"
                  objectFit="cover"
                />
                <Box p={3}>
                  <NextLink href="/item/[id]" as={`/item/${i.id}`}>
                    <Link>
                      <Text fontSize="md" fontWeight="semibold">
                        {i.title.slice(0, 18)}
                      </Text>
                    </Link>
                  </NextLink>
                  <Text fontSize="md" color="gray.500">
                    ${i.price}
                  </Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </Center>
        <Footer />
      </Container>
    </>
  );
};

export default items;
