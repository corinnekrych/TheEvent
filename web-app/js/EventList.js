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
			if (data) {
				var eventList = new EventList();
				eventList.add(data);
				eventList.renderToHtml();
			}
		},
		error : function(xhr) {
			alert(xhr.responseText);
		}
	});
}

EventList.prototype.renderToHtml = function() {
/*	var template = '{#events}<li><a href="#section-show-event?id={id}" data-transition="fade">{name};{date}</a></li>{/events}';
	var compiled = dust.compile(template, "intro");
	dust.loadSource(compiled);*/
	var context = this.events;
/*	dust.render("intro", context, function(err, out) {
		$("#list-events").append(out);
		for ( var i = 0; i < context.events.length; i++) {
			var event = context.events[i];
			$("#section-events").data('Event_' + event.id, event);
			$(event).bind("refresh-event" + event.id + "-list", function(event, newEvent) {
				$("#section-events").data('Event_' + newEvent.id, newEvent);
			    alert("alert called to refresh list " + params);
			});
		}
		$('#list-events').listview('refresh');
	});*/
	var out
	for ( var i = 0; i < context.events.length; i++) {
		var event = context.events[i];
		out = '<li><a href="#section-show-event?id='+ event.id + '" data-transition="fade" id="event' + event.id + '-in-list">' + event.name +';' + event.date +'</a></li>';
		$("#section-events").data('Event_' + event.id, event);
		$(event).bind("refresh-event" + event.id + "-list", function(bind, newEvent) {
			var event = $("#section-events").data('Event_' + newEvent.id);
			$('#event' + newEvent.id + '-in-list').text(newEvent.name +';' + newEvent.date);
			for(var property in newEvent) {
				event[property] = newEvent[property];
			}
		});
	}
	$("#list-events").append(out);
	$('#list-events').listview('refresh');
}
