export default function getASTbody(ast: any) {
  const type = ast.body[2].type;

  if (type === "ExportNamedDeclaration") {
    return ast.body[2].declaration.declarations[0];
  }

  return ast.body[2].declarations[0];
}
