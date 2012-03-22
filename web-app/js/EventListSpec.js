// corinne@dell:~/work/workspace/TheEvent/web-app$ java -jar js/lib/rhino/js.jar -opt -1 js/lib/rhino/envjs.bootstrap.js SpecRunner.html  
describe("behaviour of an event list, doing CRUD operations", function() {
	var eventList;

	beforeEach(function() {
		eventList = new EventList();
		eventList.init();
	});

	it("should add an event in the list", function() {
		var eventList = new EventList();
		eventList.init();
		eventList.addEventToList("wedding");
		expect(eventList.get(0)).toEqual("wedding");
	});
	
	it("should add a li in Html", function() {
		var eventList = new EventList();
		eventList.init();
		eventList.addEventToList("wedding");
		eventList.renderToHtml();
		expect(eventList.renderToHtml()).toEqual("wedding");
	});

});