CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "mongo_id" INTEGER NOT NULL
);

CREATE TABLE "media"(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "genre_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "mongo_id" VARCHAR(255) NOT NULL
);

CREATE TABLE "priority_lists"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL
);

CREATE TABLE "media_priority_lists"(
    "id" SERIAL PRIMARY KEY,
    "list_id" INTEGER NOT NULL,
    "media_id" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL
);

CREATE TABLE "genres"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "categories"(
    "id" SERIAL PRIMARY KEY,
    "name" INTEGER NOT NULL
);

ALTER TABLE
    "priority_lists" ADD CONSTRAINT "priority_lists_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "media_priority_lists" ADD CONSTRAINT "media_priority_lists_media_id_foreign" FOREIGN KEY("media_id") REFERENCES "media"("id");
ALTER TABLE
    "media_priority_lists" ADD CONSTRAINT "media_priority_lists_list_id_foreign" FOREIGN KEY("list_id") REFERENCES "priority_lists"("id");
ALTER TABLE
    "media" ADD CONSTRAINT "media_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "categories"("id");
ALTER TABLE
    "media" ADD CONSTRAINT "media_genre_id_foreign" FOREIGN KEY("genre_id") REFERENCES "genres"("id");