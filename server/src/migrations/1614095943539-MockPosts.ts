import { MigrationInterface, QueryRunner } from "typeorm";

export class MockPosts1614095943539 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
//     await queryRunner.query(`
//     insert into post (title, "authorId", "createdAt") values ('Azumi', 1, '2020-09-02T11:12:23Z');
// insert into post (title, "authorId", "createdAt") values ('Rush Hour', 1, '2020-08-30T17:41:05Z');
// insert into post (title, "authorId", "createdAt") values ('Don''t Look Back (Ne te retourne pas)', 1, '2020-12-18T14:48:40Z');
// insert into post (title, "authorId", "createdAt") values ('Scorcher', 1, '2020-03-12T14:13:35Z');
// insert into post (title, "authorId", "createdAt") values ('Late August, Early September (Fin août, début septembre)', 1, '2020-05-01T12:57:14Z');
// insert into post (title, "authorId", "createdAt") values ('Live Forever', 1, '2020-12-13T14:31:05Z');
// insert into post (title, "authorId", "createdAt") values ('Elvis', 1, '2021-02-19T17:25:13Z');
// insert into post (title, "authorId", "createdAt") values ('Blue Collar Comedy Tour: The Movie', 1, '2020-03-27T06:00:10Z');
// insert into post (title, "authorId", "createdAt") values ('Lake House, The', 1, '2021-01-13T20:43:22Z');
// insert into post (title, "authorId", "createdAt") values ('Wake Island', 1, '2021-02-14T10:56:55Z');
// insert into post (title, "authorId", "createdAt") values ('Second Man, The (O Defteros Andras)', 1, '2020-02-27T00:45:42Z');
// insert into post (title, "authorId", "createdAt") values ('Last Warrior, The (Last Patrol, The)', 1, '2020-10-22T09:09:45Z');
// insert into post (title, "authorId", "createdAt") values ('When the Bough Breaks', 1, '2020-09-17T06:02:17Z');
// insert into post (title, "authorId", "createdAt") values ('Camp de Thiaroye', 1, '2021-02-17T07:37:46Z');
// insert into post (title, "authorId", "createdAt") values ('Scream of Fear (a.k.a. Taste of Fear)', 1, '2020-06-20T20:26:39Z');
// insert into post (title, "authorId", "createdAt") values ('Pet Sematary', 1, '2020-05-04T10:28:41Z');
// insert into post (title, "authorId", "createdAt") values ('Curse of the Jade Scorpion, The', 1, '2020-05-29T10:30:07Z');
// insert into post (title, "authorId", "createdAt") values ('Citizen X', 1, '2020-12-23T21:18:25Z');
// `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
