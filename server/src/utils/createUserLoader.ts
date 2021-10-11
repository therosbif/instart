import DataLoader from "dataloader";
import { User } from "../entities/User";

export const createUserLoader = () =>
  new DataLoader<number, User>(async (keys) => {
    const users = await User.findByIds(keys as number[]);
    const idToUser: Record<number, User> = {};
    users.forEach((u) => {
      idToUser[u.id] = u;
    });

    return keys.map((id) => idToUser[id]);
  });
