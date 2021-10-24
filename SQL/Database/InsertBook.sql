CREATE PROCEDURE [dbo].[InsertBook](
   @BookName VARCHAR(MAX),
   @Author VARCHAR(MAX),
   @PublishedDate VARCHAR(250),
   @Words [Words] READONLY
)

AS
BEGIN
-- check if book already exists

    DECLARE @BookIDFromInsert INT;
    DECLARE @BookCharacterCount INT;
    SELECT @BookCharacterCount = SUM(LEN(WordValue)) FROM @Words;

    -- insert values to book table
    INSERT INTO [Book] (BookName,Author,PublishDate,BookCharacterCount)
    VALUES (@BookName, @Author, @PublishedDate, @BookCharacterCount);
        
    SET @BookIDFromInsert = SCOPE_IDENTITY()

-- insert values to word table
    INSERT INTO Word ([Value],[Length])
    SELECT [WordInput].[WordValue], LEN([WordInput].[WordValue])
    FROM @Words AS [WordInput]
    WHERE NOT EXISTS (Select [Value] From [Word] WHERE [Word].[Value] = [WordInput].[WordValue])

--  insert values to wordinfo table 
    INSERT INTO WordInfo (BookID, Line, WordID, Paragraph, WordNumber, Chapter)
    SELECT @BookIDFromInsert, [WordInsert].[Line], [W].[WordID], [WordInsert].[Paragraph], [WordInsert].[WordNumber], [WordInsert].[Chapter]
    FROM @Words AS [WordInsert]
    LEFT JOIN Word AS [W]
        ON [WordInsert].[WordValue] = [W].[Value]

-- calculate word statistics 

    DECLARE @WordCharAvg INT
    SELECT @WordCharAvg = 
    (
        SELECT AVG(CharacterCount) AS Average
            FROM 
            (
                SELECT SUM(LEN(WordValue)) AS CharacterCount FROM @Words
            )
            AS a
    )

    DECLARE @LineCharAvg INT
    SELECT @LineCharAvg = 
    (
        SELECT AVG(CharacterCount) AS Average
            FROM 
            (
                SELECT SUM(LEN(WordValue)) AS CharacterCount FROM @Words
                GROUP BY Line
            )
            AS a
    )

    DECLARE @ChapterCharAvg INT
    SELECT @ChapterCharAvg = 
    (
        SELECT AVG(CharacterCount) AS Average
            FROM 
            (
                SELECT SUM(LEN(WordValue)) AS CharacterCount FROM @Words
                GROUP BY Chapter
            )
            AS a
    )

    
    DECLARE @ParagraphCharAvg INT
    SELECT @ParagraphCharAvg = 
    (
        SELECT AVG(CharacterCount) AS Average
            FROM 
            (
                SELECT SUM(LEN(WordValue)) AS CharacterCount FROM @Words
                GROUP BY Paragraph
            )
            AS a
    )

-- insert Stat data
    INSERT INTO BookStat (BookID,AvgCharWord,AvgCharLine,AvgCharChapter,AvgCharParagraph,AvgCharBook)
    VALUES (@BookIDFromInsert, @WordCharAvg, @LineCharAvg, @ChapterCharAvg, @ParagraphCharAvg, @BookCharacterCount)


    SELECT @@ROWCOUNT AS Output; 


END;
GO;