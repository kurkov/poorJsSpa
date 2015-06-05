var UI = function() {

  this.templates = {};
  this.services = {};
};

UI.prototype.mapService = function(view, service) {
  this.services[view] = service;
}

UI.prototype.get = function(url, callback) {
  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.onload = function() {
    callback(req.responseText);
  }
  req.send();
}

UI.prototype.loadTemplate = function(name, url) {
  var self = this;

  this.get(url, function(view) {
     self.templates[name] = view;
  })
}

UI.prototype.render = function(elementId, view, data) {
  var div = document.getElementById(elementId);
  var template =  this.templates[view];
  var html = Mustache.render(template, data);
  div.innerHTML = html;
}

UI.prototype.gotoPage = function(elementId, view, id) {
  var service = this.services[view];
  var self = this;
  this.get(service, function(data) {
    console.log(data);
    self.render(elementId, view, data);
  })
}



//=========================
var ui = new UI();

ui.loadTemplate('categories', 'view/categories.html');
ui.loadTemplate('category', 'view/category.html');
ui.mapService('category', 'json/category.json');

ui.get('json/categories.json', function(data) {



  console.log(data);
  console.log(ui.templates.categories);
  ui.render('container', 'categories', JSON.parse(data));
});