import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../components/InputField";

const CreateItem = () => {
  return (
    <Box maxW="400px" mx="auto">
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          image: "",
        }}
        onSubmit={async (values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <InputField name="title" label="Title" />
            <InputField name="description" label="Description" />
            <InputField name="price" label="Price" />
            <InputField
              name="image"
              type="file"
              label="Image"
              onChange={(e) => setFieldValue("file", e.target.files[0])}
            />

            <Button
              mt={4}
              variantColor="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default CreateItem;
