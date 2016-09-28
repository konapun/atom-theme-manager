'use babel';

import * as _ from 'lodash';

export default {

  saveTheme(themeName) {
    let uiTheme = this.getCurrentUiTheme();
    let uiConfig = atom.config.get(uiTheme.name);
    atom.config.set(`theme-manager.themes.${themeName}`, {
      syntax: this.getCurrentSyntaxTheme().name,
      ui: uiTheme.name,
      config: uiConfig
    });
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

  /*
   * Deactivate/activate loaded themes
   */
  _toggleTheme(name) {
    let theme = this.getTheme(name);

    if (theme) {
      let themeType = this.getTheme(name).metadata.theme;
      let currentTheme = this.getCurrentTheme(themeType);

      atom.packages.deactivatePackage(currentTheme.name);
      atom.packages.activatePackage(name);
      return true;
    }
    return false;
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
