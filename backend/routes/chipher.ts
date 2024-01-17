import {Router} from "express";
import {Word} from "../types";

const chipherRouter = Router();
const en = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const square: string[][] = [];

for (let i = 0; i < en.length; i++) {
  square[i] = en.slice(i).concat(en.slice(0, i));
}

chipherRouter.post('/encode', (req, res) => {
  const word: Word = {
    password: req.body.password,
    message: req.body.message,
  };

  let encodeText = '';
  for (let i = 0; i < word.message.length; i++) {
    const messageChar = word.message[i].toUpperCase();
    const passwordChar = word.password[i % word.password.length].toUpperCase();

    if (messageChar === ' ') {
      encodeText += ' ';
    } else {
      const messageIndex = en.indexOf(messageChar);
      const passwordIndex = en.indexOf(passwordChar);

      if (messageIndex !== -1 && passwordIndex !== -1 &&
        messageIndex < square.length && passwordIndex < square[messageIndex].length) {
        encodeText += square[messageIndex][passwordIndex];
      }
    }
  }

  res.send(JSON.stringify({encoded: encodeText}));
});

chipherRouter.post('/decode', (req, res) => {
  const word: Word = {
    password: req.body.password,
    message: req.body.message,
  };

  let decodeText = "";

  for (let i = 0; i < word.message.length; i++) {
    const passwordChar = word.password[i % word.password.length].toUpperCase();

    if (word.message[i] === ' ') {
      decodeText += ' ';
    } else {
      const row = en.indexOf(passwordChar);

      if (row !== -1 && row < square.length) {
        const coll = square[row].indexOf(word.message[i].toUpperCase());

        if (coll !== -1 && coll < en.length) {
          decodeText += en[coll];
        }
      }
    }
  }

  res.send(JSON.stringify({decoded: decodeText}));
});

export default chipherRouter;