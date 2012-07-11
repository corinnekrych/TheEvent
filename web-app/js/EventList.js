function EventList() {
	this.events = [];
}

EventList.prototype.add = function(listEvent) {
	this.events = listEvent;
};

EventList.prototype.get = function(index) {
	return this.events[index];
};

//serverUrl = 'http://localhost:8080/TheEvent';
serverUrl = 'http://TheEvent.cloudfoundry.com'	

$('#section-events').live('pageinit', function(event) {
	getEvents();
});

function getEvents() {
	$.ajax({
		cache : false,
		type : "GET",
		async : false,
		dataType : "jsonp",
		url : serverUrl + '/event/list',
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
	var context = this.events;
	for ( var i = 0; i < context.events.length; i++) {
		var event = context.events[i];
		addEventOnSection(event);
	}
	$('#list-events').listview('refresh');
}


function addEventOnSection (event) {
	var out = '<li><a href="#section-show-event?id='+ event.id + '" data-transition="fade" id="event' + event.id + '-in-list">' + event.name +';' + event.date +'</a></li>';
	$("#section-events").data('Event_' + event.id, event);
	$(event).bind("refresh-event" + event.id + "-list", function(bind, newEvent) {
		var event = $("#section-events").data('Event_' + newEvent.id);
		$('#event' + newEvent.id + '-in-list').text(newEvent.name +';' + newEvent.date);
		for(var property in newEvent) {
			event[property] = newEvent[property];
		}
	});
	$("#list-events").append(out);
}

function removeEventOnSection(id) {
	var listID = 'event' + id + '-in-list';
	var link = $("#" + listID);
	link.parents('li').remove();
	var event = $("#section-events").data('Event_' + id, event);
	$("#section-events").data('Event_' + id, null);
	$(event).unbind();
	$('#list-events').listview('refresh');
}

