-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2022 at 03:46 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `sigup`
--

CREATE TABLE `sigup` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `user_name` varchar(10) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(128) NOT NULL,
  `referral_code` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sigup`
--

INSERT INTO `sigup` (`id`, `name`, `user_name`, `email`, `password`, `referral_code`) VALUES
(22, 'Kshitij Kumar Pandey', 'KSP7', 'kshitijkp02@gmail.com', '$2a$10$85PIY2hiyHSzIc2TjggPzuqHTjE2aikDzOXuGIzj2q4ZTpXY9OtTG', 'KSP7277701770'),
(23, 'Kshitij Kumar Pandey', 'KSP', 'deba@gmail.com', '$2a$10$D.I6/IiybhiBFTnwjSAkKOG8kgc8rrH1y.eP1it2OWz5ZgC/lwUFO', 'KSP2777260212');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sigup`
--
ALTER TABLE `sigup`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sigup`
--
ALTER TABLE `sigup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
