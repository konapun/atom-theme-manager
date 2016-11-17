'use babel';

import { BaseSelectView } from './base-select-view';

export default class DeleteThemeView extends BaseSelectView {

  deleteTheme() {
    this.showListView();
  }

  confirm(theme) {
    this.themeManager.deleteTheme(theme);

    return () => {
      atom.notifications.addSuccess('Theme deleted');
    };
  }

}
