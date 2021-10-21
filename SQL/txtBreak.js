const book = `Chapter 1

      It is a truth universally acknowledged, that a single man in
      possession of a good fortune, must be in want of a wife.

Chapter 2
      Mr. Bennet was so odd a mixture of quick parts, sarcastic humour,
      reserve, and caprice, that the experience of three-and-twenty`

const chapters = book.split(/Chapter \d*/).filter(x => x != '');
const chapter1 = chapters[0];
const paragraphs = chapter1.split(/\n\n/).filter(x => x != '');
const paragraph1 = paragraphs[0];
const lines = paragraph1.split(/\n/);
const wordsInLine1 = lines[0].trim().split(" ");
console.log(wordsInLine1)