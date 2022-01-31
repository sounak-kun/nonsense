import dictionary from "data/dict.json";

const vowels = ["A", "E", "I", "O", "U"];
const consonants = [
  "B",
  "C",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "R",
  "S",
  "T",
  "V",
]; // "Q", "W", "X", "Y", "Z" not allowed (rule 5)

const generated: string[] = [];

const popchar = (list: string[], ...char: string[]) => {
  char.forEach((c) => {
    if (list.includes(c)) {
      list.splice(list.indexOf(c), 1);
    }
  });
};

const randchar = (list: string[]) => {
  return list[Math.trunc(Math.random() * list.length)];
};

const nonsenseGenerate = (last: string, loop = false) => {
  last = last.toUpperCase();
  let next = "";

  // First letter
  const first = consonants.slice(); // (rule 1)

  switch (last[0]) {
    // (rule 8)

    case "K":
    case "C":
      popchar(first, "K", "C"); // (rule 3)
      break;

    case "G":
    case "J":
      popchar(first, "G", "J"); // (rule 4)
      break;

    case "B":
    case "V":
      popchar(first, "B", "V"); // (rule 3,4 abstractation)
      break;

    default:
      popchar(first, last[0]);
  }

  if (consonants.includes(last[0])) {
    popchar(
      first,
      consonants[
        (consonants.indexOf(last[0]) + 1 + consonants.length) %
          consonants.length
      ],
      consonants[
        (consonants.indexOf(last[0]) - 1 + consonants.length) %
          consonants.length
      ]
    ); // (rule 9 abstractation)
  }

  next += randchar(first);

  // Second letter
  const second = vowels.slice(); // (rule 1)

  if (vowels.includes(last[1])) {
    popchar(
      second,
      vowels[vowels.indexOf(last[1])], // (rule 8)
      vowels[(vowels.indexOf(last[1]) + 1) % vowels.length], // (rule 10)
      vowels[(vowels.indexOf(last[1]) + 2) % vowels.length] // (rule 10 abstraction)
    );
  }

  next += randchar(second);

  // Third letter
  const third = consonants.slice(); // (rule 1)

  popchar(third, "H"); // (rule 6)

  switch (next[0]) {
    // (rule 7)

    case "K":
    case "C":
      popchar(third, "K", "C"); // (rule 3)
      break;

    case "G":
    case "J":
      popchar(third, "G", "J"); // (rule 4)
      break;

    case "B":
    case "V":
      popchar(third, "B", "V"); // (rule 3,4 abstractation)
      break;

    default:
      popchar(third, next[0]);
  }

  switch (last[2]) {
    // (rule 8)

    case "K":
    case "C":
      popchar(third, "K", "C"); // (rule 3)
      break;

    case "G":
    case "J":
      popchar(third, "G", "J"); // (rule 4)
      break;

    case "B":
    case "V":
      popchar(third, "B", "V"); // (rule 3,4 abstractation)
      break;

    default:
      popchar(third, last[2]);
  }

  if (consonants.includes(last[2])) {
    popchar(
      third,
      consonants[
        (consonants.indexOf(last[2]) + 1 + consonants.length) %
          consonants.length
      ],
      consonants[
        (consonants.indexOf(last[2]) - 1 + consonants.length) %
          consonants.length
      ]
    ); // (rule 9 abstractation)
  }

  next += randchar(third);

  // Output
  if (loop) {
    return next;
  } // prevents recursion

  while (generated.includes(next) || dictionary.dict.includes(next)) {
    next = nonsenseGenerate(last, true);
  }

  if (!generated.length) generated.push(last); // first value
  generated.push(next);
  return next;
};

export default nonsenseGenerate;
