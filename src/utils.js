const interleave = (a1, a2) =>
  a1
  .map((v, i) => a2[i] ? [v, a2[i]] : v)
  .reduce((a, b) => a.concat(b), []);

const isPlaceholder = (node, regex) => {
  regex.lastIndex = 0;
  return regex.test(node.textContent);
};

const getPlaceholderId = (node) => {
	return Number(node.textContent.match(/[\w\.]+/)[0]);
};

const swap = (el, ref) => ref.parentNode.replaceChild(el, ref);
const empty = (parent) => {
  while (parent.firstChild) parent.removeChild(parent.firstChild);
};
const moveChildren = (from, to) => {
    while (from.childNodes.length > 0) {
      to.appendChild(from.childNodes[0]);
    }
}

const findTextNodes = (el) => {
  var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  while (n = walk.nextNode()) a.push(n);
  return a;
};

const substitutePlaceholders = (orderedEls, html, regex) => {
  // Create temp element so we aren't doing DOM manipulation directly in the document.
  const temp = document.createElement('div');
  const placeholders = [];
  // Parse HTML text as DOM.
  temp.innerHTML = html;
  const groups = findTextNodes(temp).filter(p => isPlaceholder(p, regex));
  groups.forEach((group) => {
    // Find sub-placeholders.
    const matches = group.textContent.match(regex);
    const finalMatch = matches[matches.length - 1];
    // For each sub-placeholder,
    matches.forEach((placeholderText, i) => {
      var placeholder;
      var rest;
      // split the text node at the beginning and end of the placeholder.
      placeholder = group.splitText(group.textContent.indexOf(placeholderText));
      rest = placeholder.splitText(placeholder.textContent.indexOf(placeholderText) + placeholderText.length);
      // Grab the newly isolated placeholder.
      placeholders.push(placeholder);
      // Keep moving.
      group = rest;
    });
  });
  // Swap each placeholder with its corresponding element in the orderedEls Array.
  placeholders.forEach((placeholder) => {
    const id = getPlaceholderId(placeholder);
    swap(orderedEls[id - 1], placeholder);
  });
  // Return the temporary node.
  return temp;
};

export {
	interleave,
	isPlaceholder,
	getPlaceholderId,
	swap,
  empty,
  moveChildren,
	findTextNodes,
	substitutePlaceholders
};