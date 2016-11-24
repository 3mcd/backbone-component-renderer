const PLACEHOLDER_REGEX = /<%([\s\S]+?)%>/g;
const PLACEHOLDER_TEMPLATE = (id) => `<% ${id} %>`;

export { PLACEHOLDER_REGEX, PLACEHOLDER_TEMPLATE };