-- SQL dump generated using DBML (dbml.dbdiagram.io)
-- Database: PostgreSQL
-- Generated at: 2026-04-04T08:13:27.573Z

CREATE TYPE "construction_period" AS ENUM (
  'KH_TV_TT',
  'TV',
  'TT',
  'BCKTKT'
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
  "pursuant_to_dec_tct_id" varchar NOT NULL,
  "current_snapshot_id" varchar
);

CREATE TABLE "construction_info_snapshots" (
  "id" varchar PRIMARY KEY NOT NULL,
  "construction_id" varchar NOT NULL,
  "name" varchar NOT NULL,
  "source_of_funds" varchar NOT NULL,
  "est_cost" decimal NOT NULL,
  "est_cost_str" varchar NOT NULL,
  "impl_start_date" timestamptz NOT NULL,
  "impl_end_date" timestamptz NOT NULL,
  "existing_condition_of_the_structure" text NOT NULL,
  "repair_scope" text NOT NULL
);

CREATE TABLE "bid_package_snapshots" (
  "id" varchar PRIMARY KEY,
  "construction_infor_snapshot_id" int NOT NULL,
  "type" bid_package_type NOT NULL,
  "project_owner" varchar NOT NULL,
  "name" varchar NOT NULL,
  "short_description" text NOT NULL,
  "est_cost" decimal NOT NULL,
  "est_cost_str" varchar NOT NULL,
  "bidder_selection_time" timestamptz NOT NULL,
  "bidder_selection_method" varchar NOT NULL,
  "successful_bidder_id" varchar,
  "duration" varchar NOT NULL,
  "is_completed" boolean NOT NULL
);

CREATE TABLE "submissions" (
  "id" varchar PRIMARY KEY,
  "construction_id" varchar NOT NULL,
  "decision_id" varchar NOT NULL,
  "construction_infor_snapshot_id" varchar NOT NULL,
  "is_change_construction_infor" boolean
);

CREATE TABLE "decisions" (
  "id" varchar PRIMARY KEY,
  "construction_id" varchar NOT NULL,
  "period" construction_period NOT NULL,
  "is_change_construction_infor" boolean
);

COMMENT ON TABLE "bid_package_snapshots" IS 'Bidder schema not provided';

ALTER TABLE "administrative_documents" ADD FOREIGN KEY ("pursuant_to_dec_tct_id") REFERENCES "administrative_documents" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "administrative_documents" ADD FOREIGN KEY ("pursuant_to_dec_ttmn_id") REFERENCES "administrative_documents" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "submissions" ADD FOREIGN KEY ("id") REFERENCES "administrative_documents" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "decisions" ADD FOREIGN KEY ("id") REFERENCES "administrative_documents" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "constructions" ADD FOREIGN KEY ("pursuant_to_dec_tct_id") REFERENCES "administrative_documents" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "construction_info_snapshots" ADD FOREIGN KEY ("id") REFERENCES "constructions" ("current_snapshot_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "construction_info_snapshots" ADD FOREIGN KEY ("construction_id") REFERENCES "constructions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "construction_info_snapshots" ADD FOREIGN KEY ("id") REFERENCES "submissions" ("construction_infor_snapshot_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bid_package_snapshots" ADD FOREIGN KEY ("construction_infor_snapshot_id") REFERENCES "construction_info_snapshots" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "submissions" ADD FOREIGN KEY ("construction_id") REFERENCES "constructions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "submissions" ADD FOREIGN KEY ("decision_id") REFERENCES "decisions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "decisions" ADD FOREIGN KEY ("construction_id") REFERENCES "constructions" ("id") DEFERRABLE INITIALLY IMMEDIATE;
