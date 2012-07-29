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
    }

    def create() {
       [eventInstance: new Event(params)]
    }

    def save() {
      def jsonObject = JSON.parse(params.event)
      Event eventInstance = new Event(jsonObject)
      eventInstance.save(flush: true)
      render eventInstance as JSON
    }

    def show() {
      def eventInstance = Event.get(params.id)
      if (!eventInstance) {
        def message = message(code: 'default.not.found.message', args: [message(code: 'event.label', default: 'Event'), params.id])
        render message as JSON
      } else {
        render eventInstance as JSON
      }
    }

    def update() {
      def jsonObject = JSON.parse(params.event)
      Event eventReceived = new Event(jsonObject)

        def eventInstance = Event.get(jsonObject.id)
        if (!eventInstance) {
            def message = message(code: 'default.not.found.message', args: [message(code: 'event.label', default: 'Event'), jsonObject.id])
            render message as JSON
            return
        }

        if (jsonObject.version) {
          def version = jsonObject.version.toLong()
          if (eventInstance.version > version) {
                eventInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'event.label', default: 'Event')] as Object[],
                          "Another user has updated this Event while you were editing")
                render eventInstance as JSON
                return
            }
        }

        eventInstance.properties = eventReceived.properties

        eventInstance.save(flush: true)

        render eventInstance as JSON
    }

    def delete() {
        def eventInstance = Event.get(params.id)
        if (!eventInstance) {
            def message = message(code: 'default.not.found.message', args: [message(code: 'event.label', default: 'Event'), params.id])
            render message as JSON
        }

        try {
            eventInstance.delete(flush: true)
            def message = message(code: 'default.deleted.message', args: [message(code: 'event.label', default: 'Event'), params.id])
            render message as JSON
        }
        catch (DataIntegrityViolationException e) {
          def message = message(code: 'default.not.deleted.message', args: [message(code: 'event.label', default: 'Event'), params.id])
          render message as JSON
        }
        render eventInstance as JSON
    }
}
