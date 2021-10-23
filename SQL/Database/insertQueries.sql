CREATE PROCEDURE [WordGroupInsertion](
   @GroupID INT,
   @GroupName varchar(MAX),
   @WordID int
)
AS
BEGIN
   IF NOT EXISTS (SELECT * FROM WordGroup WHERE GroupName = @GroupName)
   BEGIN
    INSERT INTO WordGroup (GroupID,GroupName,WordID)
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
    insert into WordPhrase (PhraseID,WordID,IndexInPhrase)
      VALUES (@PhraseID, @WordID, @IndexInPhrase);
   END
   
   SELECT @@ROWCOUNT AS Output;
END;
GO