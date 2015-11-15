CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `default_speed` mediumint(9) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
);

CREATE TABLE `exercices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `started` datetime NOT NULL,
  `participant_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `pace` tinyint(4) NOT NULL,
  `comment` mediumtext NOT NULL,
  `ip` varchar(20) NOT NULL,
  `distance` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_id` (`event_id`),
  KEY `idx_participant_id_event_id` (`participant_id`,`event_id`)
);

CREATE TABLE `participants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
