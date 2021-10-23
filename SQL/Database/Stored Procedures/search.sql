
-- search words by value
CREATE  PROCEDURE SearchByValue
(
    @wordVlaue varchar(50)
)
AS
BEGIN
  SELECT *
  FROM [dbo].[WordInfo] AS [W]
  WHERE [W].[Length] == LEN(@wordVlaue)
  AND [W].[Value] == @wordVlaue
)
-----------------------------------------
-- search words by location
CREATE  PROCEDURE SearchByLocation
(
    @line   INT,
    @Paragrath INT,
    @Chapter VARCHAR(max),
    @WordID varchar(max)
)
AS
BEGIN
  SELECT *
  FROM [dbo].[WordInfo] AS [W]
  WHERE [W].[Line] == @Line
  AND [W].[Chapter] == @Chapter
  AND [W].[WordID] == @WordID
)
------------------------------------------
-- search words by book
CREATE  PROCEDURE SearchBybook
(
    @BookID   INT,
    @BookName varchar(50)
)
AS
BEGIN
  SELECT *
  FROM [dbo].[WordInfo] AS [W]
  WHERE [W].[Line] == @Line
  AND [W].[Chapter] == @Chapter
  AND [W].[Value] == @wordVlaue
)
END
