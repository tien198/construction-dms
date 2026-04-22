-- SQL dump generated using DBML (dbml.dbdiagram.io)
-- Database: PostgreSQL
-- Generated at: 2026-04-21T14:34:50.531Z

CREATE TYPE "construction_period" AS ENUM (
  'KH_LCNT',
  'KQ_KH_LCNT',
  'BCKTKT',
  'TC'
);

CREATE TYPE "bid_package_type" AS ENUM (
  'TV',
  'TT',
  'TC'
);

CREATE TABLE "administrative_documents" (
  "id" varchar PRIMARY KEY,
  "no" varchar NOT NULL,
  "level" varchar NOT NULL,
  "date" timestamptz NOT NULL,
  "pursuant_to_dec_tct_id" varchar,
  "pursuant_to_dec_ttmn_id" varchar
);

CREATE TABLE "constructions" (
  "id" varchar PRIMARY KEY,
  "pursuant_to_dec_tct_id" varchar NOT NULL
);

CREATE TABLE "construction_info_snapshots" (
  "id" varchar PRIMARY KEY NOT NULL,
  "construction_id" varchar NOT NULL,
  "submission_id" varchar NOT NULL,
  "name" varchar NOT NULL,
  "source_of_funds" varchar NOT NULL,
  "est_cost" decimal NOT NULL,
  "est_cost_str" varchar NOT NULL,
  "impl_start_date" timestamptz NOT NULL,
  "impl_end_date" timestamptz NOT NULL,
  "existing_condition_of_the_structure" text NOT NULL,
  "repair_scope" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'NOW()'
);

CREATE TABLE "bid_package_snapshots" (
  "id" varchar PRIMARY KEY,
  "construction_id" varchar NOT NULL,
  "submission_id" varchar NOT NULL,
  "type" bid_package_type NOT NULL,
  "project_owner" varchar NOT NULL,
  "name" varchar NOT NULL,
  "short_desc" text NOT NULL,
  "est_cost" decimal NOT NULL,
  "est_cost_str" varchar NOT NULL,
  "bidder_selection_time" timestamptz NOT NULL,
  "bidder_selection_method" varchar NOT NULL,
  "successful_bidder_id" varchar,
  "duration" varchar NOT NULL,
  "is_completed" boolean NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'NOW()'
);

CREATE TABLE "submissions" (
  "id" varchar PRIMARY KEY,
  "construction_id" varchar NOT NULL,
  "decision_id" varchar NOT NULL,
  "for_bid_package_type" bid_package_type,
  "created_at" timestamptz NOT NULL DEFAULT 'NOW()'
);

CREATE TABLE "decisions" (
  "id" varchar PRIMARY KEY,
  "construction_id" varchar NOT NULL,
  "period" construction_period NOT NULL
);

COMMENT ON COLUMN "constructions"."pursuant_to_dec_tct_id" IS 'refers to [administrative_documents.id]';

COMMENT ON COLUMN "construction_info_snapshots"."construction_id" IS 'refers to [constructions.id]';

COMMENT ON COLUMN "construction_info_snapshots"."submission_id" IS 'refers to [submissions.id]';

COMMENT ON COLUMN "construction_info_snapshots"."created_at" IS 'used to define the newest record';

COMMENT ON TABLE "bid_package_snapshots" IS 'Bidder schema not provided';

COMMENT ON COLUMN "bid_package_snapshots"."construction_id" IS 'refers to [constructions.id]';

COMMENT ON COLUMN "bid_package_snapshots"."submission_id" IS 'refers to [submissions.id]';

COMMENT ON COLUMN "bid_package_snapshots"."successful_bidder_id" IS 'refers to [bidders.id] and can be null if there are no snapshots available for the construction.';

COMMENT ON COLUMN "bid_package_snapshots"."created_at" IS 'used to define the newest record';

COMMENT ON COLUMN "submissions"."construction_id" IS 'refers to [constructions.id]';

COMMENT ON COLUMN "submissions"."for_bid_package_type" IS 'used to define that submission is for a bid package. This can be null if the submission is not for a bid package.';

COMMENT ON COLUMN "submissions"."created_at" IS 'used to define the newest record';

COMMENT ON COLUMN "decisions"."construction_id" IS 'refers to [constructions.id]';

ALTER TABLE "administrative_documents" ADD FOREIGN KEY ("pursuant_to_dec_tct_id") REFERENCES "administrative_documents" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "administrative_documents" ADD FOREIGN KEY ("pursuant_to_dec_ttmn_id") REFERENCES "administrative_documents" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "submissions" ADD FOREIGN KEY ("id") REFERENCES "administrative_documents" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "decisions" ADD FOREIGN KEY ("id") REFERENCES "administrative_documents" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "submissions" ADD FOREIGN KEY ("id") REFERENCES "construction_info_snapshots" ("submission_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bid_package_snapshots" ADD FOREIGN KEY ("submission_id") REFERENCES "submissions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "construction_info_snapshots" ADD FOREIGN KEY ("construction_id") REFERENCES "constructions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bid_package_snapshots" ADD FOREIGN KEY ("construction_id") REFERENCES "constructions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "decisions" ADD FOREIGN KEY ("construction_id") REFERENCES "constructions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "submissions" ADD FOREIGN KEY ("decision_id") REFERENCES "decisions" ("id") DEFERRABLE INITIALLY IMMEDIATE;
