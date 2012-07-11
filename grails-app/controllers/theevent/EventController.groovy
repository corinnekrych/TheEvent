package theevent

import grails.converters.JSON
import grails.validation.ValidationErrors
import groovy.json.JsonBuilder;

import org.codehaus.groovy.grails.web.json.JSONObject;
import org.springframework.dao.DataIntegrityViolationException

class EventController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }
	
    def list() {

     	render Event.list(params) as JSON
		 
        //params.max = Math.min(params.max ? params.int('max') : 10, 100)
        //[eventInstanceList: Event.list(params), eventInstanceTotal: Event.count()]
    }

    def create() {
       [eventInstance: new Event(params)]
    }

    def save() {
      def jsonObject = JSON.parse(params.event)
      Event eventInstance = new Event(jsonObject)
        if (!eventInstance.save(flush: true)) {
//            render(view: "create", model: [eventInstance: eventInstance])
            return
        }
      render eventInstance as JSON
//        def eventInstance = new Event(params)
//        if (!eventInstance.save(flush: true)) {
//            render(view: "create", model: [eventInstance: eventInstance])
//            return
//        }
//
//		flash.message = message(code: 'default.created.message', args: [message(code: 'event.label', default: 'Event'), eventInstance.id])
//        redirect(action: "show", id: eventInstance.id)
    }

    def show() {
		render Event.get(params.id) as JSON
//        def eventInstance = Event.get(params.id)
//        if (!eventInstance) {
//			flash.message = message(code: 'default.not.found.message', args: [message(code: 'event.label', default: 'Event'), params.id])
//            redirect(action: "list")
//            return
//        }
//
//        [eventInstance: eventInstance]
    }

    def edit() {
        def eventInstance = Event.get(params.id)
        if (!eventInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'event.label', default: 'Event'), params.id])
            redirect(action: "list")
            return
        }

        [eventInstance: eventInstance]
    }

    def update() {
      def jsonObject = JSON.parse(params.event)
      Event eventReceived = new Event(jsonObject)

        def eventInstance = Event.get(jsonObject.id)
        if (!eventInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'event.label', default: 'Event'), params.id])
            redirect(action: "list")
            return
        }

        if (jsonObject.version) {
          def version = jsonObject.version.toLong()
          if (eventInstance.version > version) {
            eventInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'event.label', default: 'Event')] as Object[],
                          "Another user has updated this Event while you were editing")
                //render(view: "edit", model: [eventInstance: eventInstance])
                ValidationErrors validationErrors = eventInstance.errors
                render validationErrors as JSON
                return
            }
        }

        eventInstance.properties = eventReceived.properties

        if (!eventInstance.save(flush: true)) {
            //render(view: "edit", model: [eventInstance: eventInstance])
            return
        }

		    render eventInstance as JSON
    }

    def delete() {
      println "in the inputs" + params
      def eventId = params.id
        def eventInstance = Event.get(params.id)
        if (!eventInstance) {
//			flash.message = message(code: 'default.not.found.message', args: [message(code: 'event.label', default: 'Event'), params.id])
//            redirect(action: "list")
            
        }

        try {
            eventInstance.delete(flush: true)
//			flash.message = message(code: 'default.deleted.message', args: [message(code: 'event.label', default: 'Event'), params.id])
//            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
//			flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'event.label', default: 'Event'), params.id])
//            redirect(action: "show", id: params.id)
        }
        render eventInstance as JSON
    }
}
