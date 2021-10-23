CREATE PROCEDURE [dbo].[InsertBook](
   @BookName varchar(MAX),
   @Author varchar(MAX),
   @PublishedDate datetime,
   @BookCharacterCount int,
   @Words [Words] READONLY,
   @ChapterStatistics [ChapterStatistics] READONLY,
   @ParagraphStatistics [ParagraphStatistics] READONLY,
   @LineStatistics [LineStatistics] READONLY
)
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM [Book] WHERE BookName = @BookName)
    BEGIN
        INSERT INTO [Book] (BookName,Author,PublishDate,BookCharacterCount)
        VALUES (@BookName, @Author, @PublishedDate, @BookCharacterCount);
    END

    DECLARE @BookID INT
    SET @BookID = SCOPE_IDENTITY()
   
    INSERT INTO Word ([Value],[Length])
    SELECT [WordInput].[WordValue] ,LEN([WordInput].[WordValue])
    FROM @Words AS [WordInput]
    WHERE NOT EXISTS (Select [Value] From [Word] WHERE [Word].[Value] = [WordInput].[WordValue])

    INSERT INTO WordInfo (BookID,Line,WordID,Paragraph)
    SELECT @BookID, [WordInsert].[Line], [W].[WordID], [WordInsert].[Paragraph]
    FROM @Words AS [WordInsert]
    LEFT JOIN Word AS [W]
        ON [WordInsert].[WordValue] = [W].[Value]

    SELECT @@ROWCOUNT AS Output;

END;
GO;