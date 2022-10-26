import url2id from "./qq.ts";

describe("Test prase qq url", () => {
    test("responds 201 to authed GET", async () => {
        expect.assertions(1);
        let response = await url2id(
            "https://i.y.qq.com/v8/playsong.html?songid=311047963#webchat_redirect"
        );
        expect(response).toBe("000Ocruh3vbpHo");
    });
});
