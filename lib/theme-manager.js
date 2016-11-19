'use babel';

import * as _ from 'lodash';
import schemaUpdater from './schema-updater';

const packageConfig = 'atom-theme-manager'; // location where user-changeable settings are stored
const legacyConfig = 'theme-manager'; // beta versions stored themes under this namespace
const packageThemeStore = `${packageConfig}_themeStore`; // this is stored under a different namespace because saving theme configs under the package namespace bloats settings and makes everything load slowly

const schemaVersion = 1; // version of the config schema used by this package for storing/loading themes

export default {

  updateSchema() {
    let currentConfig = atom.config.get(packageThemeStore);
    if (!currentConfig) { // the first time this is run the theme store will be undefined
      currentConfig = {
        themes: {}
      };
    }

    if (currentConfig.schemaVersion !== schemaVersion) {
      let legacy = atom.config.get(legacyConfig);
      if (legacy) { // theme config was previously saved under "theme-manager". If the legacy store still exists then the schema hasn't been updated
        currentConfig = legacy;
        currentConfig.schemaVersion = 0;
      }

      currentConfig = schemaUpdater.updateSchema(currentConfig);
      currentConfig.schemaVersion = schemaVersion;
      atom.config.set(packageThemeStore, currentConfig);
      atom.config.set(legacyConfig, undefined); // delete the old config as it's no longer needed
    }
  },

  saveTheme(themeName) {
    let uiTheme = this.getCurrentUiTheme().name;
    let syntaxTheme = this.getCurrentSyntaxTheme().name;

    let config = {
      syntax: {
        name: syntaxTheme
      },
      ui: {
        name: uiTheme
      }
    };

    // These settings are enabled/disabled in package settings for this package
    if (this.syntaxConfigEnabled()) {
      config.syntax.config = atom.config.get(syntaxTheme);
    }
    if (this.uiConfigEnabled()) {
      config.ui.config = atom.config.get(uiTheme);
    }

    atom.config.set(`${packageThemeStore}.themes.${themeName}`, config);
  },

  uiConfigEnabled() {
    return atom.config.get(`${packageConfig}.saveUiConfig`);
  },

  syntaxConfigEnabled() {
    return atom.config.get(`${packageConfig}.saveSyntaxConfig`);
  },

  deleteTheme(themeName) {
    atom.config.set(`${packageThemeStore}.themes.${themeName}`, undefined);
  },

  /*
   * Returns whether or not the current loaded theme matches `themeName`
   * (does not yet check UI config)
   */
  isThemeLoaded(themeName) {
    let testTheme = atom.config.get(`${packageThemeStore}.themes.${themeName}`);

    return testTheme.syntax.name === this.getCurrentSyntaxTheme().name && testTheme.ui.name === this.getCurrentUiTheme().name;
  },

  getThemes() {
    return atom.config.get(`${packageThemeStore}.themes`);
  },

  getCurrentSyntaxTheme() {
    return this.getCurrentTheme('syntax');
  },

  getCurrentUiTheme() {
    return this.getCurrentTheme('ui');
  },

  getCurrentTheme(type) {
    let found = atom.themes.getActiveThemes().find((active) => {
      return active.metadata.theme === type;
    });
    return found;
  },

  getThemeNames() {
    let themes = this.getThemes();
    return themes ? Object.keys(themes) : [];
  },

  /*
   * Load a saved theme by name
   */
  loadTheme(themeName) {
    let theme = atom.config.get(`${packageThemeStore}.themes.${themeName}`);

    if (theme.ui.config) {
      atom.config.set(theme.ui.name, _.defaultsDeep(theme.ui.config, atom.config.get(theme.ui.name))); // extend old config in case more settings were added in a package update
    }
    if (theme.syntax.config) {
      atom.config.set(theme.syntax.name, _.defaultsDeep(theme.syntax.config, atom.config.get(theme.syntax.name))); // extend syntax theme config as well
    }
    atom.config.set('core.themes', [theme.ui.name, theme.syntax.name]);
  },

  getTheme(name) {
    return atom.themes.getLoadedThemes().find((theme) => {
      return theme.name === name;
    });
  }

};
