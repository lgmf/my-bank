-- CreateIndex
CREATE FULLTEXT INDEX `users_name_username_idx` ON `users`(`name`, `username`);
