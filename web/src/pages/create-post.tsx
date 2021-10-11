import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  const [type, setType] = useState(0);
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", path: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: { type, ...values } });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {(props) => (
          <Form>
            <Flex direction="row" mb={4} justifyContent="center">
              <Button
                onClick={() => {
                  setType(0);
                }}
                colorScheme={type == 0 ? "green" : undefined}
              >
                Image
              </Button>
              <Button
                onClick={() => {
                  setType(1);
                }}
                colorScheme={type == 1 ? "green" : undefined}
              >
                Video
              </Button>
              <Button
                onClick={() => {
                  setType(2);
                }}
                colorScheme={type == 2 ? "green" : undefined}
              >
                Music
              </Button>
            </Flex>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField name="path" placeholder="https://..." label="Link" />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={props.isSubmitting}
              colorScheme="purple"
            >
              Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
//11:43:51

export default withUrqlClient(createUrqlClient)(CreatePost);
