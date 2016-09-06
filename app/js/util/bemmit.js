function getBaseClass(block, element) {
  return !element ? block : `${block}__${element}`;
}

function addModifier(baseClass, modifier) {
  return modifier ? `${baseClass}--${modifier}` : null;
}

function bemmit(block) {
  return (element, modifiers = []) => {
    const baseClass = getBaseClass(block, element);
    const modifierFn = addModifier.bind(null, baseClass);
    return [baseClass].concat(modifiers.map(modifierFn)).join(' ');
  };
}

export default bemmit;
