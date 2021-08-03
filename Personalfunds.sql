/*
Navicat MySQL Data Transfer

Source Server         : 101.37.18.151
Source Server Version : 50729
Source Host           : 101.37.18.151:3306
Source Database       : Personalfunds

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2021-08-03 18:21:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for administrator
-- ----------------------------
DROP TABLE IF EXISTS `administrator`;
CREATE TABLE `administrator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of administrator
-- ----------------------------
INSERT INTO `administrator` VALUES ('1', 'admin', '123', null);
INSERT INTO `administrator` VALUES ('2', 'admin2', '123', null);
INSERT INTO `administrator` VALUES ('3', 'admin3', '123', null);

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `publishtime` datetime DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '新闻一', '这是新闻一', '2020-09-15 00:00:00', '马云');
INSERT INTO `news` VALUES ('2', '新闻2', '这是新闻2', '2020-09-11 14:59:39', 'admin');
INSERT INTO `news` VALUES ('3', '新闻3', '这是新闻3', '2020-09-11 14:59:58', 'admin2');
INSERT INTO `news` VALUES ('4', '新闻4', '这是新闻4', '2020-09-11 15:00:20', 'admin');
INSERT INTO `news` VALUES ('5', '新闻5', '这是新闻5', '2020-09-11 15:00:44', 'admin2');
INSERT INTO `news` VALUES ('6', '新闻6', '这是新闻6', '2020-09-11 15:01:05', 'admin');
INSERT INTO `news` VALUES ('7', '新闻7', '这是新闻7', '2020-09-11 15:01:31', 'admin2');
INSERT INTO `news` VALUES ('8', '新闻6', '这是新闻6', '2020-09-11 00:00:00', 'admin');
INSERT INTO `news` VALUES ('9', '新闻9', '这是新闻9', '2020-09-11 00:00:00', 'admin2');

-- ----------------------------
-- Table structure for transaction
-- ----------------------------
DROP TABLE IF EXISTS `transaction`;
CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otherid` int(255) DEFAULT NULL,
  `money` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL COMMENT '0存款，1取款，2转账，3收款',
  `userid` int(11) NOT NULL,
  `balance` varchar(255) DEFAULT NULL COMMENT '余额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of transaction
-- ----------------------------
INSERT INTO `transaction` VALUES ('45', '2', '100', '2020-09-12 19:24:45', '2', '1', '9348');
INSERT INTO `transaction` VALUES ('46', '1', '100', '2020-09-12 19:24:45', '3', '2', '82030');
INSERT INTO `transaction` VALUES ('47', '3', '100', '2020-09-12 19:24:51', '2', '1', '9248');
INSERT INTO `transaction` VALUES ('48', '1', '100', '2020-09-12 19:24:51', '3', '3', '78010');
INSERT INTO `transaction` VALUES ('49', '10', '100', '2020-09-12 19:25:26', '2', '1', '9148');
INSERT INTO `transaction` VALUES ('50', '1', '100', '2020-09-12 19:25:26', '3', '10', '655');
INSERT INTO `transaction` VALUES ('51', null, '1000', '2020-09-12 19:25:37', '0', '1', '10148');
INSERT INTO `transaction` VALUES ('52', null, '50', '2020-09-12 19:25:41', '1', '1', '10098');
INSERT INTO `transaction` VALUES ('53', '1', '100', '2020-09-12 19:27:40', '2', '2', '81930');
INSERT INTO `transaction` VALUES ('54', '2', '100', '2020-09-12 19:27:40', '3', '1', '10198');
INSERT INTO `transaction` VALUES ('55', null, '500', '2020-09-12 19:28:03', '0', '1', '10698');
INSERT INTO `transaction` VALUES ('56', '2', '100', '2020-09-12 19:28:11', '2', '1', '10598');
INSERT INTO `transaction` VALUES ('57', '1', '100', '2020-09-12 19:28:11', '3', '2', '82030');
INSERT INTO `transaction` VALUES ('58', null, '100', '2020-09-12 19:28:31', '0', '2', '82130');
INSERT INTO `transaction` VALUES ('59', '1', '200', '2020-09-12 19:28:42', '2', '2', '81930');
INSERT INTO `transaction` VALUES ('60', '2', '200', '2020-09-12 19:28:42', '3', '1', '10798');
INSERT INTO `transaction` VALUES ('61', '2', '10000', '2020-09-15 19:42:35', '2', '1', '798');
INSERT INTO `transaction` VALUES ('62', '1', '10000', '2020-09-15 19:42:35', '3', '2', '91930');
INSERT INTO `transaction` VALUES ('63', null, '500000', '2020-09-15 19:43:12', '0', '1', '500798');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `money` double(11,0) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'zhangsan', '123', '123123@qq.com', '500798', '15651787526', '0');
INSERT INTO `user` VALUES ('2', 'lisi', '123', 'lisi@qq.com', '91930', '15651787524', '0');
INSERT INTO `user` VALUES ('3', 'wangwu', '123', 'wangwu@qq.com', '78010', '15651787522', '0');
INSERT INTO `user` VALUES ('4', 'zhaoliu', '123', 'zhaoliu@qq.com', '123482', '15651787523', '1');
INSERT INTO `user` VALUES ('5', 'shengqi', '123', 'shengqi@qq.com', '78878', '15651787521', '1');
INSERT INTO `user` VALUES ('6', 'liuba', '123', '193265264@qq.com', '12131', '15651787525', '1');
INSERT INTO `user` VALUES ('7', 'longjiu', '123', '3215181658@qq.com', '99999', '18251629898', '1');
INSERT INTO `user` VALUES ('10', 'test', '123', '123@qq.com', '655', '15554552990', '0');
INSERT INTO `user` VALUES ('11', 'test1', '123', '123@qq.com', '123', '15651787878', '0');
