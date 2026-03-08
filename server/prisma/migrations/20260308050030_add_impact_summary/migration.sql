/*
  Warnings:

  - You are about to drop the `Ailog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCategorisatiion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `impactSummary` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "impactSummary" TEXT NOT NULL;

-- DropTable
DROP TABLE "Ailog";

-- DropTable
DROP TABLE "ProductCategorisatiion";

-- CreateTable
CREATE TABLE "AiLog" (
    "id" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategorization" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "sustainability" TEXT[],
    "aiResponse" JSONB NOT NULL,
    "seoTags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductCategorization_pkey" PRIMARY KEY ("id")
);
