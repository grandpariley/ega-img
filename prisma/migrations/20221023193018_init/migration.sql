-- CreateTable
CREATE TABLE "pfp" (
    "user" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "pfp_pkey" PRIMARY KEY ("user")
);

-- CreateIndex
CREATE UNIQUE INDEX "pfp_img_key" ON "pfp"("img");
