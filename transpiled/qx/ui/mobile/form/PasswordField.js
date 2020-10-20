(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.form.TextField": {
        "require": true
      }
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
  
  ************************************************************************ */

  /**
   * The PasswordField is a single-line password input field.
   */
  qx.Class.define("qx.ui.mobile.form.PasswordField", {
    extend: qx.ui.mobile.form.TextField,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "password-field"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      // overridden
      _getType: function _getType() {
        return "password";
      }
    }
  });
  qx.ui.mobile.form.PasswordField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PasswordField.js.map?dt=1603197579961