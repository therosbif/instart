import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
  FieldResolver,
  Root,
  ObjectType,
} from "type-graphql";
import { Post } from "../entities/Post";
import { getConnection } from "typeorm";
import { Vote } from "../entities/Vote";
import { User } from "../entities/User";

@InputType()
class PostInput {
  @Field()
  title!: string;
  @Field()
  type!: number;
  @Field()
  path!: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => User)
  author(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(post.authorId);
  }

  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(@Root() post: Post, @Ctx() { req, voteLoader }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const vote = await voteLoader.load({
      postId: post.id,
      userId: req.session.userId,
    });

    return vote ? vote.value : null;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const isVote = value >= 0;
    const realValue = isVote ? 1 : -1;
    const { userId } = req.session;

    const vote = await Vote.findOne({ where: { postId, userId } });

    // the user has voted on the post before
    // and they are changing their vote
    if (vote && vote.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update vote
          set value = $1
          where "postId" = $2 and "userId" = $3
          `,
          [realValue, postId, userId]
        );

        await tm.query(
          `
          update post
          set points = points + $1
          where id = $2
          `,
          [2 * realValue, postId]
        );
      });
    } else if (!vote) {
      // has never voted before
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          insert into vote ("userId", "postId", value)
          values ($1, $2, $3)
          `,
          [userId, postId, realValue]
        );

        await tm.query(
          `
          update post
          set points = points + $1
          where id = $2
          `,
          [realValue, postId]
        );
      });
    }
    return true;
  }
  // 9:17:49
  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPosts> {
    const realLimit = (limit > 50 ? 50 : limit) + 1;

    const replacements: any[] = [realLimit];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const posts = await getConnection().query(
      `
    select p.*
    from post p
    ${cursor ? `where p."createdAt" < $2` : ""}
    order by p."createdAt" DESC
    limit $1
    `,
      replacements
    );

    return {
      posts: posts.slice(0, realLimit - 1),
      hasMore: posts.length === realLimit,
    };
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    if (!req.session.userId) {
      throw new Error("please log in to post");
    }

    return Post.create({
      ...input,
      authorId: req.session.userId,
    }).save();
  }

  //@Mutation(() => Post, { nullable: true })
  //@UseMiddleware(isAuth)
  //async updatePost(
  //  @Arg("id") id: number,
  //  @Arg("title") title: string
  //): Promise<Post | null> {
  //  const post = await Post.findOne(id);
  //  if (!post) {
  //    return null;
  //  }
  //  if (typeof title !== "undefined") {
  //    Post.update({ id }, { title });
  //  }
  //  return post;
  //}

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const post = await Post.findOne(id);
    if (!post) {
      return false;
    }
    if (post.authorId !== req.session.userId) {
      throw new Error("not authorized");
    }
    //await Vote.delete({ postId: id });
    await Post.delete({ id, authorId: req.session.userId });
    return true;
  }
}
