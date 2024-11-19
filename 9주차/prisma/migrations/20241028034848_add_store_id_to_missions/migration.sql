-- DropForeignKey
ALTER TABLE `missions` DROP FOREIGN KEY `missions_region_id_fkey`;

-- AlterTable
ALTER TABLE `missions` ADD COLUMN `store_id` INTEGER NULL,
    MODIFY `region_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `missions` ADD CONSTRAINT `missions_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `regions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `missions` ADD CONSTRAINT `missions_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
