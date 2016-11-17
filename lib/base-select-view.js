'use babel';

import { SelectListView } from 'atom-space-pen-views';

export class BaseSelectView extends SelectListView {

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

  showListView() {
    this.setItems(this.themeManager.getThemeNames());
    this.modal.show();
    this.focusFilterEditor();
  }

  viewForItem(theme) {
    let el = document.createElement('li');
    el.textContent = theme;
    if (this.themeManager.isThemeLoaded(theme)) {
      console.log(`!!!!! Theme ${theme} is loaded`);
      el.addClass('active');
    }

    return el;
  }

  confirm(theme) {
    throw new Error("Class must override 'confirm'");
  }

  confirmed(theme) {
    let postconfirm = this.confirm(theme);
    this.modal.hide();

    if (postconfirm) {
      postconfirm();
    }
  }

  cancel() {
    super.cancel();
    this.modal.hide();
  }

  destroy() {
    this.modal.destroy();
  }
}
