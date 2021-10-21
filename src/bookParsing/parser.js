const exampleBook = `Chapter 1

      It is a truth universally acknowledged, that a single man in
      possession of a good fortune, must be in want of a wife.

Chapter 2
      Mr. Bennet was so odd a mixture of quick parts, sarcastic humour,
      reserve, and caprice, that the experience of three-and-twenty`



export default parseBookInformation = (book) =>
{
    const titleRegex = /Title([^"]*)/
    const authorRegex = /Author([^"]*)/
    const illustratorRegex = /Illustrator([^"]*)/
    const releaseDateRegex = /Release Date([^"]*)/
    const languageRegex = /Language([^"]*)/
    const producedByRegex = /Produced by([^"]*)/
    const chaptersRegex = book.split(/Chapter \d*/).filter(x => x != '');
}

export default parseWords = (book) =>
{
    const chapters = book.split(/Chapter \d*/).filter(x => x != '');

    const bookInformation = 
        chapters
        .map((c,chapterNumber) => 
            c.split(/\n\n/).filter(x => x != '')
            .map((p,paragraphNumber) => 
                (p.split(/\n/).filter(x => x != '')
                .map((l,lineNumber) => 
                    (l.trim().split(" ")
                    .map((w,wordNumber) => ({chapterNumber: chapterNumber, paragraphNumber: paragraphNumber, lineNumber:lineNumber, wordNumber: wordNumber, word:w})))))));

    const words = words.flat(Infinity)
    return words;
}