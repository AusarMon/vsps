/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50711
 Source Host           : localhost
 Source Database       : visual

 Target Server Type    : MySQL
 Target Server Version : 50711
 File Encoding         : utf-8

 Date: 04/29/2017 20:33:04 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `problem`
-- ----------------------------
DROP TABLE IF EXISTS `problem`;
CREATE TABLE `problem` (
  `id` varchar(256) NOT NULL,
  `name` text CHARACTER SET utf8,
  `description` text CHARACTER SET utf32,
  `input` text CHARACTER SET utf8,
  `output` text CHARACTER SET utf8,
  `state` tinyint(4) DEFAULT NULL,
  `struct_info` text CHARACTER SET utf8,
  `test_cases` text CHARACTER SET utf8,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `program`
-- ----------------------------
DROP TABLE IF EXISTS `program`;
CREATE TABLE `program` (
  `program_id` varchar(256) NOT NULL,
  `username` varchar(64) DEFAULT NULL,
  `name` text NOT NULL,
  `struct_info` text CHARACTER SET utf8,
  `description` text CHARACTER SET utf8,
  PRIMARY KEY (`program_id`),
  KEY `username` (`username`),
  CONSTRAINT `program_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `program`
-- ----------------------------
BEGIN;
INSERT INTO `program` VALUES ('e2ef9c56-b0a8-4014-b167-6bbc82bede01', 'test', 'newName', 'newStruct', 'Hi'), ('p_id', 'test', 'test_p', '<test/>', '无'), ('p_id1', 'test', 'new name', 'new struct', '无');
COMMIT;

-- ----------------------------
--  Table structure for `publisher`
-- ----------------------------
DROP TABLE IF EXISTS `publisher`;
CREATE TABLE `publisher` (
  `publisher` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`publisher`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(128) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('test', 'psw', 'test'), ('test1', 'psw', 'email');
COMMIT;

-- ----------------------------
--  Table structure for `user_problem`
-- ----------------------------
DROP TABLE IF EXISTS `user_problem`;
CREATE TABLE `user_problem` (
  `problem_id` varchar(256) NOT NULL,
  `user_id` varchar(64) NOT NULL,
  `state` varchar(10) CHARACTER SET utf8 NOT NULL,
  `pass_rate` float DEFAULT NULL,
  `struct_info` text NOT NULL,
  KEY `p_id` (`problem_id`),
  KEY `u_id` (`user_id`),
  CONSTRAINT `p_id` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`id`),
  CONSTRAINT `u_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
