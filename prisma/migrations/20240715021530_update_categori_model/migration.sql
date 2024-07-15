/*
  Warnings:

  - Made the column `type` on table `Categorie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Categorie` MODIFY `type` ENUM('FEATURE', 'GROUPH_CHEMICAL') NOT NULL;
