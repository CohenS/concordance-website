
const textEndMarkers = [
    "*** END OF THE PROJECT GUTENBERG",
    "*** END OF THIS PROJECT GUTENBERG",
    "***END OF THE PROJECT GUTENBERG",
    "End of the Project Gutenberg",
    "End of The Project Gutenberg",
    "Ende dieses Project Gutenberg",
    "by Project Gutenberg",
    "End of Project Gutenberg",
    "End of this Project Gutenberg",
    "Ende dieses Projekt Gutenberg",
    "        ***END OF THE PROJECT GUTENBERG",
    "*** END OF THE COPYRIGHTED",
    "End of this is COPYRIGHTED",
    "Ende dieses Etextes ",
    "Ende dieses Project Gutenber",
    "Ende diese Project Gutenberg",
    "**This is a COPYRIGHTED Project Gutenberg Etext, Details Above**",
    "Fin de Project Gutenberg",
    "The Project Gutenberg Etext of ",
    "Ce document fut presente en lecture",
    "Ce document fut pr",
    "More information about this book is at the top of this file.",
    "We need your donations more than ever!",
    "END OF PROJECT GUTENBERG",
    " End of the Project Gutenberg",
    " *** END OF THIS PROJECT GUTENBERG",
]

export const parseBookInformation = (book) =>
{
    const titleRegex = /Title: (.*)/i
    const authorRegex = /Author: (.*)[\r\n]*(.*)[\r\n]/i
    // const illustratorRegex = /Illustrator: (.*\s*:\s*.*)/
    const releaseDateRegex = /Release Date: (.*)/i
    // const languageRegex = /Language(.*\s*:\s*.*)/
    // const producedByRegex = /Produced by(.*\s*:\s*.*)/

    const bookName = titleRegex.exec(book)[1];
    console.log("got bookName")
    console.log(bookName)

    const author = authorRegex.exec(book)[1];
    console.log("got author")
    console.log(author)
    const publishedDate = releaseDateRegex.exec(book)[1]

    return ({bookName, author, publishedDate});

}

export const parseWords = (book) => {
    const ChapterIndex = /Chapter 1[\n\r]*/i
    const matches = book.match(ChapterIndex)
    const romanChapterStartRegex = /Chapter I\.?[\n\r]*/i

    const chapter1Start = matches !== null
        ? book.lastIndexOf(book.match(ChapterIndex).pop()) 
        : book.lastIndexOf(book.match(romanChapterStartRegex).pop())

    const bookEndIndex = textEndMarkers.map(s => book.indexOf(s)).filter(index => index !== -1)[0];
    const bookChapters = book.substring(chapter1Start, bookEndIndex);

    const chapters = matches !== null
        ? bookChapters.split(/Chapter \d*[\n\r]*/i).filter(x => x !== '') 
        : bookChapters.split(/Chapter \d*\.?[\n\r]*/i).filter(x => x !== '') ;
    const bookWords = 
        chapters
        .map((c,chapterNumber) => 
            c.trim().split(/\r\n\r\n/).filter(x => x != '').filter(e => e.length)
            .map((p,paragraphNumber) => 
                (p.trim().split(/\r\n/).filter(x => x != '').filter(e => e.length)
                .map((l,lineNumber) => 
                    (l.trim().split(" ").filter(x => x != '')

                     .map((w,wordNumber) =>
                      ({
                         Chapter: chapterNumber + 1,
                         Paragraph: paragraphNumber + 1,
                         Line: lineNumber + 1,
                         WordNumber: wordNumber + 1,
                         WordValue:w
                        }))))))).flat(4);

    return {BookWords: bookWords, BookContent: bookChapters};

}


function RomanNumeralCharToInt(c){
    switch (c){
    case 'I': return 1;
    case 'V': return 5;
    case 'X': return 10;
    case 'L': return 50;
    case 'C': return 100;
    case 'D': return 500;
    case 'M': return 1000;
    default: return -1;
    }
}

// function RomanNumeralToInt(str1) {
//     if(str1 == null) return -1;
//     var num = RomanNumeralCharToInt(str1.charAt(0));
//     var pre, curr;
    
//     for(var i = 1; i < str1.length; i++){
//         curr = RomanNumeralCharToInt(str1.charAt(i));
//         pre = RomanNumeralCharToInt(str1.charAt(i-1));
//         if(curr <= pre){
//         num += curr;
//         } else {
//         num = num - pre*2 + curr;
//         }
//     }
    
//     return num;
//     }
    
