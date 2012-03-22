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
		$("#contentToAdd").append('<li><a href="event-edit.html" data-rel="dialog" data-transition="fade">' + event.name + '</a></li>');
	}
	$('#contentToAdd').listview('refresh');
};
