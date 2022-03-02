import { CssSelectorParser } from "css-selector-parser";

const parser = new CssSelectorParser();

parser.registerSelectorPseudos("has");
parser.registerNestingOperators(">", "+", "~");
parser.registerAttrEqualityMods("^", "$", "*", "~");
parser.enableSubstitutes();

export const calcSpecificity = (cssSelector) => {
  const obj = parser.parse(cssSelector);
  const counter = {
    tags: 0,
    classes: 0,
    pseudos: 0,
    pseudoelem: 0,
    ids: 0,
    attrs: 0
  };

  const checkHasPseudoElem = (pseudos) => {
    const hasPseudos = Boolean(pseudos);

    if (hasPseudos && pseudos.length > 1) {
      const pseudoElementIndex = pseudos.length - 2;
      const isPseudoElem = pseudos[pseudoElementIndex].name === "";
      if (isPseudoElem) {
        counter.pseudoelem = 1;
        counter.pseudos -= 2;
      }
    }
  };

  const parseRule = (rule) => {
    const isTag = Boolean(rule.tagName);
    const isClass = Boolean(rule.classNames);
    const isId = Boolean(rule.id);
    const isPseudo = Boolean(rule.pseudos);
    const isAttribute = Boolean(rule.attrs);
    const hasRule = Boolean(rule.rule);
    checkHasPseudoElem(rule.pseudos);

    isTag && counter.tags++;
    isClass && (counter.classes += rule.classNames.length);
    isPseudo && (counter.pseudos += rule.pseudos.length);
    isId && counter.ids++;
    isAttribute && (counter.attrs += rule.attrs.length);

    hasRule && parseRule(rule.rule);
  };

  const hasRule = Boolean(obj.rule);
  hasRule && parseRule(obj.rule);

  // const isMultiple = obj.type === "selectors";
  return counter;
};
