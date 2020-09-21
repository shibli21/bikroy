import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../../components/InputField";
import Layout from "../../components/Layout";
import { MeDocument, useResetPasswordMutation } from "../../generated/graphql";

const ResetPassword = ({ token }) => {
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();

  return (
    <Layout>
      <Box maxW="400px" mx="auto">
        <Formik
          initialValues={{
            password: "",
          }}
          onSubmit={async (values) => {
            const { data } = await resetPassword({
              variables: {
                password: values.password,
                resetToken: token,
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
              <InputField name="password" label="Password" type="password" />
              <Button
                mt={4}
                variantColor="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Reset
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ResetPassword;
