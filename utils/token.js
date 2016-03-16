'use strict';

/**
 * Adapted from: https://gist.github.com/fiznool/73ee9c7a11d1ff80b81c
 */

/**
 * The default alphabet is 25 characters (digits and uppercase letters).
 * Any numbers that look like letters and vice versa are removed:
 * 1 l, 0 o.
 * Also the following letters are not present, to prevent any
 * expletives: cfhistu
 */
const ALPHABET = '23456789ABDEGJKMNPQRVWXYZ';

// Governs the length of the ID.
// With an alphabet of 25 chars,
// a length of 8 gives us 25^6 or
// 244,140,625 possibilities.
// Should be enough...
const ID_LENGTH = 6;

/**
 * Governs the number of times we should try to find
 * a unique value before giving up.
 * @type {Number}
 */
const UNIQUE_RETRIES = 99999;

let Token = {
  exclude: [],
};

Token.LENGTH = ID_LENGTH;

/**
 * Tries to generate a unique token that is not defined in the Token.exclude array.
 * @return {String} A unique token, or `null` if one could not be generated.
 */
Token.generate = function () {

  /**
   * Returns a randomly-generated token.
   * Note that uniqueness is not guaranteed.
   * @returns {string} nice token
   * @private
   */
  let _gen = function () {
    let rtn = '';
    for (let i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }

    return rtn;
  };

  let retries = 0;
  let tk;

  // Try to generate a token i.e. one that isn't in the previous.
  while (!tk && retries < UNIQUE_RETRIES) {
    tk = _gen();
    if (Token.exclude.indexOf(tk) !== -1) {
      tk = null;
      retries++;
    }
  }

  // If we got one; exclude it
  if (tk) {
    Token.exclude.push(tk);
  }

  return tk;

};

Token.setExclusion = function (exclude) {
  Token.exclude = exclude; // FIXME: will grow big and big!!
};

module.exports = Token;
