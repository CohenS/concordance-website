

CREATE TABLE BookStat
 (
    BookID           INT NOT NULL PRIMARY KEY,
    AvgCharSentence  INT NOT NULL,
    AvgCharChapter   INT NOT NULL,
    AvgCharPage      INT NOT NULL,
    AvgCharBook      INT NOT NULL,
	FOREIGN KEY  (BookID) REFERENCES Book (BookID)
);
