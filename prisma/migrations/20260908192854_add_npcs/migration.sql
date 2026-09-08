-- CreateTable
CREATE TABLE "Npc" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "quirk" TEXT,
    "quirkDescription" TEXT,
    "bio" TEXT NOT NULL,
    "imageUrl" TEXT,
    "location" TEXT,
    "important" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Npc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcNote" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "npcId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NpcNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Npc_important_idx" ON "Npc"("important");

-- CreateIndex
CREATE UNIQUE INDEX "NpcNote_userId_npcId_key" ON "NpcNote"("userId", "npcId");

-- AddForeignKey
ALTER TABLE "NpcNote" ADD CONSTRAINT "NpcNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NpcNote" ADD CONSTRAINT "NpcNote_npcId_fkey" FOREIGN KEY ("npcId") REFERENCES "Npc"("id") ON DELETE CASCADE ON UPDATE CASCADE;
