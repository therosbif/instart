import DataLoader from "dataloader";
import { Vote } from "../entities/Vote";

export const createVoteLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Vote | null>(
    async (keys) => {
      const votes = await Vote.findByIds(keys as any);
      const idToVote: Record<string, Vote> = {};
      votes.forEach((v) => {
        idToVote[`${v.userId}|${v.postId}`] = v;
      });

      return keys.map((key) => idToVote[`${key.userId}|${key.postId}`]);
    }
  );
