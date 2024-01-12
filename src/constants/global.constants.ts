export const EXTENSION_NAME = "toremcommands";

export const DISABLE_ESLINT_RULE_LINE = {
  type: "ExpressionStatement",
  value: " eslint-disable import/newline-after-import ",
};

export const DISABLE_FORMAT_COMMENT = {
  type: "ExpressionStatement",
  value: " eslint-disable prettier/prettier ",
};
