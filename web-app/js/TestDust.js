function addToListWithDust() {
	$.ajax({
		cache : false,
		type : "GET",
		async : false,
		dataType : "jsonp",
		url : 'http://localhost:8080/TheEvent/event/list',
		success : function(data) {
			var eventList = new EventList();
			eventList.add(data);
			eventList.renderToDustTemplate();
		},
		error : function(xhr) {
			alert(xhr.responseText);
		}
	});
}
