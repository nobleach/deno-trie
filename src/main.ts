'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the contacts function below.
 */
const storage = {};
function contacts(queries) {
    /*
     * Write your code here.
     */
    // console.log(queries);
    let results = [];
    queries.forEach(query => {
      const [command, data] = query;
      if (!command || !data) {
        console.log('Missing command or data');
      }
      switch(command) {
        case 'add': {
          storage[data] = data;
          console.log(`Added ${data}`);
          break;
        }

        case 'find': {
          const contacts = Object.keys(storage);
          const result = contacts.reduce((prev, curr) => {
              console.log(`Checking against ${curr}`);
              if (curr.includes(data)) {
                console.log('match');
                  return prev + 1;
              }

              return prev;
          }, 0);
          results.push(result);
        }
        default: {
          break;
        }
      }
    });
    console.log(results);
    return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const queriesRows = parseInt(readLine(), 10);

    let queries = Array(queriesRows);

    for (let queriesRowItr = 0; queriesRowItr < queriesRows; queriesRowItr++) {
        queries[queriesRowItr] = readLine().split(' ');
    }

    let result = contacts(queries);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
