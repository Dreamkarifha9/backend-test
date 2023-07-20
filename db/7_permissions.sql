CREATE TABLE "user".permissions (
     id UUID NOT NULL,
	"roleId" UUID NOT NULL,
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
    CONSTRAINT fk_role FOREIGN KEY ("roleId") REFERENCES "user".roles(id)
);

INSERT INTO "user".permissions (id,"roleId","featureId",active,deleted,"createdAt","createdBy","updatedAt","updatedBy","isUsed") VALUES
	 ('5a15e913-6fd4-46fa-ac51-0565e38f8346',1,1,true,false,'2023-07-05 17:17:44.003',NULL,'2023-07-05 17:17:44.003',NULL,true),
	 ('5cd42e69-6322-41e1-a5ac-9dca4c6f43f7',1,2,true,false,'2023-07-05 17:18:14.203',NULL,'2023-07-05 17:18:14.203',NULL,true),
	 ('6367c9dd-8153-46f2-87ee-547b1b7c1869',1,3,true,false,'2023-07-05 17:18:46.672',NULL,'2023-07-05 17:18:46.672',NULL,true)
	 ('19cbefe6-8043-452c-9093-c4c1426f4928',2,1,true,false,'2023-07-05 17:19:14.203',NULL,'2023-07-05 17:19:14.203',NULL,true),
	 ('5cd319c1-6741-4de7-a0e2-eae84377f6f6',2,2,true,false,'2023-07-05 17:20:14.203',NULL,'2023-07-05 17:20:14.203',NULL,true),
	 ('f4fbf282-d56d-4347-b4ba-788f1346981e',2,3,true,false,'2023-07-05 17:21:14.203',NULL,'2023-07-05 17:21:14.203',NULL,true),;


