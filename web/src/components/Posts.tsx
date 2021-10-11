import { DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Link,
  Heading,
  Stack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { VoteSection } from "./VoteSection";
import NextLink from "next/link";
import {
  PostSnippetFragment,
  useDeletePostMutation,
  useMeQuery,
} from "../generated/graphql";
import { Media } from "./Media";

interface PostsProps {
  p: PostSnippetFragment;
}

export const Posts: React.FC<PostsProps> = ({ p }) => {
  const [{ data: meData, fetching: meFetching }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  return (
    <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
      <VoteSection post={p} />
      <Box flex={1} mr="auto">
        <NextLink href="/post/[id]" as={"/post/" + p.id}>
          <Link>
            <Heading fontSize="xl">{p.title}</Heading>
          </Link>
        </NextLink>
        <Text color="GrayText">@{p.author.username}</Text>
        <Flex>
          <Media key={p.id} p={p} />
        </Flex>
      </Box>
      <Stack align="right">
        <Text
          flex={1}
          color="GrayText"
          fontSize="sm"
          align="right"
          as="sub"
          mb="auto"
        >
          {new Date(parseInt(p.createdAt)).toLocaleDateString("fr")}
        </Text>
        {meData?.me?.id !== p.author.id ? null : (
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete Post"
            mt="auto"
            variant="ghost"
            onClick={() => {
              deletePost({ id: p.id });
            }}
          />
        )}
      </Stack>
    </Flex>
  );
};
