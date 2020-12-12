import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import { MeDocument, useLoginMutation } from "../generated/graphql";
const Register = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

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
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            const { data } = await login({
              variables: {
                email: values.email,
                password: values.password,
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
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
        <Text mt={6} textAlign="center" color="gray.500">
          <NextLink href="/forgot-password">Forgot password?</NextLink>
        </Text>
        <Text color="gray.500" textAlign="center">
          Don't have account?
          <NextLink href="/register"> Sign up</NextLink>
        </Text>
      </Box>
    </Grid>
  );
};
export default Register;
