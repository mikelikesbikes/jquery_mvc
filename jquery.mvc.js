(function($) {
  $.mvc = {};
  $.mvc.View = function(str, options){
    this.settings = $.extend({}, $.mvc.View.defaults, options);
    this.settings.template = new $.Template(str, this.settings.templateOptions);
    this.render = function(model) {
      this.settings.template.fill(model);
    }
  }
})(jQuery);
