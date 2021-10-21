
CREATE TRIGGER WordUpdate 
    ON Word
    AFTER INSERT
         FOR EACH ROW
            BEGIN
             SET Length = LENGTH(name) WHERE WordID = new.WordID;
        END
