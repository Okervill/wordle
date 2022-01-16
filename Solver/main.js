const fs = require('fs');

//File taken from https://github.com/dwyl/english-words and modified
let words = fs.readFileSync('./five-letter-words.txt', 'utf8');

console.log(`Total word count: ${words.split('\n').length}`)

//Enter letters which do not appear anywhere in the word    
wrongletters = 'lidrotun';

//Enter letters which are correct, but do not appear in this position
wrongpos1 = 'sa';
wrongpos2 = 'ea';
wrongpos3 = 'a';
wrongpos4 = 'e';
wrongpos5 = 'es';

//Enter letters which are correct, and appear in this position
correctpos1 = '';
correctpos2 = 's';
correctpos3 = '';
correctpos4 = '';
correctpos5 = '';
 
let regex = new RegExp(`${correctpos1.length === 1 ? correctpos1 : '[^' + wrongletters + wrongpos1 + ']'}${correctpos2.length === 1 ? correctpos2 : '[^' + wrongletters + wrongpos2 + ']'}${correctpos3.length === 1 ? correctpos3 : '[^' + wrongletters + wrongpos3 + ']'}${correctpos4.length === 1 ? correctpos4 : '[^' + wrongletters + wrongpos4 + ']'}${correctpos5.length === 1 ? correctpos5 : '[^' + wrongletters + wrongpos5 + ']'}\n`, 'g')

let matches = words.match(regex);
console.log(matches, matches.length);

let lettercounts = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0
}

for(let word of matches) {
    for(let letter of word) {
        if(letter === '\n') continue;
        lettercounts[letter] = lettercounts[letter] + 1;
    }
}

let sortable = [];
for (let letter in lettercounts) {
    sortable.push([letter, lettercounts[letter]]);
}

sortable.sort(function(a, b) {
    return b[1] - a[1];
});

let top5 = sortable[0][0] + sortable[1][0] + sortable[2][0] + sortable[3][0] + sortable[4][0];

regex = new RegExp(`[${top5}]{5}`, 'g');
let topmatches = words.match(regex);

console.log(topmatches);