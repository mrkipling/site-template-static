/**
 * Utility function that allows you to toggle an elements by adding a class name
 * and data attributes to another elements.
 *
 * Class to add to clickable element: js-toggle-element
 * data-toggleElement: element to toggle the state of (default show/hide)
 * data-slide: if set to true, $.fn.slideToggle the element instead of $.fn.toggle
 * data-toggleClass: if contains a string, this class is toggled instead of showing/hiding
 */

const toggleElement = {
  init: function() {
    $(".js-toggle-element").each(function() {
      const elementToToggle = $(this).data("toggle-element");
      const slide = $(this).data("slide");
      const toggleClass = $(this).data("toggle-class");

      $(this).on("click", e => {
        e.preventDefault();

        if (slide) {
          $("." + elementToToggle).slideToggle();
          return;
        }

        if (toggleClass) {
          $("." + elementToToggle).toggleClass(toggleClass);
          return;
        }

        $("." + elementToToggle).toggle();
      });
    });
  }
};

export default toggleElement;
