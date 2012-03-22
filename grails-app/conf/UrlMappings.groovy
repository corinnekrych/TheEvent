//class UrlMappings {
//
//	static mappings = {
//		println "before" + controller
//		"/$controller/toto/$action?/$id?"{
//			println "after"+controller
//			constraints {
//				// apply constraints here
//			}
//		}
//
//		"/"(view:"/index")
//		"500"(view:'/error')
//	}
//}

class UrlMappings {
	static mappings = {
		"/$controller/$action?/$id?"{  constraints { // apply constraints here
			}  }

//		
//		"/event" (controller: "event") {
//			action = [GET:"list", POST: "create"]
//		}
//		"/event/$id" (controller: "event") {
//			action = [GET: "show", PUT:"update", DELETE:"delete"]
//		}

		"/"(view:"/index")
		"500"(view:'/error')
	}
}
