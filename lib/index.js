'use babel';

import { CompositeDisposable } from 'atom';
import ChangeThemeView from './change-theme-view';
import SaveThemeView from './save-theme-view';
import themeManager from './theme-manager';
import config from './config-schema';

export default {

  changeThemeView: null,
  saveThemeView: null,
  subscriptions: null,
  config: config,

  activate(state) {
    this.changeThemeView = new ChangeThemeView(themeManager);
    this.saveThemeView = new SaveThemeView(themeManager);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {

      'theme-manager:save-theme': () => {
        this.saveThemeView.saveTheme();
      },

      'theme-manager:change-theme': () => {
        this.changeThemeView.changeTheme();
      }

    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.changeThemeView.destroy();
    this.saveThemeView.destroy();
  },

  serialize() {
    return {
      changeThemeViewState: this.changeThemeView.serialize(),
      // saveThemeViewState: this.saveThemeView.serialize()
    };
  }

};
