/*
  Warnings:

  - You are about to drop the column `userId` on the `note` table. All the data in the column will be lost.
  - Added the required column `userIdd` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `note_userId_fkey`;

-- AlterTable
ALTER TABLE `note` DROP COLUMN `userId`,
    ADD COLUMN `userIdd` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `note_userIdd_fkey` FOREIGN KEY (`userIdd`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
