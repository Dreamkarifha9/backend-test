
CREATE TABLE "user".roles (
	id serial4 NOT NULL,
	"name" varchar NULL,
	active bool NULL DEFAULT true,
	deleted bool NULL DEFAULT false,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	"createdBy" varchar NULL,
	"updatedAt" timestamptz NOT NULL DEFAULT now(),
	"updatedBy" varchar NULL,
	CONSTRAINT pk_roles PRIMARY KEY (id)
);


INSERT INTO "user".roles (id,"name",active,deleted,"createdAt","createdBy","updatedAt","updatedBy",slug) VALUES
	 (1,'Staff',true,false,'2022-10-11 12:03:34.426',NULL,'2022-10-11 12:03:34.426',NULL,'read'),
	 (2,'Super Admin',true,false,'2022-10-11 12:03:48.098',NULL,'2022-10-11 12:03:48.098',NULL,'create'),
	 (3, 'Manager',true,false,'2022-10-11 12:03:58.979',NULL,'2022-10-11 12:03:58.979',NULL,'update');

