import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import {
  useCreateItemMutation,
  useRegisterMutation,
} from "../generated/graphql";
import { handleImageUpload } from "../utils/handleImageUpload";

const Register = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Layout>
      <Box maxW="400px" mx="auto">
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
              //   update: (cache) => {
              //     cache.evict({ fieldName: "items" });
              //   },
            });
            console.log(data);

            // router.push("/items");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="name" label="Name" />
              <InputField name="email" label="Email" />
              <InputField name="password" label="Password" type="password" />
              <Button
                mt={4}
                variantColor="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};
export default Register;
