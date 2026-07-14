-- CreateTable
CREATE TABLE "Sample" (
    "id" SERIAL NOT NULL,
    "msg" TEXT NOT NULL DEFAULT 'Hi',

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sample_id_key" ON "Sample"("id");
