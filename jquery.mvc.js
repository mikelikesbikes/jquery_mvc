(function($) {
  $.mvc = {
    View : function(name, source, options){
      this.settings = $.extend({}, $.mvc.View.defaults, options);
      this.name = name;
      this.template = (source instanceof $.Template)? source : new $.Template(source);
    }
  };
  $.mvc.View.defaults = {};
})(jQuery);
