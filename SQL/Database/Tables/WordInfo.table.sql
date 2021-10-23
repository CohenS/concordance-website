CREATE TABLE WordInfo
(
	[ID] 				         INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [BookID]                     INT NOT NULL,
    [Line]                       INT NOT NULL,
    [WordID]                     INT NOT NULL,
    [Paragraph] INT NOT NULL, 
    [Chapter] INT NOT NULL, 
    FOREIGN KEY  (BookID) REFERENCES Book (BookID),
	FOREIGN KEY  (WordID) REFERENCES Word (WordID)
);
