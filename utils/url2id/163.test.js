import url2id from "./163.ts";

describe("Testing prase 163 music url", () => {
    test("responds id consist of number", () => {
        expect.assertions(1);
        let response = url2id(
            "https://music.163.com/#/my/m/music/playlist?id=2995734275"
        );
        expect(response).toBe("2995734275");
    });
});
