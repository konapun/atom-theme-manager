'use babel';

import * as _ from 'lodash';

export default {

  schemaVersion: 1,

  updateSchema() {
    let currentConfig = atom.config.get(`theme-manager`);

    switch (currentConfig.schemaVersion) {
      default: // Versions below 1 didn't support syntax configurations
        // TODO
    }
  },

  saveTheme(themeName) {
    let uiTheme = this.getCurrentUiTheme().name;
    let syntaxTheme = this.getCurrentSyntaxTheme().name;

    let config = {
      syntax: {
        name: this.getCurrentSyntaxTheme().name,
      },
      ui: {
        name: uiTheme.name,
        config: atom.config.get(uiTheme)
      }
    };
    if (this.syntaxConfigEnabled()) {
      config.syntax.config = atom.config.get(syntaxTheme);
    }

    atom.config.set(`theme-manager.themes.${themeName}`, config);
  },

  syntaxConfigEnabled() {
    return atom.config.get(`theme-manager.saveSyntaxConfig`);
  },

  deleteTheme(themeName) {
    atom.config.set(`theme-manager.themes.${themeName}`, undefined);
  },

  /*
   * Returns whether or not the current loaded theme matches `themeName`
   * (does not yet check UI config)
   */
  isThemeLoaded(themeName) {
    let testTheme = atom.config.get(`theme-manager.themes.${themeName}`);

    console.log('(Syntax) Comparing ', testTheme.syntax.name, ' against ', this.getCurrentSyntaxTheme().name);
    console.log('(UI) Comparing ', testTheme.ui.name, ' against ', this.getCurrentUiTheme().name);
    return testTheme.syntax === this.getCurrentSyntaxTheme().name && testTheme.ui === this.getCurrentUiTheme().name;
  },

  getThemes() {
    return atom.config.get('theme-manager.themes');
  },

  getThemeNames() {
    return Object.keys(this.getThemes());
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
    let theme = atom.config.get(`theme-manager.themes.${themeName}`);

    atom.config.set(theme.ui, _.defaultsDeep(theme.config, atom.config.get(theme.ui))); // extend old config in case more settings were added in a package update
    atom.config.set('core.themes', [theme.ui, theme.syntax]);
  },

  getConfigurationDetails(themeName) {
    return atom.config.get(themeName);
  },

  getTheme(name) {
    return atom.themes.getLoadedThemes().find((theme) => {
      return theme.name === name;
    });
  }

};
