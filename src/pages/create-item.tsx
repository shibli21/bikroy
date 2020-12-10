import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { useCreateItemMutation } from "../generated/graphql";
import { handleImageUpload } from "../utils/handleImageUpload";

const CreateItem = () => {
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [createItem, { data }] = useCreateItemMutation();

  return (
    <Layout>
      <Box maxW="400px" mx="auto">
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: "",
            image: "",
            file: "",
          }}
          onSubmit={async (values) => {
            const imgUrl = await handleImageUpload(file);
            const { data } = await createItem({
              variables: {
                input: {
                  title: values.title,
                  description: values.description,
                  price: parseInt(values.price),
                  image: imgUrl.image,
                  largeImage: imgUrl.largeImage,
                },
              },
              update: (cache) => {
                cache.evict({ fieldName: "items" });
              },
            });
            router.push("/items");
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <InputField name="title" label="Title" />
              <InputField name="description" label="Description" />
              <InputField name="price" label="Price" />
              <InputField
                name="image"
                label="Image"
                type="file"
                onChange={(e) => {
                  setFieldValue("image", e.target.value);
                  setFile(e.target.files);
                }}
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
    </Layout>
  );
};
export default CreateItem;
