CREATE TABLE WordPhrase
 (
    PhraseID     INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    WordID       INT NOT NULL,
    IndexInPhrase INT NOT NULL,
    FOREIGN KEY  (WordID) REFERENCES Word (WordID)
);