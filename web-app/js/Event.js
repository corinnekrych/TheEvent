function Event() {
	this.event = [];
}

$('#section-show-event').live('pageshow', function(e) {
	var url = $(e.target).attr("data-url");
	var matches = url.match(/\?id=(.*)/);
	if (matches != null) {
		showEvent(matches[1]);
	} else {
		createEvent();
	}
});

function createEvent() {
	var div = $("#form-update-event");
	var inputs = div.find("input");
	$.each(inputs, function (index, element) {
		
		$(element).val("");
		
	});
	$("#delete-event").hide();
}

function showEvent(id) {
	var event = $("#section-events").data("Event_" + id);
	$('#input-event-name').val(event.name);
	$('#field-event-name').fieldcontain('refresh');
	$('#input-event-date').val(event.date);
	$('#field-event-date').fieldcontain('refresh');
	
	$('#input-event-booleanType').val(event.booleanType);
	$('#field-event-booleanType').fieldcontain('refresh');
	
	$('#input-event-id').val(event.id);
	$('#field-event-id').fieldcontain('refresh');
	$('#input-event-version').val(event.version);
	$('#field-event-version').fieldcontain('refresh');
	$('#input-event-class').val(event.class);
	$('#field-event-class').fieldcontain('refresh');
	$("#delete-event").show();
}

Event.prototype.renderToHtml = function() {
};

function serializeObject(inputs) {
	var objectData = {};

	$.each(inputs, function() {
		var value;

		if (this.type == "radio" ) {
			value = this.checked;
		} else if (this.type == "checkbox" ) {
			value = this.checked;
		} else {
			if (this.value != null) {
				value = this.value;
			} else {
				value = '';
			}
		}
		
		if (objectData[this.name] != null) {
			if (!objectData[this.name].push) {
				objectData[this.name] = [ objectData[this.name] ];
			}

			objectData[this.name].push(value);
		} else {
			objectData[this.name] = value;
		}
	});

	return objectData;
}

$("#submit-event").live("click tap", function() {
	var div = $("#form-update-event");
	var inputs = div.find("input");
	var obj = serializeObject(inputs);
	var action = "update";
	if (obj.id == "") {
		action= "save";
	}
	var txt = {
		event : JSON.stringify(obj)
	};

	$.ajax({
		cache : false,
		type : "POST",
		async : false,
		data : txt,
		dataType : "jsonp",
		url : serverUrl + '/event/' + action,
		success : function(data) {
			if (action == "save") {
				addEventOnSection(data);
				$('#list-events').listview('refresh');
			} else {
				var event = $("#section-events").data('Event_' + data.id);
				$(event).trigger("refresh-event"+ data.id + "-list", data);
			}
		},
		error : function(xhr) {
			alert(xhr.responseText);
		}
	});

});


$("#delete-event").live("click tap", function() {
	var eventId = $('#input-event-id').val();
	var txt = { id : eventId };
	$.ajax({
		cache : false,
		type : "POST",
		async : false,
		data : txt,
		dataType : "jsonp",
		url : serverUrl + '/event/delete',
		success : function(data) {
			removeEventOnSection(data.id);
		},
		error : function(xhr) {
			alert(xhr.responseText);
		}
	});
});