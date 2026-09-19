function pAsHeadingMatches(node, virtualNode) {
  const children = Array.from(node.parentNode.childNodes);
  const nodeText = node.textContent.trim();
  const isSentence = /[.!?:;](?![.!?:;])/g;

  // Ignore elements with an explicit heading role: they are already exposed
  // as headings in the accessibility tree (ARIA12), so the rule is
  // inapplicable to them.
  const explicitRole = (virtualNode.attr('role') || '').trim().toLowerCase();
  if (explicitRole.split(/\s+/).includes('heading')) {
    return false;
  }

  // Check that there is text, and it is not more than a single sentence
  if (nodeText.length === 0 || (nodeText.match(isSentence) || []).length >= 2) {
    return false;
  }

  // Grab sibling p element following the current node
  const siblingsAfter = children
    .slice(children.indexOf(node) + 1)
    .filter(
      elm => elm.nodeName.toUpperCase() === 'P' && elm.textContent.trim() !== ''
    );

  return siblingsAfter.length !== 0;
}

export default pAsHeadingMatches;
