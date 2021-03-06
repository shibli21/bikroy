import { Alert, AlertIcon, Box, Button, Container } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import {
  RequestResetMutation,
  useRequestResetMutation,
} from "../generated/graphql";

const ForgotPassword = () => {
  const [requestReset] = useRequestResetMutation();
  const [message, setMessage] = useState<RequestResetMutation>(null);

  let alert;

  if (message?.requestReset.field === "fail") {
    alert = (
      <Alert status="error" mt={4}>
        <AlertIcon />
        {message?.requestReset.message}
      </Alert>
    );
  }
  if (message?.requestReset.field === "success") {
    alert = (
      <Alert status="success" mt={4}>
        <AlertIcon />
        {message?.requestReset.message}
      </Alert>
    );
  }

  return (
    <Container maxW="6xl">
      <Box maxW="400px" mx="auto">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            const { data } = await requestReset({
              variables: {
                email: values.email,
              },
            });
            setMessage(data);
            console.log(data);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" label="Email" />
              {alert}
              <Button
                mt={4}
                variantColor="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Request reset
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Footer />
    </Container>
  );
};

export default ForgotPassword;
