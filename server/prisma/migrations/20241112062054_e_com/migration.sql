-- AlterTable
ALTER TABLE `order` MODIFY `amount` INTEGER NOT NULL,
    ALTER COLUMN `status` DROP DEFAULT,
    ALTER COLUMN `stripePaymentId` DROP DEFAULT,
    ALTER COLUMN `currency` DROP DEFAULT;