
// PROBLEM:
//
// Find a 9 letter string of characters that contains only letters from
//
// acdegilmnoprstuw
//
// such that the hash(the_string) is
// 
// 945924806726376
// 
// if hash is defined by the following pseudo-code:
// 
// Int64 hash (String s) { Int64 h = 7 String letters = "acdegilmnoprstuw"
// for(Int32 i = 0; i < s.length; i++) { 
// h = (h * 37 + letters.indexOf(s[i])) } return h }
// 
// For example, if we were trying to find the 7 letter string 
// where hash(the_string) was 680131659347, the answer would be "leepadg".
// 

/*
  Solution: Brute-Force Method

  Since the main factor in the hashing function is `letters.indexOf(string[i])`, we know that the indexOf each char is 
  roughly equal to its value. This means that `aaaaaaaaa` and `wwwwwwwww` are the bounds. However, 16^9 comes out to a 
  total 68719476736 combinations, which is unfeasible to brute-force. 

  With some kludging around, one can find that the answer has to be between `paaaaaaaa` and `pwwwwwwww` as these hash 
  into 944856973104749 and 946320506210549 respectively, containing the answer 945924806726376 somewhere in-between. 
  When brute-forcing, one must try to reduce the search space as much as possible beforehand.

  To start, we know the first letter is `p`. To find the second letter, we need to append a letter from `acdegilmnoprstuw` 
  and pad the rest of the 9-letter word with `w` (since we can't test upwards from `paaaaaaaa`, but we can reduce down 
  from `pwwwwwwww`). So `pawwwwwww` would be the first test case. From there, it is a matter of iteration, sharpening each
  guess by whether it is +/- from the answer hash until we deduce our way to the answer.
*/

var currentGuess = "p";
var answerHash = 945924806726376;
var answerLength = 9;
var letters = Array.from("acdegilmnoprstuw");

function hash(string) {
  var h = 7;
  for(var i = 0; i < string.length; i++) { 
    h = (h * 37 + letters.indexOf(string[i]));
  } 
  return h;
}

function padString(string) {
  var diff = answerLength - string.length;
  return string += letters[letters.length - 1].repeat(diff);
}

function computeString(string) {
  for(var i = 0; i < letters.length; i++) {

    var candidate = string + letters[i];
    var currentHash = hash(padString(candidate));
    
    if(currentHash === answerHash) {
      console.log(candidate);
      return candidate;
    }

    if(currentHash > answerHash) {
      return computeString(candidate);
    } else { continue; }
  };

}

computeString(currentGuess);
