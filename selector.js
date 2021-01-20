//document.querySelectorAll('[role=\"listitem\"]').item(1).item(1).item(2).item(1).item(1).innerText
//document.querySelectorAll('[class=\"ZjFb7c\"]')

var nodes = document.querySelectorAll('[class=\"ZjFb7c\"]')
var list = [].slice.call(nodes);
list.map(function(e) { return e.innerText; });