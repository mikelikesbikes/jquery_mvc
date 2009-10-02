(function($){

module("describe a view when instantiating");
test("it should set its name", function(){
  var view = new $.mvc.View("test_view", $("#view_template"));
  equals(view.name, "test_view");
});
test("it should create a template from source", function() {
  var view = new $.mvc.View("test_view", "#view_template");
  ok(view.template instanceof $.Template);
});
test("it should accept a template", function() {
  var template = new $.Template("#view_template");
  var view = new $.mvc.View("test_view", template);
  same(view.template, template);
});
test("it should build settings from defaults", function() {
  $.mvc.View.defaults = {"key": "value"}
  var view = new $.mvc.View("test_view", "#view_template", {"extra":"new_extra_value"});
  equals(view.settings.key, "value");
});
test("it should override defaults with options", function() {
  $.mvc.View.defaults = {"key": "value", "extra": "extra_value"}
  var view = new $.mvc.View("test_view", "#view_template", {"extra":"new_extra_value"});
  equals(view.settings.key, "value");
  equals(view.settings.extra, "new_extra_value");
});

module("describe a view when rendering", {
  setup: function() {
    this.template = new $.Template("#view_template");
    this.view = new $.mvc.View("test_view", this.template);
    this.model = {}
    window.template_filled = false;
  }
});
test("it should fill the template with model", function() {
  this.template.settings.afterFill = function() {
    window.template_filled = true;
  }

  this.view.render(this.model);
  ok(window.template_filled, "template should have been filled");
});
test("it should append the filled template to the target", function() {
  this.view.settings.target = "#target"
  this.view.render(this.model);
  equals($("#target").children().length, 1)
});

})(jQuery);