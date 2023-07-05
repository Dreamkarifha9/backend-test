CREATE TABLE IF NOT EXISTS "user"."users" (
    id UUID NOT NULL,
    "username" CHARACTER VARYING NULL,
    "salt" CHARACTER VARYING NULL,
    "password" CHARACTER VARYING NULL,
    "firstName" CHARACTER VARYING NULL,
    "lastName" CHARACTER VARYING NULL,
    "email" CHARACTER VARYING NULL,
    
    "active" BOOLEAN DEFAULT true,
    "deleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "createdBy" CHARACTER VARYING,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updatedBy" CHARACTER VARYING,

    CONSTRAINT "pk_users" PRIMARY KEY ("id"),
    CONSTRAINT "uq_users_username" UNIQUE (username)
);
