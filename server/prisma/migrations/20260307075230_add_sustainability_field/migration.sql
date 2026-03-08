/*
  Warnings:

  - Added the required column `sustainability` to the `ProductCategorisatiion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductCategorisatiion" ADD COLUMN     "sustainability" TEXT NOT NULL;
