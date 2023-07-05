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

INSERT INTO "user".permissions (id,"userId","featureId",active,deleted,"createdAt","createdBy","updatedAt","updatedBy","isUsed") VALUES
	 ('5a15e913-6fd4-46fa-ac51-0565e38f8346','2013eceb-59bb-4ccc-89aa-f40e36bc76e3',1,true,false,'2023-07-05 17:17:44.003',NULL,'2023-07-05 17:17:44.003',NULL,true),
	 ('5cd42e69-6322-41e1-a5ac-9dca4c6f43f7','2013eceb-59bb-4ccc-89aa-f40e36bc76e3',2,true,false,'2023-07-05 17:18:14.203',NULL,'2023-07-05 17:18:14.203',NULL,true),
	 ('6367c9dd-8153-46f2-87ee-547b1b7c1869','2013eceb-59bb-4ccc-89aa-f40e36bc76e3',3,true,false,'2023-07-05 17:18:46.672',NULL,'2023-07-05 17:18:46.672',NULL,true);


