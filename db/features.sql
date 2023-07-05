-- "user".features definition

-- Drop table

-- DROP TABLE "user".features;

CREATE TABLE "user".features (
	id bigserial NOT NULL,
	"name" varchar NOT NULL,
	description varchar NULL,
	active bool NULL DEFAULT true,
	deleted bool NULL DEFAULT false,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	"createdBy" varchar NULL,
	"updatedAt" timestamptz NOT NULL DEFAULT now(),
	"updatedBy" varchar NULL,
	slug varchar NULL,
	CONSTRAINT features_pkey PRIMARY KEY (id)
);


INSERT INTO "user".features ("name",description,active,deleted,"createdAt","createdBy","updatedAt","updatedBy",slug) VALUES
	 ('Read','can read',true,false,'2022-10-11 12:03:34.426',NULL,'2022-10-11 12:03:34.426',NULL,'read'),
	 ('Create','can create',true,false,'2022-10-11 12:03:48.098',NULL,'2022-10-11 12:03:48.098',NULL,'create'),
	 ('Update','can update',true,false,'2022-10-11 12:03:58.979',NULL,'2022-10-11 12:03:58.979',NULL,'update'),
	 ('Delete','can delete',true,false,'2022-10-11 12:04:30.376',NULL,'2022-10-11 12:04:30.376',NULL,'delete');
