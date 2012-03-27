function EventList() {
	this.events = [];
}

EventList.prototype.add = function(listEvent) {
	this.events = listEvent;
};

EventList.prototype.get = function(index) {
	return this.events[index];
};

$('#section-events').live('pageinit', function(event) {
	getEvents();
});

function getEvents() {
	$.ajax({
		cache : false,
		type : "GET",
		async : false,
		dataType : "json",
		url : 'http://localhost:8080/TheEvent/event/list',
		success : function(data) {
			var eventList = new EventList();
			eventList.add(data);
			eventList.renderToHtml();
		},
		error : function(xhr) {
			alert(xhr.responseText);
		}
	});
}


EventList.prototype.renderToHtml = function() {
	for ( var i = 0; i < this.events.length; i++) {
		var event = this.events[i];
		$("#list-events").append('<li><a href="#section-show-event?id='+ event.id + '" data-transition="fade">' + event.name + ";" + event.date +'</a></li>');
		$("#section-events").data('Event_' + event.id, event);
	}
	$('#list-events').listview('refresh');
};
