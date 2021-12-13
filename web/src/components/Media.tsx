import { Image } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";
import ReactPlayer from "react-player";
import FilePlayer from "react-player/file";

interface MediaProps {
  p: PostSnippetFragment;
}

export const Media: React.FC<MediaProps> = ({ p }) => {
  if (p.type === 0) {
    return <Image src={p.path} alt={p.title} />;
  }
  if (p.type === 1) {
    return <ReactPlayer url={p.path} loop={true} light={true} />;
  }
  return <FilePlayer url={p.path} loop={true} light={true} />;
};
