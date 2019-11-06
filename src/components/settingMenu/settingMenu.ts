import videojs from 'video.js';

import CloseSettingMenu from './CloseSettingMenu';

const Menu = videojs.getComponent('Menu');

interface Origin {
  children: videojs.Component[];
  width: number;
  height: number;
}

interface Options extends videojs.MenuOptions {
  name: string;
}

const test: videojs.MenuOptions = {
  name: '123123'
};

export class SettingMenu extends Menu {
  contentEl_?: HTMLElement;

  origin!: Origin;

  constructor(player: videojs.Player, options: videojs.MenuOptions) {
    super(player, {
      ...options,
      name: 'SettingMenu'
    });

    this.addClass('vjs-setting-menu');

    setTimeout(this.reset.bind(this), 0);
  }

  reset() {
    if (!this.contentEl_) {
      return;
    }

    this.removeStyle();

    const { offsetWidth: width, offsetHeight: height } = this.contentEl_;

    this.origin = {
      children: this.children().slice(0),
      width,
      height
    };

    this.resize({
      width,
      height
    });

    /**
     *  Since the width of setting menu depends on screen width.
     *  If player is initialized on small screen size then resize to a bigger screen,
     *  the width of setting menu will be too wide as the origin width is affected by css,
     *  A class `vjs-setting-menu-ready` as a condition for css on small screen,
     *  therefore the origin width will not be affected.
     */
    this.addClass('vjs-setting-menu-ready');
  }

  createEl() {
    const el = super.createEl();
    const layer = new CloseSettingMenu(this.player_, {
      menu: this
    });

    el.insertBefore(layer.el_, el.firstElementChild);

    return el;
  }

  update(children = []) {
    const children_ = this.children().slice(0);

    children_.forEach(child => {
      this.removeChild(child);
    });

    children.forEach(child => {
      this.addChild(child);
    });
  }

  resize({ width, height }) {
    this.contentEl_.style.width = width + 'px';
    this.contentEl_.style.height = height + 'px';
  }

  restore() {
    this.resize(this.origin);

    this.update(this.origin.children);
  }

  removeStyle() {
    this.contentEl_.removeAttribute('style');
  }
}

videojs.registerComponent('SettingMenu', SettingMenu);
