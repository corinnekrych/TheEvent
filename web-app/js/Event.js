function Event() {
	this.event = [];
}

$('#section-show-event').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	showEvent(id);
});

function showEvent(id) {
	var event = $("#section-events").data("Event_" + id);
	$('#input-event-name').val(event.name);
	$('#field-event-name').fieldcontain('refresh');
	$('#input-event-date').val(event.date);
	$('#field-event-date').fieldcontain('refresh');
	$('#input-event-id').val(event.id);
	$('#field-event-id').fieldcontain('refresh');
	$('#input-event-version').val(event.version);
	$('#field-event-version').fieldcontain('refresh');
	$('#input-event-class').val(event.class);
	$('#field-event-class').fieldcontain('refresh');
}


Event.prototype.renderToHtml = function() {
};

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}




function serializeObject(inputs) {
	  var arrayData, objectData;
	  arrayData = inputs;
	  objectData = {};

	  $.each(arrayData, function() {
	    var value;

	    if (this.value != null) {
	      value = this.value;
	    } else {
	      value = '';
	    }

	    if (objectData[this.name] != null) {
	      if (!objectData[this.name].push) {
	        objectData[this.name] = [objectData[this.name]];
	      }

	      objectData[this.name].push(value);
	    } else {
	      objectData[this.name] = value;
	    }
	  });

	  return objectData;
	}







$("#submit-event").live("click tap", function(){
	var div = $("#form-update-event");
	var inputs = div.find("input");
	var obj = serializeObject(inputs);
    var txt ={event:JSON.stringify(obj)};
    
    
    
    	$.ajax({
    		cache : false,
    		type : "POST",
    		async : false,
    		data : txt,
    		dataType : "jsonp",
    		url : 'http://localhost:8080/TheEvent/event/update',
    		success : function(data) {
    		    alert('success');
    		},
    		error : function(xhr) {
    			alert(xhr.responseText);
    		}
    	});
    
});

