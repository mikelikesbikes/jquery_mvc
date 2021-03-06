(function($) {
  $.Template = function(str, options){

    this.settings = $.extend({}, $.Template.defaults, options);
    this.str = $.trim($('<div>').append($(str).clone()).remove().html()); // modify to take jquery, string, function

    this.fill = function(params) {
      regex = new RegExp(this.settings.begin_sep + "(.+?)" + this.settings.end_sep, "g");
      return this.str.replace(regex,
        function (m, key) {
          var value = params[key];
          return typeof value === 'string' || typeof value === 'number' ? value : "";
      });
    }
  }
  $.Template.defaults = {
    "begin_sep" : "__",
    "end_sep": "__"
  };

  (function(oldDomManip){
    $.fn.domManip = function() {
      var args = arguments[0];
      if(args && args.length > 1 && args[0] instanceof $.Template) {
        arguments[0] = [ args[0].fill(args[1]) ];
      }

      // Call the original method
      return oldDomManip.apply(this, arguments);
    }
  })($.fn.domManip);

  $.fn.templatize = function(params, options) {
    $this = $(this);
    var content = ($this.length > 0)? $this[0] : "";
    var template = new $.Template(content, options);
    return $(template.fill(params));
  }

  $.fn.outerHtml = function() {
    var str = "";
    if($(this) && $(this).length > 0) {
      str = $.trim($('<div>').append($(this)[0]).remove().html());
    }
    return str;
  }
})(jQuery);
