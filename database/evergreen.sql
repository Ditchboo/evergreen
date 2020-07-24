-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 24, 2020 at 01:48 PM
-- Server version: 5.5.65-MariaDB
-- PHP Version: 7.3.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `evergreen`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--

CREATE TABLE `Customer` (
  `Id` int(11) NOT NULL,
  `FirstName` varchar(200) NOT NULL,
  `LastName` varchar(200) NOT NULL,
  `EmailAddress` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `FulfillmentHandler`
--

CREATE TABLE `FulfillmentHandler` (
  `Id` int(11) NOT NULL,
  `Code` varchar(50) NOT NULL,
  `Description` varchar(4000) NOT NULL,
  `Component` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `FulfillmentHandler`
--

INSERT INTO `FulfillmentHandler` (`Id`, `Code`, `Description`, `Component`) VALUES
(1, 'COLLECT', 'Collection handler', 'CollectionComponent');

-- --------------------------------------------------------

--
-- Table structure for table `OrderLine`
--

CREATE TABLE `OrderLine` (
  `Id` int(11) NOT NULL,
  `PurchaseOrderId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `OrderStatus`
--

CREATE TABLE `OrderStatus` (
  `Id` int(11) NOT NULL,
  `Code` varchar(40) NOT NULL,
  `Title` varchar(200) NOT NULL,
  `Description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `OrderStatus`
--

INSERT INTO `OrderStatus` (`Id`, `Code`, `Title`, `Description`) VALUES
(1, 'PAYMENT_PENDING', 'Pending Payment', 'Awaiting a payment for this order'),
(2, 'AWAITING_COLLECT', 'Awaiting collection', 'This order is awaiting collection'),
(3, 'COLLECTED', 'Collected', 'This order has been collected');

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `Id` int(11) NOT NULL,
  `SupplierId` int(11) NOT NULL,
  `ProductCategoryId` int(11) NOT NULL,
  `Title` varchar(600) NOT NULL,
  `Description` varchar(4000) NOT NULL,
  `Cost` int(11) NOT NULL,
  `IsAvailable` bit(1) NOT NULL DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`Id`, `SupplierId`, `ProductCategoryId`, `Title`, `Description`, `Cost`, `IsAvailable`) VALUES
(1, 1, 2, 'Drill', 'This is a drill.', 2100, b'1'),
(2, 2, 2, 'Spade', 'For digging', 1200, b'1'),
(3, 1, 3, '30m garden hose', 'A garden hose', 2190, b'1'),
(4, 3, 3, 'Water Butt 250L', 'A 250L water butt', 4999, b'1'),
(5, 1, 3, 'Multipurpose tap connector', 'It\'s a thing', 350, b'1'),
(6, 4, 2, 'Digging fork', 'For doing a dig', 2999, b'1'),
(7, 4, 2, 'Border spade', 'For doing the borders', 2999, b'1'),
(8, 4, 2, 'Long handled hoe', 'It\'s a 3 metre hoe', 1899, b'1'),
(9, 5, 1, 'Weedkiller 150ml', 'For killing the weeds', 999, b'1'),
(10, 5, 1, 'Wooden rat trap', 'To remove rats heads, humanely.', 299, b'1'),
(11, 5, 1, 'Slug pellets', 'To keep the slugs at bay', 499, b'1'),
(12, 3, 2, 'Bamboo canes', '6ft bamboo canes', 300, b'1'),
(13, 1, 2, 'Test', 'test', 1000, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `ProductCategory`
--

CREATE TABLE `ProductCategory` (
  `Id` int(11) NOT NULL,
  `Title` varchar(300) NOT NULL,
  `Description` varchar(2000) NOT NULL,
  `ImageUrl` varchar(4000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ProductCategory`
--

INSERT INTO `ProductCategory` (`Id`, `Title`, `Description`, `ImageUrl`) VALUES
(1, 'Pest control', 'Things to kill the things that eat your things', 'https://evergreenfiles.blob.core.windows.net/store/snail.svg'),
(2, 'Tools', 'Tools to help you tool the garden', 'https://evergreenfiles.blob.core.windows.net/store/garden-tools.svg'),
(3, 'Watering', 'Things to help you water the garden', 'https://evergreenfiles.blob.core.windows.net/store/watering-can.svg');

-- --------------------------------------------------------

--
-- Table structure for table `PurchaseOrder`
--

CREATE TABLE `PurchaseOrder` (
  `Id` int(11) NOT NULL,
  `CustomerId` int(11) NOT NULL,
  `OrderStatusId` int(11) NOT NULL DEFAULT '2',
  `FulfillmentHandlerId` int(11) DEFAULT NULL,
  `DateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateUpdated` timestamp NULL DEFAULT NULL,
  `PreferredCollectionSlot` datetime NOT NULL,
  `PaymentReference` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Supplier`
--

CREATE TABLE `Supplier` (
  `Id` int(11) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Telephone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Supplier`
--

INSERT INTO `Supplier` (`Id`, `Name`, `Telephone`) VALUES
(1, 'Kingfisher', '08721 212132'),
(2, 'Claber', '01999 12341'),
(3, 'Ward', '01888 12345'),
(4, 'Kent and Stowe', '01442 321234'),
(5, 'Roundup', '01433 223321'),
(6, 'Rentokill', '01609 794212');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `FulfillmentHandler`
--
ALTER TABLE `FulfillmentHandler`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `OrderLine`
--
ALTER TABLE `OrderLine`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_OrderLine_PurchaseOrder` (`PurchaseOrderId`),
  ADD KEY `FK_OrderLine_Product` (`ProductId`);

--
-- Indexes for table `OrderStatus`
--
ALTER TABLE `OrderStatus`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_Product_Supplier` (`SupplierId`),
  ADD KEY `FK_Product_ProductCategory` (`ProductCategoryId`);

--
-- Indexes for table `ProductCategory`
--
ALTER TABLE `ProductCategory`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `PurchaseOrder`
--
ALTER TABLE `PurchaseOrder`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_PurchaseOrderCustomer` (`CustomerId`),
  ADD KEY `FK_PurchaseOrder_OrderStatus` (`OrderStatusId`),
  ADD KEY `FK_PurchaseOrder_FulfillmentHandler` (`FulfillmentHandlerId`);

--
-- Indexes for table `Supplier`
--
ALTER TABLE `Supplier`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Customer`
--
ALTER TABLE `Customer`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `FulfillmentHandler`
--
ALTER TABLE `FulfillmentHandler`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `OrderLine`
--
ALTER TABLE `OrderLine`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `OrderStatus`
--
ALTER TABLE `OrderStatus`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `ProductCategory`
--
ALTER TABLE `ProductCategory`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `PurchaseOrder`
--
ALTER TABLE `PurchaseOrder`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Supplier`
--
ALTER TABLE `Supplier`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `OrderLine`
--
ALTER TABLE `OrderLine`
  ADD CONSTRAINT `FK_OrderLine_Product` FOREIGN KEY (`ProductId`) REFERENCES `Product` (`Id`),
  ADD CONSTRAINT `FK_OrderLine_PurchaseOrder` FOREIGN KEY (`PurchaseOrderId`) REFERENCES `PurchaseOrder` (`Id`);

--
-- Constraints for table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `FK_Product_ProductCategory` FOREIGN KEY (`ProductCategoryId`) REFERENCES `ProductCategory` (`Id`),
  ADD CONSTRAINT `FK_Product_Supplier` FOREIGN KEY (`SupplierId`) REFERENCES `Supplier` (`Id`);

--
-- Constraints for table `PurchaseOrder`
--
ALTER TABLE `PurchaseOrder`
  ADD CONSTRAINT `FK_PurchaseOrderCustomer` FOREIGN KEY (`CustomerId`) REFERENCES `Customer` (`Id`),
  ADD CONSTRAINT `FK_PurchaseOrder_FulfillmentHandler` FOREIGN KEY (`FulfillmentHandlerId`) REFERENCES `FulfillmentHandler` (`Id`),
  ADD CONSTRAINT `FK_PurchaseOrder_OrderStatus` FOREIGN KEY (`OrderStatusId`) REFERENCES `OrderStatus` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
