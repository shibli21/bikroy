import { Box, Button, Container } from "@chakra-ui/react";
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
    <Container maxW="6xl">
      <Box maxW="400px" mx="auto">
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
              <InputField name="email" label="Email" />
              <InputField name="password" label="Password" type="password" />
              <Button
                mt={4}
                variantColor="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>

              <Button
                ml={4}
                mt={4}
                variantColor="red"
                isLoading={isSubmitting}
                type="submit"
              >
                <NextLink href="/forgot-password">Forgot password</NextLink>
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};
export default Register;
