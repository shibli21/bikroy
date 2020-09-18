import { Box, Button, Spinner } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import {
  useItemQuery,
  useUpdateItemMutation,
} from "../../../generated/graphql";
import { handleImageUpload } from "../../../utils/handleImageUpload";

const UpdateItem = () => {
  const { query } = useRouter();
  const intId = typeof query.id === "string" ? parseInt(query.id) : -1;

  const [
    updateItem,
    { data: updateData, loading, error },
  ] = useUpdateItemMutation();
  const { data: itemData, loading: itemLoading } = useItemQuery({
    variables: {
      id: intId,
    },
  });

  if (itemLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  if (!itemData.item) {
    return (
      <Layout>
        <h1>No item found</h1>
      </Layout>
    );
  }

  return (
    <Box maxW="400px" mx="auto">
      <Formik
        initialValues={{
          title: itemData.item.title,
          description: itemData.item.description,
          price: itemData.item.price,
        }}
        onSubmit={async (values) => {
          const { data } = await updateItem({
            variables: {
              id: intId,
              title: values.title,
              description: values.description,
              price: 24,
            },
          });
          console.log(data);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" label="Title" />
            <InputField name="description" label="Description" />
            <InputField name="price" label="Price" />
            <Button
              mt={4}
              variantColor="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Update Item
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateItem;
