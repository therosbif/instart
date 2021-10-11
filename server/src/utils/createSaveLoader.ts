import DataLoader from "dataloader";
import { Save } from "../entities/Save";

export const createSaveLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Save | null>(
    async (keys) => {
      const saves = await Save.findByIds(keys as any);
      const idToVote: Record<string, Save> = {};
      saves.forEach((v) => {
        idToVote[`${v.userId}|${v.postId}`] = v;
      });

      return keys.map((key) => idToVote[`${key.userId}|${key.postId}`]);
    }
  );
