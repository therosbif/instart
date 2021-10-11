import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generated/graphql";
import { Layout } from "../components/Layout";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { VoteSection } from "../components/VoteSection";
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Posts } from "../components/Posts";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 3,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <div>
        <div>hmm... it's quiet... too quiet...</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      <Flex align="center">
        <Heading fontSize="xl">Timeline</Heading>
        <NextLink href="/create-post">
          <Button
            ml="auto"
            variant="outline"
            colorScheme="linkedin"
            leftIcon={<PlusSquareIcon />}
            as={Link}
          >
            create post
          </Button>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : <Posts key={p.id} p={p} />
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
