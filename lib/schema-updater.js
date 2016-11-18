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
  let updated = { themes: {} };

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

export default {

  updateSchema(schema) {
    let version = schema.schemaVersion;

    switch (version) {
      default:
        return updateFromBetaToV1(schema);
    }
  }

};
