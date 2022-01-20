CREATE TABLE "media"(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "genres" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "length" INTEGER NOT NULL,
    "mongo_id" VARCHAR(255) NOT NULL,
    "poster_url" VARCHAR(255)
);

CREATE TABLE "priority_lists"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL
);

CREATE TABLE "media_priority_lists"(
    "id" SERIAL PRIMARY KEY,
    "list_id" INTEGER NOT NULL,
    "media_id" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL
);

ALTER TABLE
    "media_priority_lists" ADD CONSTRAINT "media_priority_lists_media_id_foreign" FOREIGN KEY("media_id") REFERENCES "media"("id");
ALTER TABLE
    "media_priority_lists" ADD CONSTRAINT "media_priority_lists_list_id_foreign" FOREIGN KEY("list_id") REFERENCES "priority_lists"("id");
