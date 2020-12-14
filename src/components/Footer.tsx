import { Box, Flex, Grid, HStack, Link, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaTwitch,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" my={20}>
      <Grid
        gap={4}
        templateColumns={["1fr ", "1fr 1fr ", "1fr 1fr ", "1fr 1fr 1fr 1fr"]}
        textTransform="uppercase"
      >
        <Box fontWeight="semibold" fontSize="3xl">
          LOGO
        </Box>
        <Box>
          <Text fontWeight="semibold" mb={4}>
            Menu
          </Text>
          <Text color="gray.500">Collections</Text>
          <Text color="gray.500">
            <NextLink href="/items">Shop</NextLink>
          </Text>
          <Text color="gray.500">Blog</Text>
          <Text color="gray.500">Unisex</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold" mb={4}>
            Reach us
          </Text>
          <Text color="gray.500">Contact us</Text>
          <Text color="gray.500">Faq</Text>
          <Text color="gray.500">News</Text>
          <Text color="gray.500">Career</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold" mb={4}>
            Socials
          </Text>
          <HStack fontSize="20px" color="gray.500">
            <Link>
              <FaFacebookF />
            </Link>
            <Link>
              <FaInstagram />
            </Link>
            <Link>
              <FaTwitter />
            </Link>
          </HStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default Footer;
