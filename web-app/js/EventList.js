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
		dataType : "jsonp",
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
	var template = '{#events}<li><a href="#section-show-event?id={id}" data-transition="fade">{name};{date}</a></li>{/events}';
	var compiled = dust.compile(template, "intro");
	dust.loadSource(compiled);
	var context = this.events;
	dust.render("intro", context, function(err, out) {
		$("#list-events").append(out);
		for ( var i = 0; i < context.events.length; i++) {
			var event = context.events[i];
			$("#section-events").data('Event_' + event.id, event);
		}
		$('#list-events').listview('refresh');
	});
};
