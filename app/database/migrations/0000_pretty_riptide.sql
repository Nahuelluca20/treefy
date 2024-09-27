CREATE TABLE `notes` (
	`id` text PRIMARY KEY NOT NULL,
	`parent_id` text,
	`title` text,
	`content` text NOT NULL,
	`date` text NOT NULL,
	`public_note` integer DEFAULT false,
	`author_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`profile_image` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);