DROP TABLE IF EXISTS CurrentLocation;
DROP TABLE IF EXISTS FavouriteLocation;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
    UserId INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Age INT NOT NULL
);

CREATE TABLE CurrentLocation (
    UserId INT,
    Location VARCHAR(100) NOT NULL,
    PRIMARY KEY (UserId, Location),
    FOREIGN KEY (UserId) REFERENCES User(UserId) ON DELETE CASCADE
);


CREATE TABLE FavouriteLocation (
    UserId INT,
    FavouriteLocation VARCHAR(100) NOT NULL,
    PRIMARY KEY (UserId, FavouriteLocation),
    FOREIGN KEY (UserId) REFERENCES User(UserId) ON DELETE CASCADE
);


INSERT INTO User (UserId, Username, Password, Email, Age)
VALUES 
    (1, 'John Doe', 'password123', 'john.doe@gmail.com', 33),
    (2, 'Mike Wazowski', 'securepass', 'mike.wazowski@gmail.com', 64),
    (3, 'Sarah Lynn', 'sarah2024', 'sarah.lynn@gmail.com', 27),
    (4, 'Jodie Landon', 'jodiesecure', 'jodie.landon@gmail.com', 19);


INSERT INTO CurrentLocation (UserId, Location)
VALUES 
    (1, 'Vancouver'),
    (2, 'Melbourne'),
    (3, 'Montreal'),
    (4, 'Florida');


INSERT INTO FavouriteLocation (UserId, FavouriteLocation)
VALUES 
    (1, 'Miami'),
    (1, 'San Francisco'),
    (2, 'New York'),
    (2, 'Boston'),
    (3, 'Seattle'),
    (3, 'Denver'),
    (4, 'San Diego'),
    (4, 'Las Vegas');