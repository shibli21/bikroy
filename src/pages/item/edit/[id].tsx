import { Box, Button, Container, Spinner } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import Footer from "../../../components/Footer";
import InputField from "../../../components/InputField";
import {
  useItemQuery,
  useMeQuery,
  useUpdateItemMutation,
} from "../../../generated/graphql";

const UpdateItem = () => {
  const { query } = useRouter();
  const { data: meData } = useMeQuery();
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
      <Container maxW="6xl">
        <h1>No item found</h1>
      </Container>
    );
  }

  if (itemData.item.creator.id !== meData?.me?.id) {
    return (
      <Container maxW="6xl">
        <h1>You are not authenticated to edit this post!</h1>
      </Container>
    );
  }

  return (
    <Container maxW="6xl">
      <Box maxW="400px" mx="auto">
        <Formik
          initialValues={{
            title: itemData.item.title,
            description: itemData.item.description,
            price: `${itemData.item.price}`,
          }}
          onSubmit={async (values) => {
            const { data } = await updateItem({
              variables: {
                id: intId,
                title: values.title,
                description: values.description,
                price: parseInt(values.price),
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
      <Footer />
    </Container>
  );
};

export default UpdateItem;
