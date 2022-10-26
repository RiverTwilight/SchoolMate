import fetch from "isomorphic-unfetch";

describe("getVoteMusics", () => {
	test("responds 200 to authed GET", async () => {
		expect.assertions(1);
		let response = await fetch(
			`http://localhost:3000/api/music/getVoteMusics?vote_id=${1}`
		);
		expect(response.status).toBe(200);
	});
});
