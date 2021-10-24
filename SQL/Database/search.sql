
-- search words by value
CREATE  PROCEDURE SearchByValue
(
    @wordValue varchar(50)
)
AS
BEGIN
  SELECT *
  FROM [WordInfo]
  LEFT JOIN [Word]
    ON [WordInfo].[WordID] = [Word].[WordID]
  WHERE 
    [Word].[Length] = LEN(@wordValue) AND
    [Word].[Value] = @wordValue  AND 
    [WordInfo].[WordID] = [Word].[WordID]

END;
GO;


-- search words by location
CREATE PROCEDURE SearchByLocation
(
    @Line   INT,
    @Paragrath INT,
    @Chapter VARCHAR(max),
    @WordID varchar(max)
)
AS
BEGIN
  SELECT *
  FROM [WordInfo] AS [W]
  WHERE 
      [W].[Line] = @Line AND
      [W].[Chapter] = @Chapter AND
      [W].[WordID] = @WordID

END;
GO;

-- search words by book
CREATE  PROCEDURE SearchBybook
(
    @BookName varchar(50)
)
AS
BEGIN
  SELECT [W].*
  FROM [WordInfo] AS [W]
  LEFT JOIN [Book] AS [B]
  ON
    [B].[BookName] = @BookName

END;
GO;
