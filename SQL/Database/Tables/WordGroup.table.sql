CREATE TABLE  WordGroup
 (
    GroupID      INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    GroupName    VARCHAR(max) NOT NULL,
    WordID       INT NOT NULL,
    FOREIGN KEY  (WordID) REFERENCES Word (WordID)
);