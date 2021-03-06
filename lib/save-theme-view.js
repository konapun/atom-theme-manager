'use babel';

import { TextEditorView } from 'atom-space-pen-views';

export default class SaveThemeView extends TextEditorView {

  constructor(themeManager) {
    super({
      mini: true,
      placeholderText: 'Save theme as'
    });

    this.modal = atom.workspace.addModalPanel({
      item: this,
      visible: false
    });

    this.addClass('from-top save-panel');
    this.addCommands();
    this.themeManager = themeManager;
  }

  addCommands() {
    atom.commands.add(this.element, {
      'core:confirm': (event) => {
        let themeName = this.getText();

        this.themeManager.saveTheme(themeName);
        this.modal.hide();
        atom.notifications.addSuccess('Theme saved');
      },
      'core:cancel': (event) => {
        event.stopPropagation();
        this.modal.hide();
      }
    });
  }

  saveTheme() {
    this.modal.show();
    this.focus();
  }
}
