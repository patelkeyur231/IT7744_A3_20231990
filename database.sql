-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: my_app
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `my_app`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `my_app` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

USE `my_app`;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_10_30_000000_create_posts_table',1),(5,'2026_11_27_000000_add_avatar_to_users_table',1),(6,'2026_11_27_000001_add_role_to_users_table',1),(7,'2026_11_27_000002_create_personal_access_tokens_table',1),(8,'2026_11_27_000003_add_filter_to_posts_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `filter` varchar(255) NOT NULL DEFAULT 'none',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_user_id_foreign` (`user_id`),
  CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,4,'Et molestiae non voluptatibus sed rerum.','Voluptas placeat rem nihil tenetur tenetur facilis dignissimos. Deleniti esse non et saepe dolorem veritatis saepe. Ut sint aspernatur magnam sit error. Perferendis deleniti commodi ad autem molestiae eveniet.\n\nRerum enim accusantium consectetur aut quo. Error sunt dolores eligendi aut omnis incidunt voluptas iure. Officiis nemo ab placeat voluptas eaque. In consequuntur quas quidem et iusto aliquid molestiae. Ex corporis consectetur ducimus suscipit at dolor est.\n\nDolor voluptatibus quis distinctio dicta consequatur. Voluptatem eligendi qui est dolores dicta doloremque porro. Voluptatibus veniam quaerat rerum ea commodi sed. Rerum vel sapiente voluptas sequi sequi quos veritatis soluta. Dolorum autem fuga aut eaque.\n\nEarum fugit esse et debitis. Rerum earum nisi qui voluptas fugit eius eum.',NULL,'none','2026-11-19 13:00:15','2026-11-26 17:16:34'),(2,1,'Aspernatur quaerat quam ipsum sit.','Voluptate voluptas amet voluptas voluptas. Quod et nulla atque consequatur.\n\nOfficia in ratione amet ipsa. Id quo commodi voluptate sed. At ex libero perspiciatis.\n\nAut voluptate possimus eum nobis. Eaque velit doloremque neque praesentium repellat itaque quia rem. Facere est excepturi laborum est dolor. Corporis ipsum doloremque modi ut est aut sint consequatur. Recusandae minus eaque quidem fuga sapiente quae.\n\nItaque laudantium voluptatem quaerat est sit soluta. Magni natus et placeat saepe dolor omnis perspiciatis sed. Beatae quam ab quod praesentium vel animi fuga corrupti.',NULL,'none','2026-11-16 20:27:38','2026-11-26 17:16:34'),(3,1,'Consequatur dolor neque rerum nulla beatae vero.','Quam molestias in assumenda repellendus exercitationem id. Sed modi quibusdam iure iste aliquid. Voluptate non et consequatur similique nemo sint.\n\nNemo exercitationem sint dignissimos velit. Soluta id accusamus voluptate qui. Earum provident placeat ea error quia consequatur minima.\n\nUt tempora minus ab debitis. Odio qui enim natus culpa nihil quibusdam temporibus. Quasi minus voluptatibus esse maxime necessitatibus cupiditate.\n\nError magni cum deleniti non. Modi minus error laborum ipsam aut et. Id amet quaerat ratione unde odio aut. Reiciendis dicta voluptas est eum quod aut.',NULL,'sepia','2026-11-11 15:57:33','2026-11-26 17:16:34'),(4,5,'Libero et deserunt eveniet.','Rerum exercitationem animi qui quibusdam. Aut velit voluptatem suscipit qui voluptate ut recusandae illum. Reprehenderit sed debitis et temporibus.\n\nDelectus fugit voluptas non quos autem. Nihil assumenda quaerat quas. Repellat sunt saepe neque enim nihil ea. Est ipsam dolorum omnis doloribus aspernatur sit eos.\n\nFugit rerum facilis fugiat repellat. Harum soluta iste omnis atque qui. Perspiciatis exercitationem facere ut voluptatem vero sunt. Nisi ut recusandae excepturi atque et voluptatem corrupti tempore.\n\nId maxime voluptatem facilis hic in. Ullam labore dolore eos sint hic eveniet perferendis voluptatem. Excepturi corrupti qui ipsum enim blanditiis nam aut.',NULL,'cool','2026-11-23 00:53:39','2026-11-26 17:16:34'),(5,4,'Molestias magnam dolore non vel.','Neque doloremque sed fuga vero in ipsam dicta. Quos impedit qui quo et architecto ut ut. Sed ipsa laborum sed odit enim hic eum. Optio quos aliquam voluptatem consequatur qui ut beatae quibusdam. Voluptas laborum magni non est.\n\nSaepe ut est culpa vitae. Laudantium ea magni vel consequatur dicta dolores aut et. Quas maiores pariatur officiis voluptas et ut dolores. Autem est numquam odit sed.\n\nAut ab nihil in ut labore. Earum qui rerum necessitatibus ea molestiae. Recusandae assumenda beatae labore animi qui et enim. Inventore facere eum maxime cupiditate id et.\n\nVoluptatibus rerum omnis et doloribus. Atque eum similique omnis tempora odio unde. Repellat molestiae beatae qui totam laborum tempore accusamus sequi. Commodi et quas quas ut accusantium praesentium dolorem.',NULL,'grayscale','2026-11-16 17:50:42','2026-11-26 17:16:34'),(6,5,'Ut officiis praesentium tempora alias et reiciendis et commodi.','Sint error voluptatibus ducimus et voluptate voluptas vitae hic. Magnam eum vero dolor quibusdam. Laborum deleniti et sed impedit earum aut quaerat occaecati. Nobis corrupti iure fugit enim.\n\nOdit quisquam facilis sit aut sit. Pariatur minus cum vero repellat. Tenetur aspernatur doloremque voluptates magnam libero tenetur cum.\n\nEsse eum nihil nulla optio velit. Cupiditate autem excepturi eos. Animi nesciunt tenetur in expedita quis nulla. Et dolore quia qui ut quia aspernatur minima.\n\nDucimus dolor qui optio aut rerum sunt. Hic laborum et dolorem exercitationem. Nobis voluptatem repellat quam reprehenderit hic ipsa aliquam natus.',NULL,'warm','2026-11-20 07:40:34','2026-11-26 17:16:34'),(7,5,'Neque at maiores sint cumque minus nisi culpa id.','Earum a nihil impedit dicta est quisquam. Est est consequatur vero. Id laborum illo quia minus. Excepturi voluptatem delectus quo sed nisi explicabo consectetur ut.\n\nLaborum velit quidem ea minima aliquid. Odio quibusdam impedit aperiam. Laborum doloribus non earum nobis.\n\nUt beatae sed ea saepe et autem iste. Aut autem quasi omnis repellat autem nobis provident. At voluptas repellendus quasi praesentium beatae exercitationem eos. Est cum rerum architecto rerum dolorem.\n\nAb possimus quis est voluptas ut. Dignissimos officia non autem reiciendis eum.',NULL,'cool','2026-11-11 19:44:48','2026-11-26 17:16:34'),(8,5,'Maiores deleniti tempora est repudiandae neque dolor.','Exercitationem recusandae eligendi voluptas est. Voluptatem deleniti commodi perspiciatis quaerat voluptatem quas nisi. Sequi labore enim necessitatibus aut rerum dolor beatae.\n\nCum numquam velit magnam quia similique. Ea tempora aut asperiores commodi iste et. Cumque sunt dolores aspernatur et molestiae. Ex velit quam voluptates doloremque et.\n\nQui quisquam non modi odio. Dolor ratione in expedita quia qui id quis. Blanditiis nihil distinctio laudantium eos et et.\n\nQuas ab itaque tenetur modi dolorum numquam quia. Ex ut sint aut alias. Voluptas dolore dolore inventore quas ut est nihil. Enim tempore omnis aperiam vero non.',NULL,'grayscale','2026-11-19 03:42:54','2026-11-26 17:16:34'),(9,3,'Molestiae consequatur quos pariatur nesciunt aut.','Est vel laudantium ipsam omnis corrupti dolore ut tempora. Qui quia aliquam fuga ut. Ex qui exercitationem illo quas ratione quia. Sequi delectus sequi similique ut illum impedit dolore.\n\nAutem sed odit quas assumenda. Et nam dolorem animi repellendus. Minima consectetur porro sunt praesentium nesciunt delectus consectetur occaecati. Totam et tempore distinctio.\n\nVoluptas ea ipsum culpa error aut. Quasi porro vitae consequatur laborum a sint sint.\n\nSint sit sunt ex voluptatem fugiat aut. Eligendi et voluptatem tempore commodi nostrum commodi commodi. Quidem non rerum reiciendis neque sunt. Praesentium dolorum itaque accusamus illum.',NULL,'none','2026-11-20 12:40:53','2026-11-26 17:16:34'),(10,4,'Eos ea sequi saepe voluptas sint dolores aliquid.','Adipisci consequuntur modi necessitatibus velit laboriosam optio. Architecto quia harum non cum eaque. Repellat cumque qui aperiam dolores amet.\n\nRerum nemo voluptate itaque vero. Error dolores ad non. Vel a saepe qui corrupti exercitationem.\n\nQuidem ut cumque fuga sed et provident. Porro repudiandae esse est saepe aut. Ut aspernatur qui omnis tenetur molestias blanditiis vel cumque.\n\nSint molestias sapiente sed sit suscipit consectetur quia. Quo in cupiditate voluptatem vel. In at necessitatibus quibusdam nesciunt culpa sequi. Earum cumque autem reiciendis error eveniet eaque.',NULL,'cool','2026-11-06 07:40:31','2026-11-26 17:16:34'),(11,5,'Autem voluptates et nam maxime dolorum velit quo.','Vel voluptatibus non culpa ex veritatis eos. Nemo et ut voluptatem. Non et perspiciatis aut quia non sapiente. Eligendi id recusandae excepturi magnam enim ducimus aut dolor.\n\nEnim error non ut quis nostrum ipsum minima est. Velit vel hic et. Beatae reiciendis itaque voluptates corrupti maxime. Autem repudiandae nisi et esse sint.\n\nEst magni placeat illo omnis est autem non. Omnis aliquid ullam porro commodi explicabo praesentium. Occaecati a quas dolor ipsa sed.\n\nDolores sit tenetur rerum veritatis adipisci. Et veritatis animi tempora aspernatur aut quae omnis. Magni sint est repudiandae deleniti quo a. Sunt quia autem voluptatem. Excepturi harum deleniti corrupti quibusdam.',NULL,'vivid','2026-11-26 10:04:06','2026-11-26 17:16:34'),(12,4,'Et velit dicta est magni.','Incidunt voluptatem dolore rem ex adipisci id blanditiis. Ut aut molestiae quasi veritatis sed odio. Et et facilis eius fuga molestiae veniam consequuntur. Dolorem et assumenda error corrupti illum ipsum dolores quia. Aliquam laboriosam eos tempore ea ea tenetur aliquid.\n\nEum nisi nesciunt sunt non in. Voluptates nesciunt odio et rerum facilis molestiae. Impedit sint quia expedita ex soluta ipsum est. Molestias atque eos exercitationem est autem ut. Omnis iusto et voluptas dolores commodi accusamus.\n\nVel rerum illo optio minus sunt ullam inventore facilis. Ea eum dolores nesciunt natus sunt soluta aut laborum. Perferendis quia fuga voluptatem nisi non. Neque maxime et consequatur enim modi dolore.\n\nUnde nihil saepe aut. In cupiditate tempore sunt perspiciatis. Expedita sit corporis incidunt omnis officiis corporis. Debitis aut possimus ut qui blanditiis sint nam voluptas.',NULL,'none','2026-11-11 09:24:03','2026-11-26 17:16:34'),(13,5,'Voluptas ipsum veniam molestiae sed officiis.','Veniam ut corrupti non dolorem. Animi soluta nemo corrupti sed. Id qui eos aliquam et quo.\n\nFuga consequatur rem dolores impedit qui odit asperiores. Saepe eius eveniet praesentium aut eos laboriosam dolorem. Mollitia eum dolor consequatur rem occaecati non magnam dolorem.\n\nTempora enim repellendus eveniet rerum ducimus. Voluptas illum quia minus eius tempora dolores explicabo. Sed repudiandae impedit repellat ut.\n\nHarum animi vel debitis enim molestiae labore velit debitis. Aut animi perspiciatis enim. Quod corrupti voluptatem itaque. Fuga quos velit aperiam dolores ut consectetur quia.',NULL,'none','2026-11-13 14:25:39','2026-11-26 17:16:34'),(14,5,'Porro inventore consequatur ullam et rerum deleniti corporis dignissimos.','Exercitationem ab voluptatibus aut rem. Quisquam ratione minus velit hic illo quae. Fugit iusto rerum sint tempora. Ipsam consequatur vel eaque quam incidunt.\n\nIn repudiandae ut voluptatem suscipit. Quasi fuga sed quo et distinctio voluptas corrupti. Qui repellendus vel in aspernatur vel non.\n\nPlaceat et sed id et qui voluptas non. Optio sunt et occaecati quas recusandae harum. Quo eius dolores ipsam totam qui accusamus voluptate perferendis. Dolorum et quaerat fuga nulla est laborum sit. Omnis modi quos ipsa eius et.\n\nQuos quas autem ut et ad maxime. Et aut iste maxime ut. Placeat quibusdam beatae aut molestiae sint est itaque reprehenderit. Libero enim facilis sunt odit.',NULL,'sepia','2026-11-13 14:03:51','2026-11-26 17:16:34'),(15,3,'Quaerat et reiciendis ipsum iure.','Reiciendis voluptatem qui possimus voluptate delectus. Pariatur voluptate delectus saepe reprehenderit voluptatibus nihil. Voluptatem voluptate nesciunt dignissimos hic molestias. A et est ullam exercitationem quibusdam aut. Ut ratione praesentium quia id.\n\nSuscipit aliquam et culpa fugit qui neque. Ea aliquid odit nihil. Praesentium tempora et non ut doloribus nemo. Veritatis enim cumque est blanditiis atque.\n\nIn voluptatem quia vitae ut veritatis sint ut. Distinctio autem voluptatem ut necessitatibus minus. Quis quis deleniti rerum.\n\nCumque tenetur aspernatur distinctio vitae dolor. Rerum odit tenetur aliquam quis ut accusamus expedita. Optio distinctio et dolorem ut hic sint eos. Maxime magnam sit numquam quis explicabo dolorem.',NULL,'vivid','2026-11-07 13:16:11','2026-11-26 17:16:34'),(16,4,'Aut qui vel et sunt.','Exercitationem velit magnam incidunt rerum beatae. Aut veniam consequatur sint et. Excepturi velit et rerum soluta nisi modi ducimus.\n\nAdipisci explicabo tempore voluptates non aut. Voluptatem ullam maxime nostrum ipsa vel dolores perferendis. Illum illum non sunt non. Nihil corporis soluta dolorum laborum rerum vel repellendus.\n\nRepellendus voluptatem aut repellat quia omnis consequatur. Ea doloribus qui ab ducimus ad ad.\n\nVoluptas sit error et corporis. Itaque eaque dolorum aut dolore totam veritatis ea facere. Impedit temporibus est dolor accusamus qui molestias eveniet velit. A consequatur aut aperiam molestias beatae fugit dolore. Atque vero officiis officiis et minima.',NULL,'none','2026-11-22 09:52:41','2026-11-26 17:16:34'),(17,2,'Qui maiores placeat aliquid dignissimos at porro aut.','Sint temporibus esse harum. Dolores velit laboriosam asperiores aut corrupti architecto. Delectus nihil quae id odit. Dolorum voluptatem nulla quibusdam fugiat beatae consequatur rem.\n\nA ratione mollitia magnam culpa. Aut non reiciendis non voluptates et. Voluptas voluptas est et omnis facere. Dolorum placeat sunt nesciunt nemo quo.\n\nNesciunt aut ut eveniet aut. Libero sint qui ut vel omnis et est. Autem repellat consequatur reprehenderit maiores molestias.\n\nAut quaerat dolor neque ut repellendus id nisi assumenda. Et assumenda animi consectetur molestiae ut veritatis earum. Quia recusandae enim at sint.',NULL,'none','2026-11-22 17:35:25','2026-11-26 17:16:34'),(18,1,'Magnam odit non voluptates incidunt.','Officiis et non in aliquam et quis est. Molestias voluptate ex numquam quod reprehenderit. Omnis nesciunt cupiditate est maxime. Ut velit ipsa explicabo sit.\n\nTotam voluptatem ut ut provident id. Est dolor sit molestias odio qui blanditiis eius aut. Non eligendi unde et eius deleniti et.\n\nExpedita ex officia itaque ad qui omnis. Sunt doloremque cumque quod qui. Et fuga officiis neque quia aut. Sit iste quae non velit.\n\nVel voluptate qui minima. Reprehenderit aut deserunt vel animi temporibus exercitationem veniam. Est omnis dolor explicabo ea harum voluptatem. Omnis quia vel tempora veniam.',NULL,'grayscale','2026-11-22 16:55:57','2026-11-26 17:16:34'),(19,3,'Odio quo at deleniti non.','Cumque sit quibusdam rerum non. Ipsum quod animi quidem sunt non velit est. Fugiat maiores qui officiis libero.\n\nDicta assumenda atque molestiae qui ullam possimus voluptatem. Sunt cum eum voluptas dolor inventore sit blanditiis. Est qui est vel dolor placeat et. Dolor mollitia repudiandae et.\n\nAd incidunt ab blanditiis dicta voluptatibus et. Expedita aperiam sed at omnis. Iusto rem eius corporis eos est. Aut molestiae iste magnam optio.\n\nIllo odit cum voluptatem blanditiis ea labore eveniet inventore. Autem aliquid laborum molestiae libero. Nihil amet est atque.',NULL,'sepia','2026-11-19 20:04:50','2026-11-26 17:16:34'),(20,3,'Voluptatem vel corporis fugit tempore.','Rerum excepturi corporis sit consequuntur. Molestias quod quibusdam temporibus quia. Laborum magni sit vel iure rerum repellat eligendi quas. Nulla aliquid tempore ut sequi aut fugit.\n\nEt architecto dolorem ut aut quibusdam consectetur praesentium. Animi laborum et dicta debitis sit id dolor. Et iure totam molestiae nostrum voluptatibus minima iste. Iusto sint quo voluptatem velit velit.\n\nId dignissimos est minima voluptas perferendis minima. Delectus corrupti officia placeat. Non molestias sunt praesentium vel ab.\n\nNeque quia dolor aut quia est illum. Accusamus et sit non deserunt aperiam minus et. Ipsa ex in magni id esse non.',NULL,'none','2026-11-19 02:14:45','2026-11-26 17:16:34'),(21,2,'Sunset at the beach','Golden hour at the beach with the sun going down over the water.','post_images/cL2PiWIVZhhkcWn74NBUG2pM6pZEGL0wQyTmQg0p.jpg','warm','2026-11-26 17:16:34','2026-11-26 17:16:34'),(22,2,'Mountain view','A clear day in the mountains with snow on the highest peak.','post_images/mOy8RMRloFlxDKXfdLaZpZdl1k8zVQnBESPLIpb3.jpg','none','2026-11-26 17:16:34','2026-11-26 17:16:34'),(23,1,'City lights','The city at night, taken from the top of a hill.','post_images/pai232UI4X4qlIagBBJCJqhACg9kK5HEHEgpVOjZ.jpg','vivid','2026-11-26 17:16:34','2026-11-26 17:16:34'),(24,1,'Forest lake','A quiet lake surrounded by pine trees.','post_images/onoQ8jkJjtNIfGsjQ4lX8CUH5qJlakM55LMW7BZ3.jpg','grayscale','2026-11-26 17:16:34','2026-11-26 17:16:34');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@example.com','2026-11-26 17:16:34','$2y$12$fEWEsdbBUqhhU0efHdFCh.5F2vvwT9QvV5ixRSCyI.7bwwJT9ipdO','admin','yD6JZDS35l','2026-11-26 17:16:34','2026-11-26 17:16:34',NULL),(2,'testuser','test@example.com','2026-11-26 17:16:34','$2y$12$blqjBnHc49NvLSUZBvrZUeOOn5z1vdDtvXy5GbZJJQ4xXBxdO7F5W','user','uvQzf7qJkl','2026-11-26 17:16:34','2026-11-26 17:16:34',NULL),(3,'keffertz','jace.fritsch@example.org','2026-11-26 17:16:34','$2y$12$blqjBnHc49NvLSUZBvrZUeOOn5z1vdDtvXy5GbZJJQ4xXBxdO7F5W','user','cMpjd65n5C','2026-11-26 17:16:34','2026-11-26 17:16:34',NULL),(4,'hector73','whand@example.net','2026-11-26 17:16:34','$2y$12$blqjBnHc49NvLSUZBvrZUeOOn5z1vdDtvXy5GbZJJQ4xXBxdO7F5W','user','IOY4ZG81DC','2026-11-26 17:16:34','2026-11-26 17:16:34',NULL),(5,'kari87','becker.magnolia@example.org','2026-11-26 17:16:34','$2y$12$blqjBnHc49NvLSUZBvrZUeOOn5z1vdDtvXy5GbZJJQ4xXBxdO7F5W','user','if6vbqUHLy','2026-11-26 17:16:34','2026-11-26 17:16:34',NULL),(6,'whand','blaise.ebert@example.org','2026-11-26 17:16:34','$2y$12$blqjBnHc49NvLSUZBvrZUeOOn5z1vdDtvXy5GbZJJQ4xXBxdO7F5W','user','YxBTzolIpr','2026-11-26 17:16:34','2026-11-26 17:16:34',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-27 13:16:36
