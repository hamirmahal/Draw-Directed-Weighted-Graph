const child_process = require('child_process');
const fs = require('fs');

const input = JSON.parse(fs.readFileSync('inputGraph.txt'));
if (!Array.isArray(input)) {
  console.error('Expected', input, "to be an array, but it wasn't");
  throw Error();
}

/**
 * It's less efficient to repeatedly append to a `string`.
 * Switching to an array and repeatedly `push`ing to it,
 * and then `.join`ing at the end should improve performance,
 * if that's something we're worried about.
 */
let contentsOfInputDot = 'digraph {\n';
input.forEach((triplet) => {
  const [from, to, label] = triplet;
  contentsOfInputDot += `  ${from} -> ${to} [ label="${label}" ]\n`;
});
contentsOfInputDot += '}\n';
fs.writeFileSync('input.dot', contentsOfInputDot);

// This is why `dot` is a dependency.
// This is the part that actually outputs the input graph
// into an HTML file.
child_process.execSync('dot -Tsvg input.dot > index.html');
