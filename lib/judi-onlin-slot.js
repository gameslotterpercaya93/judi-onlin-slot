'use babel';

import JudiOnlinSlotView from './judi-onlin-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  judiOnlinSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.judiOnlinSlotView = new JudiOnlinSlotView(state.judiOnlinSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.judiOnlinSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'judi-onlin-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.judiOnlinSlotView.destroy();
  },

  serialize() {
    return {
      judiOnlinSlotViewState: this.judiOnlinSlotView.serialize()
    };
  },

  toggle() {
    console.log('JudiOnlinSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
