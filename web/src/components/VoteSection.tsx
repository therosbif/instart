import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface VoteSectionProps {
  post: PostSnippetFragment;
}

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
      <IconButton
        onClick={() => {
          if (post.voteStatus === 1) {
            return;
          }
          vote({
            postId: post.id,
            value: 1,
          });
        }}
        aria-label="like"
        size="lg"
        colorScheme={post.voteStatus === 1 ? "green" : "gray"}
        variant="ghost"
        icon={<ArrowUpIcon />}
      />
      {post.points}
      <IconButton
        onClick={() => {
          if (post.voteStatus === -1) {
            return;
          }
          vote({
            postId: post.id,
            value: -1,
          });
        }}
        aria-label="dislike"
        size="lg"
        colorScheme={post.voteStatus === -1 ? "red" : "gray"}
        variant="ghost"
        icon={<ArrowDownIcon />}
      />
    </Flex>
  );
};
