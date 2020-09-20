import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { MeDocument, useLoginMutation, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
const Register = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <Layout>
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
    </Layout>
  );
};
export default Register;
