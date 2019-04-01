// Libraries
import jQuery from "jquery";
window.$ = jQuery;
window.jQuery = jQuery;

// Utilities
import toggleElement from "./utils/toggleElement";

$(document).ready(() => {
  $("body").addClass("dom-ready");
  toggleElement.init();
});
