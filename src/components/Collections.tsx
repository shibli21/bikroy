import { Box, Center, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

interface Props {}

const Collections = (props: Props) => {
  return (
    <Container maxW="7xl" mt={20} mb={20}>
      <Center>
        <Text textTransform="uppercase" fontSize="4rem" fontWeight="semibold">
          Collections
        </Text>
      </Center>
      <Grid gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]} gap={4}>
        <Grid gridTemplateRows="1fr 1fr" gap={4}>
          <Image
            src="/childCollections.jpg"
            height="auto"
            width="auto"
            objectFit="cover"
          />
          <Image
            src="/menCollections.jpg"
            height="auto"
            width="auto"
            objectFit="cover"
          />
        </Grid>
        <Image
          src="/womanCollections.jpg"
          height="400px"
          width="auto"
          objectFit="cover"
        />
      </Grid>
    </Container>
  );
};

export default Collections;
