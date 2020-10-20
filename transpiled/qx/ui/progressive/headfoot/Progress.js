(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.headfoot.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true
      },
      "qx.ui.basic.Atom": {
        "construct": true
      },
      "qx.theme.manager.Color": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2008 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * The standard footer used with Progressive's Table renderer, to show
   * progress of loading data into the table.
   */
  qx.Class.define("qx.ui.progressive.headfoot.Progress", {
    extend: qx.ui.progressive.headfoot.Abstract,

    /**
     * @param columnWidths {qx.ui.progressive.renderer.table.Widths}
     *   The set of widths, minimum widths, and maximum widths to be used for
     *   each of the columns in the table.
     *
     * @param labelArr {Array}
     *   Array of labels, one for each of the columns.
     *
     */
    construct: function construct(columnWidths, labelArr) {
      qx.ui.progressive.headfoot.Abstract.constructor.call(this); // Set a default height for the progress bar

      this.setHeight(16);
      this.setPadding(0);
      this.__P_324_0 = {};

      this.__P_324_1();

      this.set({
        backgroundColor: this.__P_324_0.background
      }); // Create a widget that continually increases its width for progress bar

      this.__P_324_2 = new qx.ui.core.Widget();

      this.__P_324_2.set({
        width: 0,
        backgroundColor: this.__P_324_0.indicatorDone
      });

      this.add(this.__P_324_2); // Create a flex area between the progress bar and the percent done

      var spacer = new qx.ui.core.Widget();
      spacer.set({
        backgroundColor: this.__P_324_0.indicatorUndone
      });
      this.add(spacer, {
        flex: 1
      }); // We also like to show progress as a percentage done string.

      this.__P_324_3 = new qx.ui.basic.Atom("0%");

      this.__P_324_3.set({
        width: 100,
        backgroundColor: this.__P_324_0.percentBackground,
        textColor: this.__P_324_0.percentText
      });

      this.add(this.__P_324_3); // We're initially invisible

      this.exclude();
    },
    members: {
      __P_324_4: null,
      __P_324_0: null,
      __P_324_2: null,
      __P_324_3: null,
      // overridden
      _onChangeTheme: function _onChangeTheme() {
        qx.ui.progressive.headfoot.Progress.prototype._onChangeTheme.base.call(this);

        this.__P_324_1();
      },

      /**
       * Helper to link the theme colors to the current class.
       */
      __P_324_1: function __P_324_1() {
        // link to color theme
        var colorMgr = qx.theme.manager.Color.getInstance();
        this.__P_324_0.background = colorMgr.resolve("progressive-progressbar-background");
        this.__P_324_0.indicatorDone = colorMgr.resolve("progressive-progressbar-indicator-done");
        this.__P_324_0.indicatorUndone = colorMgr.resolve("progressive-progressbar-indicator-undone");
        this.__P_324_0.percentBackground = colorMgr.resolve("progressive-progressbar-percent-background");
        this.__P_324_0.percentText = colorMgr.resolve("progressive-progressbar-percent-text");
      },
      // overridden
      join: function join(progressive) {
        // Save the progressive handle
        qx.ui.progressive.headfoot.Progress.prototype.join.base.call(this, progressive); // Listen for the "renderStart" event, to save the number of elements on
        // the queue, and to set ourself visible

        progressive.addListener("renderStart", function (e) {
          this.__P_324_4 = e.getData().initial;
          this.show();
        }, this); // Listen for the "progress" event, to update the progress bar

        progressive.addListener("progress", function (e) {
          var complete = 1.0 - e.getData().remaining / this.__P_324_4;

          var mySize = this.getBounds();

          if (mySize) {
            var barWidth = Math.floor((mySize.width - this.__P_324_3.getBounds().width) * complete);
            var percent = Math.floor(complete * 100) + "%";

            if (!isNaN(barWidth)) {
              this.__P_324_2.setMinWidth(barWidth);

              this.__P_324_3.setLabel(percent);
            }
          }
        }, this); // Listen for the "renderEnd" event to make ourself invisible

        progressive.addListener("renderEnd", function (e) {
          this.exclude();
        }, this);
      }
    },
    destruct: function destruct() {
      this.__P_324_0 = null;

      this._disposeObjects("__P_324_2", "__P_324_3");
    }
  });
  qx.ui.progressive.headfoot.Progress.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Progress.js.map?dt=1603197361535