import videojs from 'video.js';

const { IS_IPHONE, IOS_VERSION, TOUCH_ENABLED } = videojs.browser;

videojs.hook('setup', vjsPlayer => {
  vjsPlayer.playsinline(vjsPlayer.options_.playsinline !== false);

  vjsPlayer.addClass('video-js');

  if (IS_IPHONE) {
    vjsPlayer.addClass('vjs-is-iphone');
    if (IOS_VERSION && IOS_VERSION < 11) {
      vjsPlayer.addClass('vjs-iphone-below-11');
    }
  }

  TOUCH_ENABLED && vjsPlayer.removeClass('vjs-workinghover');
});
