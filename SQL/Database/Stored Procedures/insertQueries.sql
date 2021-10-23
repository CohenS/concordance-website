CREATE TYPE Words AS TABLE
(
    WordValue VARCHAR(max),
	BookID INT,
	Paragraph INT,
	Page INT,
	Line INT,
	Sentence INT
)

CREATE TYPE ChapterStatistics AS TABLE
(
    ChapterNumber INT,
	CharacterCount INT,
)

CREATE TYPE ParagraphStatistics AS TABLE
(
    ParagraphNumber INT,
	CharacterCount INT,
)

CREATE TYPE LineStatistics AS TABLE
(
    LineNumber INT,
	CharacterCount INT,
)

-- Book insertion
CREATE PROCEDURE [dbo].[InsertBook](
   BookName varchar(max),
   Author varchar(max),
   PublishedDate datetime,
   BookCharacterCount int,
   Words Words,
   ChapterStatistics ChapterStatistics,
   ParagraphStatistics ParagraphStatistics,
   LineStatistics LineStatistics,
)
AS
BEGIN

   IF NOT EXISTS (SELECT * FROM Book WHERE BookName = @BookName)
   BEGIN
       insert into  [dbo].[Book] (BookName,Author,PublishDate,BookCharacterCount)
       VALUES (@BookName, @Author, @PublisDate, @BookNumChar);
   END
   
	DECLARE @WordID INT;
	IF NOT EXISTS (SELECT * FROM Word WHERE [Value] = @WordValue)
	BEGIN
		INSERT INTO dbo.Word ([Value],[Length]) VALUES (@Value,LEN(@Value));
		SET @WordID = @@IDENTITY;
	END
	ELSE
	BEGIN
		SELECT @WordID=WordID FROM Word WHERE [Value] = @WordValue;
	END
	-- word information values insertion into WordImfo table
	INSERT INTO  dbo.WordInfo (BookID,Line,WordID,Paragraph,Page,Sentence)
	VALUES (@BookID,@Line,@WordId,@Paragraph,@Page,@Sentence);
	
	SELECT @@ROWCOUNT AS Output;

---------------------------------------------------------------
-- word group values insertion 


CREATE PROCEDURE [dbo].[WordGroupInsertion](
   @GroupID INT,
   @GroupName varchar(max),
   @WordID int
)
AS
BEGIN
   IF NOT EXISTS (SELECT * FROM WordGroup WHERE GroupName = @GroupName)
   BEGIN
    insert into dbo.wordGroup (GroupID,GroupName,WordID)
      VALUES (@GroupID,@GroupName, @WordID);
   END
   
   SELECT @@ROWCOUNT AS Output;
END;
GO

---------------------------------------------------------------
-- phrase values insertion 


CREATE PROCEDURE [dbo].[WordPhraseInsertion](
   @PhraseID INT,
   @WordID int,
   @IndexInPhrase INT
)
AS
BEGIN
   IF NOT EXISTS (SELECT * FROM WordPhrase WHERE PhraseID = @PhraseID)
   BEGIN
    insert into dbo.WordPhrase (PhraseID,WordID,InsexInPhrase)
      VALUES (@PhraseID, null);
   END
   
   SELECT @@ROWCOUNT AS Output;
END;
GO