'use babel';

import { BaseSelectView } from './base-select-view';

export default class ChangeThemeView extends BaseSelectView {

  changeTheme() {
    this.showListView();
  }

  confirm(theme) {
    this.themeManager.loadTheme(theme);
  }
}
