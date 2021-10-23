CREATE TYPE [ChapterStatistics] AS TABLE
(
    ChapterNumber INT,
	CharacterCount INT
);

GO;

CREATE TYPE ParagraphStatistics AS TABLE
(
    ParagraphNumber INT,
	CharacterCount INT
);

GO;

CREATE TYPE LineStatistics AS TABLE
(
    LineNumber INT,
	CharacterCount INT
);

GO;

CREATE TYPE [Words] AS TABLE
(
    WordValue VARCHAR(MAX),
	BookID INT,
	Paragraph INT,
	Page INT,
	Line INT,
	Sentence INT
);
GO;
