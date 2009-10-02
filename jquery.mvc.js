(function($) {
  $.mvc = {
    View : function(name, source, options){
      this.settings = $.extend({}, $.mvc.View.defaults, options);
      this.name = name;
      this.template = (source instanceof $.Template)? source : new $.Template(source);
      this.render = function(model) {
        $(this.settings.target).append(this.template.fill(model));
      }
    }
  };
  $.mvc.View.defaults = {};
})(jQuery);
