-- CreateTable
CREATE TABLE "Ailog" (
    "id" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "resonse" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ailog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategorisatiion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "aiResponse" JSONB NOT NULL,
    "seoTags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductCategorisatiion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "useCase" TEXT NOT NULL,
    "companySize" INTEGER NOT NULL,
    "proposalData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);
