const getDistLocation = importName =>
  importName ? `expo-web/dist/exports/${importName}` : undefined;

const isExpoRequire = (t, node) => {
  const { declarations } = node;
  if (declarations.length > 1) {
    return false;
  }
  const { id, init } = declarations[0];
  return (
    (t.isObjectPattern(id) || t.isIdentifier(id)) &&
    t.isCallExpression(init) &&
    t.isIdentifier(init.callee) &&
    init.callee.name === 'require' &&
    init.arguments.length === 1 &&
    (init.arguments[0].value === 'web' || init.arguments[0].value === 'expo-web')
  );
};

const isExpoModule = ({ source, specifiers }) =>
  source && (source.value === 'web' || source.value === 'expo-web') && specifiers.length;

module.exports = function({ types: t }) {
  return {
    name: 'Rewrite web to expo-web',
    visitor: {
      ImportDeclaration(path, state) {
        const { specifiers } = path.node;
        if (isExpoModule(path.node)) {
          const imports = specifiers
            .map(specifier => {
              if (t.isImportSpecifier(specifier)) {
                const importName = specifier.imported.name;
                const distLocation = getDistLocation(importName);

                if (distLocation) {
                  return t.importDeclaration(
                    [t.importDefaultSpecifier(t.identifier(specifier.local.name))],
                    t.stringLiteral(distLocation)
                  );
                }
              }
              return t.importDeclaration([specifier], t.stringLiteral('expo-web/dist/index'));
            })
            .filter(Boolean);

          path.replaceWithMultiple(imports);
        }
      },
      ExportNamedDeclaration(path, state) {
        const { specifiers } = path.node;
        if (isExpoModule(path.node)) {
          const exports = specifiers
            .map(specifier => {
              if (t.isExportSpecifier(specifier)) {
                const exportName = specifier.exported.name;
                const localName = specifier.local.name;
                const distLocation = getDistLocation(localName);

                if (distLocation) {
                  return t.exportNamedDeclaration(
                    null,
                    [t.exportSpecifier(t.identifier('default'), t.identifier(exportName))],
                    t.stringLiteral(distLocation)
                  );
                }
              }
              return t.exportNamedDeclaration(
                null,
                [specifier],
                t.stringLiteral('expo-web/dist/index')
              );
            })
            .filter(Boolean);

          path.replaceWithMultiple(exports);
        }
      },
      VariableDeclaration(path, state) {
        if (isExpoRequire(t, path.node)) {
          const { id } = path.node.declarations[0];
          if (t.isObjectPattern(id)) {
            const imports = id.properties
              .map(identifier => {
                const distLocation = getDistLocation(identifier.key.name);
                if (distLocation) {
                  return t.variableDeclaration(path.node.kind, [
                    t.variableDeclarator(
                      t.identifier(identifier.value.name),
                      t.memberExpression(
                        t.callExpression(t.identifier('require'), [t.stringLiteral(distLocation)]),
                        t.identifier('default')
                      )
                    )
                  ]);
                }
              })
              .filter(Boolean);

            path.replaceWithMultiple(imports);
          } else if (t.isIdentifier(id)) {
            const name = id.name;
            const importIndex = t.variableDeclaration(path.node.kind, [
              t.variableDeclarator(
                t.identifier(name),
                t.memberExpression(
                  t.callExpression(t.identifier('require'), [
                    t.stringLiteral('expo-web/dist/index')
                  ]),
                  t.identifier('default')
                )
              )
            ]);

            path.replaceWith(importIndex);
          }
        }
      }
    }
  };
};
