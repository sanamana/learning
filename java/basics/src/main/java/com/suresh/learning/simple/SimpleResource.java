package com.suresh.learning.simple;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/helloworld")
public class SimpleResource {

	@GET
	@Produces("text/plain")
	public String getMessage() {
		return "Hello World";
	}
}
