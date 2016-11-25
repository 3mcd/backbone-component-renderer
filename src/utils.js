const rMap = (a, cb) => a.map(x => Array.isArray(x) ? x.map(cb) : cb(x));

const interleave = (a1, a2) =>
  a1
  .map((v, i) => a2[i] ? [v, a2[i]] : v)
  .reduce((a, b) => a.concat(b), []);

const matches = (node, regex) => {
  regex.lastIndex = 0;
  return regex.test(node.textContent);
};

const getPlaceholderId = (node) => Number(node.textContent.match(/[\w\.]+/)[0]);

const swap = (els, ref) => {
  const parent = ref.parentNode;
  if (Array.isArray(els)) {
    swap(els[0], ref);
    els.slice(1).forEach((el, i) => parent.insertBefore(el, els[i].nextSibling));
  } else {
    parent.replaceChild(els, ref);
  }
};
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

const tempElement = (html) => {
  const el = document.createElement('span');
  el.innerHTML = html || '';
  return el;
};

const injectElements = (el, elements, regex) => {
  const placeholders = [];
  // Find placeholder groups. e.g. <% 1 %><% 2 %>
  const groups = findTextNodes(el).filter(p => matches(p, regex));
  groups.forEach((group) => {
    // Find sub-placeholders. e.g. <% 2 %>
    const matches = group.textContent.match(regex);
    // For each sub-placeholder
    matches.forEach((placeholderText, i) => {
      var placeholder;
      var rest;

      if (i === 0) {
        rest = group.splitText(group.textContent.indexOf(placeholderText) + placeholderText.length);
        placeholder = group;
      } else {
        placeholder = group.splitText(group.textContent.indexOf(placeholderText));
        if (i !== matches.length) {
          rest = placeholder.splitText(placeholder.textContent.indexOf(placeholderText) + placeholderText.length);
        }
      }
      // Grab the newly isolated placeholder
      placeholders.push(placeholder);
      // Keep moving
      group = rest;
    });
  });
  // Swap each placeholder with its corresponding element in the(elements Array
  placeholders.forEach((placeholder) => {
    const pos = getPlaceholderId(placeholder) - 1;
    swap(elements[pos], placeholder);
  });
  // Return the node
  return el;
};

export {
  empty,
  findTextNodes,
  getPlaceholderId,
  injectElements,
  interleave,
  moveChildren,
  rMap,
  swap,
  tempElement,
};