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

