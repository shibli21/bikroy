import { Box, Button, Center, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Hero = (props: Props) => {
  return (
    <>
      <Grid h="100vh" mt="-70px" gridTemplateColumns="1fr 1fr" w="100%">
        <Box alignSelf="center" ml={20}>
          <Text
            textTransform="uppercase"
            fontSize="8xl"
            fontWeight="semibold"
            lineHeight={1}
          >
            Lets make you look good
          </Text>
          <Button
            borderRadius={0}
            mt={10}
            variant="solid"
            bg="gray.900"
            color="gray.100"
            _hover={{
              bg: "gray.600",
            }}
          >
            Get Started
          </Button>
          <Text
            lineHeight={1.3}
            fontSize="lg"
            w="65%"
            mt="8rem"
            fontWeight="semibold"
          >
            The way you dress speaks a lot about your personality .Give us at
            VOUS BELLE to handle anything fashion for you.We got you covered.
          </Text>
        </Box>
        <Grid gridTemplateColumns="1fr 1fr">
          <Grid gridTemplateRows="1f 1fr">
            <Box bg="purple.300" pos="relative">
              <Flex
                justify="center"
                bottom="10%"
                bg="white"
                w="50%"
                pos="absolute"
                h="60px"
                flexDir="column"
                pl={4}
              >
                <Text>Lorem, ipsum.</Text>
                <Text>$27.20</Text>
              </Flex>
            </Box>
            <Box bg="yellow.300" pos="relative">
              <Flex
                justify="center"
                bottom="10%"
                bg="white"
                w="50%"
                pos="absolute"
                h="60px"
                flexDir="column"
                pl={4}
              >
                <Text>Lorem, ipsum.</Text>
                <Text>$27.20</Text>
              </Flex>
            </Box>
          </Grid>
          <Box bg="orange.300" pos="relative">
            <Flex
              justify="center"
              bottom="20%"
              bg="white"
              w="60%"
              pos="absolute"
              h="80px"
              flexDir="column"
              pl={4}
            >
              <Text>Lorem, ipsum.</Text>
              <Text>$27.20</Text>
            </Flex>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Hero;
