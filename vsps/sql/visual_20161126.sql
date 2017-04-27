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

 Date: 04/27/2017 10:16:27 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

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
INSERT INTO `program` VALUES ('e2ef9c56-b0a8-4014-b167-6bbc82bede01', 'test', 'newName', 'newStruct', '无'), ('p_id', 'test', 'test_p', '<test/>', '无'), ('p_id1', 'test', 'new name', 'new struct', '无');
COMMIT;

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

SET FOREIGN_KEY_CHECKS = 1;
