function EventList() {
	this.events = [];
}

EventList.prototype.add = function(listEvent) {
	this.events = listEvent;
};

EventList.prototype.get = function(index) {
	return this.events[index];
};

EventList.prototype.renderToHtml = function() {
	for ( var i = 0; i < this.events.length; i++) {
		var event = this.events[i];
		$("#contentToAdd").append(
				'<li><a href="event-edit.html" data-rel="dialog" data-transition="fade">'
						+ event.name + '</a></li>');
	}
	$('#contentToAdd').listview('refresh');
};

EventList.prototype.renderToDustTemplate = function() {
	// {"date":"2012-03-25T22:00:00Z","id":1,"name":"ouiiiiiiii"}
	var template = '<li><a href="event-edit.html" data-rel="dialog" data-transition="fade">{#events}{name}{/events}</a></li>';
	var compiled = dust.compile(template, "intro");
	dust.loadSource(compiled);
	dust.render("intro", this.events, function(err, out) {
		$("#contentToAdd").append(out);
		$('#contentToAdd').listview('refresh');
	});
};
