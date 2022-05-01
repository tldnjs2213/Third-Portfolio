-- -------------------------------------------------------------
-- TablePlus 4.6.0(406)
--
-- https://tableplus.com/
--
-- Database: coffee
-- Generation Time: 2022-03-23 20:11:46.1060
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '카테고리 이름',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `foods`;
CREATE TABLE `foods` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '상품명',
  `price` int(11) NOT NULL COMMENT '가격',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '이미지 경로',
  `category_id` bigint(20) unsigned NOT NULL COMMENT '카테고리 ID',
  `is_big` tinyint(1) NOT NULL DEFAULT 0 COMMENT '큰 사이즈 여부',
  `is_new` tinyint(1) NOT NULL DEFAULT 0 COMMENT '신상 여부',
  `is_fav` tinyint(1) NOT NULL DEFAULT 0 COMMENT '추천 여부',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `foods_category_id_foreign` (`category_id`),
  CONSTRAINT `foods_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `options`;
CREATE TABLE `options` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) unsigned NOT NULL COMMENT '카테고리 ID',
  `type` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '옵션 구분',
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '옵션 명',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '이미지 경로',
  `price` int(11) NOT NULL COMMENT '가격',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `options_category_id_foreign` (`category_id`),
  CONSTRAINT `options_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `food_id` bigint(20) unsigned NOT NULL COMMENT '음식 연결',
  `order_id` bigint(20) unsigned NOT NULL COMMENT '주문 연결',
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' COMMENT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_food_id_foreign` (`food_id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  CONSTRAINT `order_items_food_id_foreign` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL COMMENT '유저 연결',
  `price` int(11) NOT NULL DEFAULT 0 COMMENT '총 가격',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '연락처',
  `point` int(11) NOT NULL DEFAULT 0 COMMENT '포인트',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_phone_unique` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, '신메뉴', '2022-03-20 00:27:02', '2022-03-20 00:27:02'),
(2, '커피', '2022-03-20 00:27:02', '2022-03-20 00:27:02'),
(3, '음료', '2022-03-20 00:27:08', '2022-03-20 00:27:08'),
(4, '푸드', '2022-03-20 00:27:11', '2022-03-20 00:27:11'),
(5, '아이스크림', '2022-03-20 00:27:13', '2022-03-20 00:27:13');

INSERT INTO `foods` (`id`, `name`, `price`, `image`, `category_id`, `is_big`, `is_new`, `is_fav`, `created_at`, `updated_at`) VALUES
(1, '아메리카노', 4700, 'coffee/americano.jpg', 2, 0, 0, 0, '2022-03-20 00:27:02', '2022-03-20 00:27:02'),
(2, '카페라떼', 5700, 'coffee/cafe_latte.jpg', 2, 1, 0, 1, '2022-03-20 00:27:02', '2022-03-20 00:27:02'),
(3, '카푸치노', 5700, 'coffee/cappuccino.jpg', 2, 1, 0, 0, '2022-03-20 00:27:03', '2022-03-20 00:27:03'),
(4, '초콜릿 에스프레소 콘 파나', 4900, 'coffee/chocolate_espress_con_panna.png', 2, 0, 1, 0, '2022-03-20 00:27:03', '2022-03-20 00:27:03'),
(5, '시나몬 에스프레소 콘 파나', 4900, 'coffee/cinnamon_espresso_con_panna.png', 2, 0, 1, 0, '2022-03-20 00:27:03', '2022-03-20 00:27:03'),
(6, '콜드 브루', 4900, 'coffee/cold_brew.jpg', 2, 1, 0, 1, '2022-03-20 00:27:03', '2022-03-20 00:27:03'),
(7, '콜드브루 라떼', 5700, 'coffee/cold_brew_latte.jpg', 2, 1, 0, 0, '2022-03-20 00:27:03', '2022-03-20 00:27:03'),
(8, '에스프레소', 4400, 'coffee/espresso.jpg', 2, 0, 1, 0, '2022-03-20 00:27:04', '2022-03-20 00:27:04'),
(9, '허니 에스프레소 콘 파나', 4900, 'coffee/honey_espress_con_panna.png', 2, 1, 1, 0, '2022-03-20 00:27:04', '2022-03-20 00:27:04'),
(10, '아이스크림 카페 라떼', 7000, 'coffee/icecream_cafe_latte.jpg', 2, 1, 0, 1, '2022-03-20 00:27:04', '2022-03-20 00:27:04'),
(11, '아이스 제주 말차 카페 라떼', 7000, 'coffee/iced_jeju_malcha_cafe_latte.png', 2, 1, 0, 1, '2022-03-20 00:27:04', '2022-03-20 00:27:04'),
(12, '제주 말차 카페 라뗴', 7000, 'coffee/jeju_malcha_cafe_latte.png', 2, 1, 0, 1, '2022-03-20 00:27:04', '2022-03-20 00:27:04'),
(13, '룽고', 4900, 'coffee/lungo.jpg', 2, 1, 0, 1, '2022-03-20 00:27:04', '2022-03-20 00:27:04'),
(14, '마키아토', 6200, 'coffee/machiato.jpg', 2, 1, 0, 0, '2022-03-20 00:27:04', '2022-03-20 00:27:04'),
(15, '리스트레토', 4400, 'coffee/ristretto.jpg', 2, 0, 0, 0, '2022-03-20 00:27:04', '2022-03-20 00:27:04'),
(16, '흑임자 라떼', 6000, 'drink/black_sesame_latte.jpg', 3, 0, 0, 0, '2022-03-20 00:27:08', '2022-03-20 00:27:08'),
(17, '아이스 제주 말차 라떼', 6000, 'drink/ice_jeju_malcha_latte.png', 3, 1, 0, 0, '2022-03-20 00:27:08', '2022-03-20 00:27:08'),
(18, '아이스 오트 쑥 라떼', 6000, 'drink/iced_oat_mugwort_latte.png', 3, 1, 1, 0, '2022-03-20 00:27:08', '2022-03-20 00:27:08'),
(19, '제주 한라봉 에이드', 6600, 'drink/jeju_hallabong_ade.jpg', 3, 0, 0, 1, '2022-03-20 00:27:09', '2022-03-20 00:27:09'),
(20, '제주말차 초콜릿 라떼', 6500, 'drink/jeju_malcha_chocolate_latte.png', 3, 1, 0, 0, '2022-03-20 00:27:09', '2022-03-20 00:27:09'),
(21, '제주 말차 프라페', 6000, 'drink/jeju_malcha_frappe.png', 3, 0, 0, 1, '2022-03-20 00:27:09', '2022-03-20 00:27:09'),
(22, '라떼 프라페', 7000, 'drink/latte_frappe.png', 3, 0, 0, 1, '2022-03-20 00:27:09', '2022-03-20 00:27:09'),
(23, '망고 바나나 프라페', 7000, 'drink/mango_banana_frappe.png', 3, 0, 0, 0, '2022-03-20 00:27:09', '2022-03-20 00:27:09'),
(24, '모카 프라페', 7000, 'drink/mocha_frappe.png', 3, 0, 0, 0, '2022-03-20 00:27:09', '2022-03-20 00:27:09'),
(25, '모히토 에이드', 6600, 'drink/mojito_ade.png', 3, 0, 0, 1, '2022-03-20 00:27:09', '2022-03-20 00:27:09'),
(26, '오트 쑥 라떼', 6000, 'drink/oat_mugwort_latte.png', 3, 0, 1, 0, '2022-03-20 00:27:10', '2022-03-20 00:27:10'),
(27, '플레인 요거트', 5500, 'drink/plain_yogurt.jpg', 3, 0, 0, 0, '2022-03-20 00:27:10', '2022-03-20 00:27:10'),
(28, '스트로베리 요거트', 5500, 'drink/strawberry_yogurt.jpg', 3, 0, 0, 0, '2022-03-20 00:27:10', '2022-03-20 00:27:10'),
(29, '블루베리베이글', 3300, 'food/blueberry_bagel.png', 4, 0, 0, 0, '2022-03-20 00:27:11', '2022-03-20 00:27:11'),
(30, '당근 케이크', 7000, 'food/carrot_cake.png', 4, 0, 1, 0, '2022-03-20 00:27:11', '2022-03-20 00:27:11'),
(31, '초콜릿크림빵', 3500, 'food/chocolate_cream_bread.png', 4, 0, 0, 1, '2022-03-20 00:27:11', '2022-03-20 00:27:11'),
(32, '초콜릿 호두 쿠키', 2900, 'food/chocolate_walnut_cookie.png', 4, 0, 0, 1, '2022-03-20 00:27:11', '2022-03-20 00:27:11'),
(33, '에그 베이컨 토스트', 5300, 'food/egg_bacon_toast.png', 4, 0, 1, 0, '2022-03-20 00:27:12', '2022-03-20 00:27:12'),
(34, '나타 애플', 2800, 'food/nata_apple.png', 4, 0, 0, 0, '2022-03-20 00:27:12', '2022-03-20 00:27:12'),
(35, '나타 믹스베리', 2800, 'food/nata_mixed_berries.png', 4, 0, 0, 0, '2022-03-20 00:27:12', '2022-03-20 00:27:12'),
(36, '나타 오리지널', 2800, 'food/nata_original.png', 4, 0, 0, 1, '2022-03-20 00:27:12', '2022-03-20 00:27:12'),
(37, '플레인베이글', 3300, 'food/plain_bagel.png', 4, 0, 0, 0, '2022-03-20 00:27:12', '2022-03-20 00:27:12'),
(38, '폴 바셋 단팥빵', 3300, 'food/red_bean_bread.png', 4, 0, 1, 0, '2022-03-20 00:27:12', '2022-03-20 00:27:12'),
(39, '스모어 쿠키', 2900, 'food/s_more_cookie.png', 4, 0, 0, 1, '2022-03-20 00:27:13', '2022-03-20 00:27:13'),
(40, '제주말차 아이스크림 (콘)', 4500, 'icecream/jeju_malcha_ice-cream(cone).png', 5, 0, 1, 0, '2022-03-20 00:27:13', '2022-03-20 00:27:13'),
(41, '제주말차 아이스크림 (컵)', 4500, 'icecream/jeju_malcha_ice-cream(cup).png', 5, 0, 1, 0, '2022-03-20 00:27:13', '2022-03-20 00:27:13'),
(42, '밀크 아이스크림 (콘)', 4000, 'icecream/milk_ice-cream(cone).jpg', 5, 0, 0, 1, '2022-03-20 00:27:13', '2022-03-20 00:27:13'),
(43, '밀크 아이스크림 (컵)', 4000, 'icecream/milk_ice-cream(cup).jpg', 5, 0, 0, 1, '2022-03-20 00:27:13', '2022-03-20 00:27:13'),
(44, '밀크 소프트 아포카토', 5000, 'icecream/milk_soft_affogato.jpg', 5, 0, 0, 0, '2022-03-20 00:27:13', '2022-03-20 00:27:13');

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(43, '2014_10_12_000000_create_users_table', 1),
(44, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(45, '2022_03_13_234117_create_categories_table', 1),
(46, '2022_03_14_141552_create_food_table', 1),
(47, '2022_03_14_142000_create_options_table', 1),
(48, '2022_03_14_144401_create_orders_table', 1),
(49, '2022_03_14_144810_create_order_items_table', 1);

INSERT INTO `options` (`id`, `category_id`, `type`, `name`, `image`, `price`, `created_at`, `updated_at`) VALUES
(1, 2, 'ice', '많게', NULL, 0, '2022-03-20 00:27:05', '2022-03-20 00:27:05'),
(2, 2, 'ice', '적게', NULL, 0, '2022-03-20 00:27:05', '2022-03-20 00:27:05'),
(3, 2, 'ice', 'X', NULL, 0, '2022-03-20 00:27:05', '2022-03-20 00:27:05'),
(4, 2, 'short', '기본', NULL, 0, '2022-03-20 00:27:06', '2022-03-20 00:27:06'),
(5, 2, 'short', '1샷', NULL, 1000, '2022-03-20 00:27:06', '2022-03-20 00:27:06'),
(6, 2, 'short', '2샷', NULL, 2000, '2022-03-20 00:27:07', '2022-03-20 00:27:07'),
(7, 2, 'size', '스텐다드', NULL, 0, '2022-03-20 00:27:07', '2022-03-20 00:27:07'),
(8, 2, 'size', '그랜드', NULL, 600, '2022-03-20 00:27:07', '2022-03-20 00:27:07'),
(9, 2, 'sugar', '보통', NULL, 0, '2022-03-20 00:27:07', '2022-03-20 00:27:07'),
(10, 2, 'sugar', '덜달게', NULL, 0, '2022-03-20 00:27:08', '2022-03-20 00:27:08'),
(11, 2, 'sugar', '더달게', NULL, 0, '2022-03-20 00:27:08', '2022-03-20 00:27:08'),
(12, 2, 'cup', '일회용', NULL, 0, '2022-03-20 00:27:08', '2022-03-20 00:27:08'),
(13, 2, 'cup', '머그컵', NULL, 0, '2022-03-20 00:27:08', '2022-03-20 00:27:08'),
(14, 3, 'ice', '많게', NULL, 0, '2022-03-20 00:27:10', '2022-03-20 00:27:10'),
(15, 3, 'ice', '적게', NULL, 0, '2022-03-20 00:27:10', '2022-03-20 00:27:10'),
(16, 3, 'ice', 'X', NULL, 0, '2022-03-20 00:27:10', '2022-03-20 00:27:10'),
(17, 3, 'cup', '일회용', NULL, 0, '2022-03-20 00:27:10', '2022-03-20 00:27:10'),
(18, 3, 'cup', '머그컵', NULL, 0, '2022-03-20 00:27:11', '2022-03-20 00:27:11'),
(19, 3, 'choco', '초코크림', NULL, 500, '2022-03-20 00:27:11', '2022-03-20 00:27:11'),
(20, 3, 'choco', '화이트크림', NULL, 500, '2022-03-20 00:27:11', '2022-03-20 00:27:11');

INSERT INTO `users` (`id`, `name`, `phone`, `point`, `created_at`, `updated_at`) VALUES
(1, '전광수', '01077777777', 25772, '2022-03-20 00:26:59', '2022-03-20 00:26:59'),
(2, '변은주', '01040827242', 44761, '2022-03-20 00:26:59', '2022-03-20 00:26:59'),
(3, '김소연', '01034585817', 959, '2022-03-20 00:26:59', '2022-03-20 00:26:59'),
(4, '노영길', '01037700811', 6282, '2022-03-20 00:27:00', '2022-03-20 00:27:00'),
(5, '조은애', '01092474381', 16783, '2022-03-20 00:27:00', '2022-03-20 00:27:00'),
(6, '임대선', '01017585971', 28490, '2022-03-20 00:27:00', '2022-03-20 00:27:00'),
(7, '임동현', '01037126783', 16416, '2022-03-20 00:27:00', '2022-03-20 00:27:00'),
(8, '도도연', '01080188042', 25014, '2022-03-20 00:27:00', '2022-03-20 00:27:00'),
(9, '기진호', '01035029968', 48529, '2022-03-20 00:27:00', '2022-03-20 00:27:00'),
(10, '장수란', '01001432661', 41351, '2022-03-20 00:27:00', '2022-03-20 00:27:00'),
(11, '원건우', '01045757139', 6221, '2022-03-20 00:27:00', '2022-03-20 00:27:00'),
(12, '박예지', '01065389513', 5262, '2022-03-20 00:27:01', '2022-03-20 00:27:01'),
(13, '석성수', '01065053969', 41117, '2022-03-20 00:27:01', '2022-03-20 00:27:01'),
(14, '함여진', '01095657869', 28734, '2022-03-20 00:27:01', '2022-03-20 00:27:01'),
(15, '염진수', '01029187152', 2521, '2022-03-20 00:27:01', '2022-03-20 00:27:01'),
(16, '천원진', '01062333207', 29460, '2022-03-20 00:27:01', '2022-03-20 00:27:01'),
(17, '조지후', '01009007430', 7233, '2022-03-20 00:27:01', '2022-03-20 00:27:01'),
(18, '유정화', '01018478534', 5443, '2022-03-20 00:27:01', '2022-03-20 00:27:01'),
(19, '채효진', '01098003792', 23335, '2022-03-20 00:27:01', '2022-03-20 00:27:01'),
(20, '전나형', '01039038532', 26183, '2022-03-20 00:27:02', '2022-03-20 00:27:02');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;