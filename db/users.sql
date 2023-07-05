CREATE TABLE IF NOT EXISTS "user"."users" (
    id UUID NOT NULL,
    "username" CHARACTER VARYING NULL,
    "salt" CHARACTER VARYING NULL,
    "password" CHARACTER VARYING NULL,
    "firstName" CHARACTER VARYING NULL,
    "lastName" CHARACTER VARYING NULL,
    "email" CHARACTER VARYING NULL,
    "roleId" serial4 NOT NULL,


    "active" BOOLEAN DEFAULT true,
    "deleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "createdBy" CHARACTER VARYING,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updatedBy" CHARACTER VARYING,

    CONSTRAINT "pk_users" PRIMARY KEY ("id"),
    CONSTRAINT "uq_users_username" UNIQUE (username),
    CONSTRAINT "fk_users_role" FOREIGN KEY ("roleId") REFERENCES "user".roles(id)
);

INSERT INTO "user".users (id,username,salt,"password","firstName","lastName",email,active,deleted,"createdAt","createdBy","updatedAt","updatedBy") VALUES
	 ('2013eceb-59bb-4ccc-89aa-f40e36bc76e3','dream','$2b$10$Kl7zCUKwNpx5MOMCvA00O.','$2b$10$Kl7zCUKwNpx5MOMCvA00O.WCsKqwmicjeQt0AlsQqzLOgEIncseWu','jirayu','kachob','dreamkarifha@gmail.com',true,false,'2023-07-05 17:17:01.080','system','2023-07-05 17:17:01.080','system');

