import { LANGUAGES, TRANSLATORS } from "index.js";

describe("Make sure that all of the supported languages in translators can be found in languages.js", () => {
    it("to test supported languages in google.js", done => {
        let languages = TRANSLATORS.google.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan]).toBeDefined();
            }
        }
        done();
    });

    it("to test supported languages in bing.js", done => {
        let languages = TRANSLATORS.bing.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan]).toBeDefined();
            }
        }
        done();
    });

    it("to test supported languages in baidu.js", done => {
        let languages = TRANSLATORS.baidu.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan]).toBeDefined();
            }
        }
        done();
    });
});
