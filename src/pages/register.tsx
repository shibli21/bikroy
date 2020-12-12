import { Box, Button, Container, Grid, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import NextLink from "next/link";
import InputField from "../components/InputField";
import { MeDocument, useRegisterMutation } from "../generated/graphql";

const Register = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Grid
      h="100vh"
      gridTemplateColumns={["1fr ", "1fr", "1fr 1fr", "1fr 1fr"]}
      mt="-70px"
    >
      <Box bg="gray.700" display={["none", "none", "block", "block"]}></Box>
      <Box w={["auto", "400px"]} justifySelf="center" alignSelf="center">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            const { data } = await register({
              variables: {
                options: {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                },
              },
              refetchQueries: [
                {
                  query: MeDocument,
                },
              ],
            });
            router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="name" label="Name" placeholder="Name" />
              <InputField name="email" label="Email" placeholder="Email" />
              <InputField
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
              />
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                borderRadius={0}
                textTransform="uppercase"
                bg="gray.900"
                color="white"
                fontWeight="normal"
                _hover={{
                  bg: "gray.700",
                }}
                w="100%"
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
        <Text color="gray.500" textAlign="center" mt={6}>
          Already have account?
          <NextLink href="/login"> Sign in</NextLink>
        </Text>
      </Box>
    </Grid>
  );
};
export default Register;
