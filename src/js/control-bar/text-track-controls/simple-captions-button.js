/**
 * @file simple-captions-button.js
 */
import Button from '../../button.js';
import Component from '../../component.js';

/**
 * The button component for toggling and selecting captions
 *
 * @extends TextTrackButton
 */
class SimpleCaptionsButton extends Button {

  /**
   * Creates an instance of this class.
   *
   * @param {Player} player
   *        The `Player` that this class should be attached to.
   *
   * @param {Object} [options]
   *        The key/value store of player options.
   *
   * @param {Component~ReadyCallback} [ready]
   *        The function to call when this component is ready.
   */
  constructor(player, options, ready) {
    super(player, options, ready);
    this.language_ = options.playerOptions.language || 'en';
  }

  /**
   * Builds the default DOM `className`.
   *
   * @return {string}
   *         The DOM `className` for this object.
   */
  buildCSSClass() {
    return `vjs-captions-button ${super.buildCSSClass()}`;
  }

  /**
   * Allow sub components to stack CSS class names for the wrapper element
   *
   * @return {string}
   *         The constructed wrapper DOM `className`
   */
  buildWrapperCSSClass() {
    return `vjs-captions-button ${super.buildWrapperCSSClass()}`;
  }

  /**
   * Handle a click on a `SimpleCaptionsButton`.
   * See {@link ClickableComponent#handleClick} for instances where this is called.
   *
   * @param {EventTarget~Event} event
   *        The `keydown`, `tap`, or `click` event that caused this function to be
   *        called.
   *
   * @listens tap
   * @listens click
   */
  handleClick(event) {
    const tracks = this.player().textTracks();
    let track;
    let targetTrack;
    let i;

    // Since the button simply toggles only one track/language,
    // we should keep in mind that multiple tracks/languages
    // could be available. Which one to toggle then? If a track
    // is marked to be the default, that one takes precedence.
    // If not, it's the track that matches the player language.
    for (i = tracks.length; i--;) {
      track = tracks[i];
      if (track.kind === 'captions') {
        if (track.default === true) {
          targetTrack = track;
          break;
        }
        if (track.language === this.language_) {
          targetTrack = track;
        }
      }
    }

    // If it couldn't be clearly identified, refer to first track.
    targetTrack = targetTrack || (tracks.length > 0 ? tracks[0] : null);

    // Toggle
    if (targetTrack) {
      targetTrack.mode = targetTrack.mode !== 'showing' ? 'showing' : 'hidden';
    }
  }

}

/**
 * `kind` of TextTrack to look for to associate it with this menu.
 *
 * @type {string}
 * @private
 */
SimpleCaptionsButton.prototype.kind_ = 'captions';

/**
 * The text that should display over the `CaptionsButton`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */
SimpleCaptionsButton.prototype.controlText_ = 'Captions';

Component.registerComponent('SimpleCaptionsButton', SimpleCaptionsButton);
export default SimpleCaptionsButton;
