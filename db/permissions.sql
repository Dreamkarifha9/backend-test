CREATE TABLE "user".permissions (
     id UUID NOT NULL,
	"userId" UUID NOT NULL,
	"featureId" int4 NOT NULL,
	active bool NULL DEFAULT true,
	deleted bool NULL DEFAULT false,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	"createdBy" varchar NULL,
	"updatedAt" timestamptz NOT NULL DEFAULT now(),
	"updatedBy" varchar NULL,
	"isUsed" bool NULL,
	CONSTRAINT pk_permissions PRIMARY KEY ("id"),
    CONSTRAINT fk_features FOREIGN KEY ("featureId") REFERENCES "user".features(id),
    CONSTRAINT fk_users FOREIGN KEY ("userId") REFERENCES "user".users(id)
);

