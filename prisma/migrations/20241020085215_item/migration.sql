/*
  Warnings:

  - You are about to drop the column `userIdd` on the `note` table. All the data in the column will be lost.
  - Added the required column `userId` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `note_userIdd_fkey`;

-- AlterTable
ALTER TABLE `note` DROP COLUMN `userIdd`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `note_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
