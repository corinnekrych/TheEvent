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
}

Event.prototype.renderToHtml = function() {
};

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}