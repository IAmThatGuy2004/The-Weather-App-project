USE Users;
GO

-- Create [User] table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'User' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE [User] (
        UserId INT PRIMARY KEY IDENTITY(1,1),
        Username VARCHAR(50) NOT NULL,
        [Password] VARCHAR(50) NOT NULL,
        Email VARCHAR(100) UNIQUE NOT NULL,
        Age INT NOT NULL
    );
END
GO

-- Create CurrentLocation table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CurrentLocation' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE CurrentLocation (
        UserId INT NOT NULL,
        Location VARCHAR(100) NOT NULL,
        PRIMARY KEY (UserId, Location),
        FOREIGN KEY (UserId) REFERENCES [User](UserId) ON DELETE CASCADE
    );
END
GO

-- Create FavouriteLocation table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'FavouriteLocation' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE FavouriteLocation (
        UserId INT NOT NULL,
        FavouriteLocation VARCHAR(100) NOT NULL,
        PRIMARY KEY (UserId, FavouriteLocation),
        FOREIGN KEY (UserId) REFERENCES [User](UserId) ON DELETE CASCADE
    );
END
GO

-- Insert initial data into [User] table only if the table is empty
IF NOT EXISTS (SELECT * FROM [User])
BEGIN
    INSERT INTO [User] (Username, [Password], Email, Age)
    VALUES 
        ('John Doe', 'password123', 'john.doe@gmail.com', 33),
        ('Mike Wazowski', 'securepass', 'mike.wazowski@gmail.com', 64),
        ('Sarah Lynn', 'sarah2024', 'sarah.lynn@gmail.com', 27),
        ('Jodie Landon', 'jodiesecure', 'jodie.landon@gmail.com', 19);
END
GO

-- Insert initial data into CurrentLocation table only if the table is empty
IF NOT EXISTS (SELECT * FROM CurrentLocation)
BEGIN
    INSERT INTO CurrentLocation (UserId, Location)
    VALUES 
        (1, 'Vancouver'),
        (2, 'Melbourne'),
        (3, 'Montreal'),
        (4, 'Florida');
END
GO

-- Insert initial data into FavouriteLocation table only if the table is empty
IF NOT EXISTS (SELECT * FROM FavouriteLocation)
BEGIN
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
END
GO
