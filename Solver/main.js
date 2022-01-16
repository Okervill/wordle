const fs = require('fs');

//File taken from https://github.com/dwyl/english-words and modified
let words = fs.readFileSync('./five-letter-words.txt', 'utf8');

console.log(`Total word count: ${words.split('\n').length}`)

//Enter letters which do not appear anywhere in the word    
wrongletters = '';

//Enter letters which are correct, but do not appear in this position
wrongpos1 = '';
wrongpos2 = '';
wrongpos3 = '';
wrongpos4 = '';
wrongpos5 = '';

//Enter letters which are correct, and appear in this position
correctpos1 = '';
correctpos2 = '';
correctpos3 = '';
correctpos4 = '';
correctpos5 = '';

let regex = new RegExp(`${correctpos1.length === 1 ? correctpos1 : '[^' + wrongletters + wrongpos1 + ']'}${correctpos2.length === 1 ? correctpos2 : '[^' + wrongletters + wrongpos2 + ']'}${correctpos3.length === 1 ? correctpos3 : '[^' + wrongletters + wrongpos3 + ']'}${correctpos4.length === 1 ? correctpos4 : '[^' + wrongletters + wrongpos4 + ']'}${correctpos5.length === 1 ? correctpos5 : '[^' + wrongletters + wrongpos5 + ']'}\n`, 'g')

let matches = words.match(regex);
console.log(matches, matches.length);