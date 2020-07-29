(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.lang.Function": {
        "construct": true
      },
      "qx.bom.Event": {
        "construct": true
      },
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */

  /**
   *
   * Media element. Other media types can derive from this class.
   * 
   * NOTE: Instances of this class must be disposed of to free resources
   */
  qx.Class.define("qx.bom.media.Abstract", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],
    type: "abstract",

    /**
     * @param media {var} the media element.
     */
    construct: function construct(media) {
      qx.core.Object.constructor.call(this);
      this._media = media;
      this._hasLoop = !!this._media.loop;
      var Function = qx.lang.Function;
      this._handlePlayEventBound = Function.bind(this._handlePlayEvent, this);
      this._handlePauseEventBound = Function.bind(this._handlePauseEvent, this);
      this._handleTimeUpdateEventBound = Function.bind(this._handleTimeUpdateEvent, this);
      this._handleEndedEventBound = Function.bind(this._handleEndedEvent, this);
      this._handleVolumeChangeEventBound = Function.bind(this._handleVolumeChangeEvent, this);
      this._handleLoadedDataEventBound = Function.bind(this._handleLoadedDataEvent, this);
      this._handleLoadedMetaDataEventBound = Function.bind(this._handleLoadedMetaDataEvent, this);
      var Event = qx.bom.Event;
      Event.addNativeListener(this._media, "play", this._handlePlayEventBound);
      Event.addNativeListener(this._media, "pause", this._handlePauseEventBound);
      Event.addNativeListener(this._media, "timeupdate", this._handleTimeUpdateEventBound);
      Event.addNativeListener(this._media, "ended", this._handleEndedEventBound);
      Event.addNativeListener(this._media, "volumechange", this._handleVolumeChangeEventBound);
      Event.addNativeListener(this._media, "loadeddata", this._handleLoadedDataEventBound);
      Event.addNativeListener(this._media, "loadedmetadata", this._handleLoadedMetaDataEventBound); // set default value

      this._media.preload = "auto";
    },
    //MORE HERE:
    //http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html#mediaevents
    events: {
      /** Fired when the media starts to play */
      "play": "qx.event.type.Event",

      /** Fired when the media is paused */
      "pause": "qx.event.type.Event",

      /** Fired when the current time of the media has changed */
      "timeupdate": "qx.event.type.Event",

      /** Fired when the media has finished to play */
      "ended": "qx.event.type.Event",

      /** Fired when the volume property is changed */
      "volumechange": "qx.event.type.Event",

      /** Fired when the media is loaded enough to start play*/
      "loadeddata": "qx.event.type.Event",

      /** Fired when the media is loaded enough to start play*/
      "loadedmetadata": "qx.event.type.Event"
    },
    members: {
      _media: null,
      _hasLoop: false,
      _loopId: null,

      /**
       * Returns the media object, so that you can add it to the DOM.
       *
       * @return {Object} the native media object
       */
      getMediaObject: function getMediaObject() {
        return this._media;
      },

      /**
       * Starts playback of the media.
       */
      play: function play() {
        // Force asynchronous event firing for IE e.g.
        qx.event.Timer.once(function () {
          this._media.play();
        }, this, 0);
      },

      /**
       * Pauses playback of the media.
       */
      pause: function pause() {
        this._media.pause();
      },

      /**
       * Checks if the media is paused or not.
       *
       * @return {Boolean}
       */
      isPaused: function isPaused() {
        return this._media.paused;
      },

      /**
       * Checks if the media is ended or not.
       *
       * @return {Boolean}
       */
      isEnded: function isEnded() {
        return this._media.ended;
      },

      /**
       * Sets the id of the media.
       *
       * @param id {String} The new value of id
       */
      setId: function setId(id) {
        this._media.id = id;
      },

      /**
       * Gets the id of the media.
       *
       * @return {String} the id of the media element
       */
      getId: function getId() {
        return this._media.id;
      },

      /**
       * Whether the browser can play the file format.
       *
       * @param type {String} the file format
       * @return {Boolean}
       */
      canPlayType: function canPlayType(type) {
        return this._media.canPlayType(type);
      },

      /**
       * Sets the current playback volume, as a number in the range 0.0 to 1.0,
       * where 0.0 is the quietest and 1.0 the loudest.
       *
       * @param volume {Number} 0.0 - 1.0
       */
      setVolume: function setVolume(volume) {
        this._media.volume = volume;
      },

      /**
       * Gets the current playback volume, as a number in the range 0.0 to 1.0,
       * where 0.0 is the quietest and 1.0 the loudest.
       *
       * @return {Number} 0.0 - 1.0
       */
      getVolume: function getVolume() {
        return this._media.volume;
      },

      /**
       * Sets the media element to mute.
       *
       * @param muted {Boolean} new value for mute
       */
      setMuted: function setMuted(muted) {
        this._media.muted = muted;
      },

      /**
       * Checks if the media element is muted or not
       *
       * @return {Boolean}
       */
      isMuted: function isMuted() {
        return this._media.muted;
      },

      /**
       * Gets the duration of the loaded media file.
       *
       * @return {Number} the duration
       */
      getDuration: function getDuration() {
        return this._media.duration;
      },

      /**
       * Sets the value of current time.
       *
       * @param value {Number} the new value of current time
       */
      setCurrentTime: function setCurrentTime(value) {
        this._media.currentTime = value;
      },

      /**
       * Gets current time of the playback.
       *
       * @return {Number} the current time
       */
      getCurrentTime: function getCurrentTime() {
        return this._media.currentTime;
      },

      /**
       * Sets the source url of the media file.
       *
       * @param source {String} the source url to the media file.
       */
      setSource: function setSource(source) {
        this._media.src = source;
      },

      /**
       * Gets the source url of the media file.
       *
       * @return {String} the source url to the media file.
       */
      getSource: function getSource() {
        return this._media.src;
      },

      /**
       * Sets the source object of the media file.
       *
       * @param sourceObject {MediaStream} the source media stream.
       */
      setSourceObject: function setSourceObject(sourceObject) {
        this._media.srcObject = sourceObject;
      },

      /**
       * Gets the source object of the media file.
       *
       * @return {MediaStream|null} the source stream object to the media file, if it exists.
       */
      getSourceObject: function getSourceObject() {
        return this._media.srcObject;
      },

      /**
       * Checks if the media element shows its controls.
       *
       * @return {Boolean}
       */
      hasControls: function hasControls() {
        return this._media.controls;
      },

      /**
       * Shows the controls of the media element.
       */
      showControls: function showControls() {
        this._media.controls = true;
      },

      /**
       * Hides the controls of the media element.
       */
      hideControls: function hideControls() {
        this._media.controls = false;
      },

      /**
       * Plays the media directly when it is loaded / the page is loaded.
       *
       *  @param autoplay {Boolean} To autoplay or not
       */
      setAutoplay: function setAutoplay(autoplay) {
        this._media.autoplay = autoplay;
      },

      /**
       * Whether the media is played directly when it is loaded / the page is loaded.
       *
       *  @return {Boolean} if autoplay is on or not
       */
      getAutoplay: function getAutoplay() {
        return this._media.autoplay;
      },

      /**
       * Hints how much buffering the media resource will likely need.
       *
       * @param preload {String} One of the following values:
       *  "none": Hints to the user agent that either the author does not expect
       *  the user to need the media resource, or that the server wants to minimize
       *  unnecessary traffic.
       *  "metadata": Hints to the user agent that the author does not expect the
       *  user to need the media resource, but that fetching the resource metadata
       *  (dimensions, first frame, track list, duration, etc) is reasonable.
       *  "auto": Hints to the user agent that the user agent can put the user's needs
       *  first without risk to the server, up to and including optimistically
       *  downloading the entire resource.
       */
      setPreload: function setPreload(preload) {
        if (preload == "none" || preload == "metadata" || preload == "auto") {
          this._media.preload = preload;
        } else {
          // Set auto as default
          this._media.preload = "auto";
        }
      },

      /**
       * Returns how much buffering the media resource will likely need.
       *
       * @return {String} hint how much buffering the media resource needs
       */
      getPreload: function getPreload() {
        return this._media.preload;
      },

      /**
       * Indicates that the media element is to seek back to the start of the media resource upon reaching the end.
       *
       * @param value {Boolean} To loop or not.
       */
      setLoop: function setLoop(value) {
        //ff doesn't have loop
        if (!this._hasLoop) {
          if (value === true) {
            this._loopId = this.addListener('ended', this.play, this);
          } else if (value === false && this._loopId) {
            this.removeListenerById(this._loopId);
            this._loopId = null;
          }
        }

        this._media.loop = value;
      },

      /**
       * Whether the media element is to seek back to the start of the media resource upon reaching the end.
       *
       * @return {Boolean} if loop is on or not
       */
      isLoop: function isLoop() {
        return !!this._media.loop;
      },

      /**
       * Play event handler.
       */
      _handlePlayEvent: function _handlePlayEvent() {
        this.fireEvent("play");
      },

      /**
       * Pause event handler.
       */
      _handlePauseEvent: function _handlePauseEvent() {
        this.fireEvent("pause");
      },

      /**
       * Time Update event handler.
       */
      _handleTimeUpdateEvent: function _handleTimeUpdateEvent() {
        this.fireEvent("timeupdate");
      },

      /**
       * Ended event handler.
       */
      _handleEndedEvent: function _handleEndedEvent() {
        this.fireEvent("ended");
      },

      /**
       * Volume Change event handler.
       */
      _handleVolumeChangeEvent: function _handleVolumeChangeEvent() {
        this.fireEvent("volumechange");
      },

      /**
       * Loaded Data event handler.
       */
      _handleLoadedDataEvent: function _handleLoadedDataEvent() {
        this.fireEvent("loadeddata");
      },

      /**
       * Loaded Metadata event handler.
       */
      _handleLoadedMetaDataEvent: function _handleLoadedMetaDataEvent() {
        this.fireEvent("loadedmetadata");
      }
    },
    destruct: function destruct() {
      var Event = qx.bom.Event;
      Event.removeNativeListener(this._media, "play", this._handlePlayEventBound);
      Event.removeNativeListener(this._media, "pause", this._handlePauseEventBound);
      Event.removeNativeListener(this._media, "timeupdate", this._handleTimeUpdateEventBound);
      Event.removeNativeListener(this._media, "ended", this._handleEndedEventBound);
      Event.removeNativeListener(this._media, "volumechange", this._handleVolumeChangeEventBound);
      Event.removeNativeListener(this._media, "loadeddata", this._handleLoadedDataEventBound);
      Event.removeNativeListener(this._media, "loadedmetadata", this._handleLoadedMetaDataEventBound);

      try {
        // IE9 sometimes throws an can't access error
        this.pause();
      } catch (ex) {}

      this.setSource("");
      this._media = null;
    }
  });
  qx.bom.media.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1596060975292