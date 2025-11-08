CREATE TABLE `asaasWebhooks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`event` varchar(100) NOT NULL,
	`paymentId` varchar(64),
	`subscriptionId` varchar(64),
	`payload` text NOT NULL,
	`processed` boolean NOT NULL DEFAULT false,
	`processedAt` timestamp,
	`error` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `asaasWebhooks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orderItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`productId` int,
	`productName` varchar(255) NOT NULL,
	`productSku` varchar(100),
	`quantity` int NOT NULL,
	`unitPrice` int NOT NULL,
	`totalPrice` int NOT NULL,
	`unitCost` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orderItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`externalId` varchar(100),
	`marketplace` enum('mercado_livre','amazon','shopee','manual') NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(320),
	`customerPhone` varchar(20),
	`customerDocument` varchar(18),
	`shippingAddress` text,
	`shippingCity` varchar(100),
	`shippingState` varchar(2),
	`shippingZipCode` varchar(10),
	`totalAmount` int NOT NULL,
	`shippingCost` int DEFAULT 0,
	`discountAmount` int DEFAULT 0,
	`marketplaceFee` int DEFAULT 0,
	`paymentFee` int DEFAULT 0,
	`icmsAmount` int DEFAULT 0,
	`taxAmount` int DEFAULT 0,
	`netProfit` int,
	`status` enum('pending','paid','processing','shipped','delivered','cancelled','refunded') NOT NULL DEFAULT 'pending',
	`trackingCode` varchar(100),
	`shippedAt` timestamp,
	`deliveredAt` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`sku` varchar(100),
	`description` text,
	`category` varchar(100),
	`costPrice` int NOT NULL,
	`salePrice` int NOT NULL,
	`stock` int NOT NULL DEFAULT 0,
	`minStock` int DEFAULT 0,
	`weight` int,
	`width` int,
	`height` int,
	`length` int,
	`mlId` varchar(100),
	`amazonId` varchar(100),
	`shopeeId` varchar(100),
	`active` boolean NOT NULL DEFAULT true,
	`images` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('income','expense') NOT NULL,
	`category` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`amount` int NOT NULL,
	`orderId` int,
	`dueDate` timestamp,
	`paidAt` timestamp,
	`status` enum('pending','paid','overdue','cancelled') NOT NULL DEFAULT 'pending',
	`paymentMethod` varchar(50),
	`attachments` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`mlAccessToken` text,
	`mlRefreshToken` text,
	`mlUserId` varchar(64),
	`mlTokenExpiresAt` timestamp,
	`amazonAccessToken` text,
	`amazonRefreshToken` text,
	`amazonSellerId` varchar(64),
	`shopeeAccessToken` text,
	`shopeeRefreshToken` text,
	`shopeeShopId` varchar(64),
	`icmsRate` int DEFAULT 18,
	`state` varchar(2) DEFAULT 'SP',
	`emailNotifications` boolean DEFAULT true,
	`lowStockAlert` boolean DEFAULT true,
	`lowStockThreshold` int DEFAULT 10,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `userSettings_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `company` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `cnpj` varchar(18);--> statement-breakpoint
ALTER TABLE `users` ADD `taxRegime` enum('simples','lucro_presumido','lucro_real') DEFAULT 'simples';--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionStatus` enum('trial','active','suspended','cancelled') DEFAULT 'trial';--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionPlan` enum('starter','professional','business','enterprise') DEFAULT 'starter';--> statement-breakpoint
ALTER TABLE `users` ADD `trialEndsAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionEndsAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `asaasCustomerId` varchar(64);--> statement-breakpoint
ALTER TABLE `users` ADD `asaasSubscriptionId` varchar(64);