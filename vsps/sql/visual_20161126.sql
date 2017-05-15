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

 Date: 05/10/2017 18:17:04 PM
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
--  Records of `problem`
-- ----------------------------
BEGIN;
INSERT INTO `problem` VALUES ('45d1336a-a29c-4e07-a4dc-a8c871a03bd9', 'problem1', 'add two numbers', '[\n  {\n    \"name\": \"a\",\n    \"dtype\": \"number\",\n    \"description\": \"input a\"\n  },\n  {\n    \"name\": \"b\",\n    \"dtype\": \"number\",\n    \"description\": \"input b\"\n  }\n]', '{\n  \"name\": \"c\",\n  \"dtype\": \"number\",\n  \"description\": \"output c\"\n}', '1', 'JSON String', '[\n  {\n    \"inputs\": {\n      \"a\": 1,\n      \"b\": \"2\"\n    },\n    \"expect\": \"2\"\n  },\n  {\n    \"inputs\": {\n      \"a\": 1,\n      \"b\": \"2\"\n    },\n    \"expect\": \"2\"\n  }\n]'), ('8950ea30-91e9-4421-9b38-48268d30680b', 'problem1', 'add two numbers', '[\n  {\n    \"name\": \"a\",\n    \"dtype\": \"number\",\n    \"description\": \"input a\"\n  },\n  {\n    \"name\": \"b\",\n    \"dtype\": \"number\",\n    \"description\": \"input b\"\n  }\n]', '{\n  \"name\": \"c\",\n  \"dtype\": \"number\",\n  \"description\": \"output c\"\n}', '1', 'JSON String', '[\n  {\n    \"inputs\": {\n      \"a\": 1,\n      \"b\": \"2\"\n    },\n    \"expect\": \"2\"\n  },\n  {\n    \"inputs\": {\n      \"a\": 1,\n      \"b\": \"2\"\n    },\n    \"expect\": \"2\"\n  }\n]'), ('f495aac3-c1d9-428d-9f36-02f60109e1ef', 'p1', 'd', '[\n  {\n    \"name\": \"a\",\n    \"dtype\": \"number\",\n    \"description\": \"input a\"\n  },\n  {\n    \"name\": \"b\",\n    \"dtype\": \"number\",\n    \"description\": \"input b\"\n  }\n]', '{\n  \"name\": \"c\",\n  \"dtype\": \"number\",\n  \"description\": \"output c\"\n}', '2', 'JSON String', '[\n  {\n    \"inputs\": {\n      \"a\": 1,\n      \"b\": \"2\"\n    },\n    \"expect\": \"2\"\n  },\n  {\n    \"inputs\": {\n      \"a\": 1,\n      \"b\": \"2\"\n    },\n    \"expect\": \"2\"\n  }\n]'), ('f7683537-c8a4-4c66-9f97-396d7ca8e8af', 'problem1', 'add two numbers', '[\n  {\n    \"name\": \"a\",\n    \"dtype\": \"number\",\n    \"description\": \"input a\"\n  },\n  {\n    \"name\": \"b\",\n    \"dtype\": \"number\",\n    \"description\": \"input b\"\n  }\n]', '{\n  \"name\": \"c\",\n  \"dtype\": \"number\",\n  \"description\": \"output c\"\n}', '1', 'JSON String', '[\n  {\n    \"inputs\": {\n      \"a\": 1,\n      \"b\": \"2\"\n    },\n    \"expect\": \"2\"\n  },\n  {\n    \"inputs\": {\n      \"a\": 1,\n      \"b\": \"2\"\n    },\n    \"expect\": \"2\"\n  }\n]');
COMMIT;

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
--  Table structure for `solution`
-- ----------------------------
DROP TABLE IF EXISTS `solution`;
CREATE TABLE `solution` (
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

-- ----------------------------
--  Records of `solution`
-- ----------------------------
BEGIN;
INSERT INTO `solution` VALUES ('f495aac3-c1d9-428d-9f36-02f60109e1ef', 'test', '0', '0', 'JSON String');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(128) NOT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('test', 'psw', 'test', 'ROLE_USER'), ('test1', 'psw', 'email', 'ROLE_PUB');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
