package theevent

class Contact {

    static constraints = {
    }
	
	enum Title {Mrs, Mr, Ms}
	
	String name
	String firstName
	Title title

	static hasMany = [phones:Phone, emails:String, addresses:Address]
	
}
