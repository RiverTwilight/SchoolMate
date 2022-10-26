import http from "http";
import fetch from "isomorphic-unfetch";
import listen from "test-listen";
// import { apiResolver } from "next/dist/next-server/server/api-utils";
import handler from "../music/voteMusic";

describe("voteMusic", () => {
	test("responds 201 to authed GET", async () => {
		expect.assertions(1);
		let requestHandler = (req, res) => {
			res.user = { username: "scooby" };
			return apiResolver(req, res, undefined, handler);
		};
		let server = http.createServer(requestHandler);
		let url = await listen(server);
		let response = await fetch(url);
		expect(response.status).toBe(200);
		return server.close();
	});
});
