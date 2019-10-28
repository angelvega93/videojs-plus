import videojs from 'video.js';

import { SettingMenuItem } from './SettingMenuItem.js';

export class SettingSubOptionItem extends SettingMenuItem {
  selectable: boolean;

  value: string;

  // FIXME:
  parent: any;

  constructor(player, options) {
    super(player, options);

    this.selectable = true;

    Object.assign(this, options);

    this.addChild('Component', {}, 0);
    this.addClass('vjs-settings-sub-menu-item');
    this.addClass('vjs-settings-sub-menu-option');

    this.update();
  }

  update() {
    this.selected(this.value === this.parent.selected.value);
  }

  handleClick() {
    this.parent.update(this);
    this.restore();
  }

  restore() {
    this.menu.restore();
  }
}

videojs.registerComponent('SettingSubOptionItem', SettingSubOptionItem);
