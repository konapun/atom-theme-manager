'use babel';

import { SelectListView } from 'atom-space-pen-views';

export default class ChangeThemeView extends SelectListView {

  constructor(themeManager) {
    super();
    this.modal = atom.workspace.addModalPanel({
      item: this,
      visible: false
    });
    this.addClass('overlay from-top');
    this.list.addClass('mark-active');

    this.themeManager = themeManager;
  }

  changeTheme() {
    this.setItems(this.themeManager.getThemeNames());
    this.modal.show();
    this.focusFilterEditor();
  }

  viewForItem(theme) {
    let el = document.createElement('li');
    el.textContent = theme;
    return el;
  }

  confirmed(theme) {
    this.themeManager.loadTheme(theme);
    this.modal.hide();
  }

  cancel() {
    super.cancel();
    this.modal.hide();
  }

  destroy() {
    this.modal.destroy();
  }
}
