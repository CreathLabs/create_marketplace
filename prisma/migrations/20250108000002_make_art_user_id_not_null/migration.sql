-- First, update any existing null user_id values to a default user
-- Using the superID from your seeder as the default
UPDATE "Art" SET "user_id" = 'f19da785-9ba9-46bb-ac31-38a98f340048' WHERE "user_id" IS NULL;

-- Then make the column NOT NULL to match the schema
ALTER TABLE "Art" ALTER COLUMN "user_id" SET NOT NULL;