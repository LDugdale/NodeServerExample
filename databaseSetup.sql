CREATE DATABASE IF NOT EXISTS planted;

CREATE TABLE IF NOT EXISTS users (
	userId INT NOT NULL AUTO_INCREMENT,
	username varchar(500) NOT NULL,
	email varchar(500) NOT NULL,
	password varchar(500) NOT NULL,
	PRIMARY KEY (userId)
);

CREATE TABLE IF NOT EXISTS plants (
  plantId INT NOT NULL AUTO_INCREMENT,
  latinName varchar(500) NOT NULL,
  genus varchar(500) NOT NULL,
  PRIMARY KEY (plantId)
);

CREATE TABLE IF NOT EXISTS plantNames (
  plantNameId INT NOT NULL AUTO_INCREMENT,
  plantId INT NOT NULL,
  name varchar(500) NOT NULL,
  nameType varchar(50) NOT NULL,
  PRIMARY KEY (plantNameId),
  FOREIGN KEY (plantId) REFERENCES plants(plantId)
);

CREATE TABLE IF NOT EXISTS plantInformation (
  plantInformationId INT NOT NULL AUTO_INCREMENT,
  plantId INT NOT NULL,
  information varchar(5000) NOT NULL,
  value varchar(5000) NOT NULL,
  PRIMARY KEY (plantInformationId),
  FOREIGN KEY (plantId) REFERENCES plants(plantId)
);

CREATE TABLE IF NOT EXISTS usersPlants (
  usersPlantsId INT NOT NULL AUTO_INCREMENT,
  plantId INT NOT NULL,
  userId INT NOT NULL,
  nickname VARCHAR(500) NOT NULL,
  PRIMARY KEY (usersPlantsId),
  FOREIGN KEY (plantId) REFERENCES plants(plantId),
  FOREIGN KEY (userId) REFERENCES users(userId)
);


