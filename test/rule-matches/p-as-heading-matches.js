describe('p-as-heading-matches', () => {
  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('p-as-heading');
  });

  it('is a function', () => {
    assert.isFunction(rule.matches);
  });

  it('matches p elements', () => {
    const vNode = queryFixture(
      '<p id="target">some text</p><p>some other text</p>'
    );

    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('ignores p elements with an explicit heading role', () => {
    const vNode = queryFixture(
      '<p id="target" role="heading" aria-level="1">some text</p><p>some other text</p>'
    );

    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('ignores the last p element in a list of children', () => {
    const vNode = queryFixture(
      '<p>some text</p><p id="target">some other text</p>'
    );

    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('ignores p elements that contains punctuation marks', () => {
    const vNode = queryFixture(
      '<p id="target">A text. Paragraph?</p><p>some other text</p>'
    );

    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('matches p elements with a single punctuation mark', () => {
    const vNode = queryFixture(
      '<p id="target">A paragraph?</p><p>some other text</p>'
    );

    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('ignores p elements that have no text-like characters', () => {
    const vNode = queryFixture(
      '<p id="target"> \n\t\r </p><p>some other text</p>'
    );

    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('ignores siblings that are not p elements', () => {
    let vNode = queryFixture(
      '<p id="target">some text</p><div></div><p>some other text</p>'
    );

    assert.isTrue(rule.matches(vNode.actualNode, vNode));

    vNode = queryFixture('<p id="target">some text</p><div></div>');

    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('ignores empty p elements as siblings', () => {
    const vNode = queryFixture(
      '<p id="target">some text</p><p> <!-- nothing here --><img src="" alt="" /></p>'
    );

    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });
});
