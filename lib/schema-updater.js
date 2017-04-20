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

/*
 * v2 schema is similar to v1 schema with the addition of a name field which
 * matches the schema value's key. This was added to allow O(1) checking of
 * active themes
 */
function updateFromV1ToV2(schema) {
  let updated = {
    schemaVersion: 2,
    themes: {}
  };

  for (let themeName in schema.themes) {
    let theme = schema.themes[themeName];

    updated.themes[themeName] = Object.assign({}, theme, {
      name: themeName
    });
  }

  return updated;
}

const transforms = [ updateFromBetaToV1, updateFromV1ToV2 ];

export default {
  latestVersion: 2,

  updateSchema(schema) { // The first time this package is run there will be no version so just return the initial schema
    let version = schema.schemaVersion;

    if (Number.isInteger(version)) {
      let pipeline = transforms.slice(version);

      schema = pipeline.reduce((schemaSlice, transform) => { return transform(schemaSlice); }, schema);
    }

    return schema;
  }

};
