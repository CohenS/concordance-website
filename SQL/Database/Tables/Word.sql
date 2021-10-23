CREATE TABLE  Word 
(
    WordID       INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Value        VARCHAR(max) NOT NULL,
    Length       INT DEFAULT 0,
);