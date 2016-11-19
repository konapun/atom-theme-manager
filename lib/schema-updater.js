'use babel';

/*
 * Beta configurations looked like
 *
 * {
 *   "themes": {
 *     "example1": {
 *       "syntax": "syntax-theme-name",
 *       "ui": "ui-theme-name",
 *       "config": {
 *          // the config for the UI theme
 *       }
 *     },
 *     ...
 *   }
 * }
 */
function updateFromBetaToV1(schema) {
  let updated = {
    schemaVersion: 1,
    themes: {}
  };

  for (let themeName in schema.themes) {
    let theme = schema.themes[themeName];

    updated.themes[themeName] = {
      syntax: {
        name: theme.syntax
      },
      ui: {
        name: theme.ui,
        config: theme.config
      }
    };
  }

  return updated;
}

function createInitialSchema
export default {

  updateSchema(schema) {
    let version = schema.schemaVersion;

    switch (version) {
      case 0:
        return updateFromBetaToV1(schema);
      default: // The first time this package is run there will be no version so just return the initial schema
        return schema;
    }
  }

};
