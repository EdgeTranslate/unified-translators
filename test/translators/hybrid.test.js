import axios from "axios";
import HybridTranslator from "translators/hybrid.js";

describe("hybrid translator api", () => {
    const TRANSLATOR = new HybridTranslator({
        translators: ["bing", "google"],
        selections: {
            originalText: "bing",
            mainMeaning: "bing",
            tPronunciation: "bing",
            sPronunciation: "google",
            detailedMeanings: "google",
            definitions: "google",
            examples: "google"
        }
    });

    beforeAll(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);
    });

    it("to detect language of English text", done => {
        TRANSLATOR.detect("hello")
            .then(result => {
                expect(result).toEqual("en");
                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("to detect language of Chinese text", done => {
        TRANSLATOR.detect("你好")
            .then(result => {
                expect(result).toEqual("zh-CN");
                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("to translate a piece of English text", done => {
        TRANSLATOR.translate("hello", "en", "zh-CN")
            .then(result => {
                expect(result.mainMeaning).toEqual("你好");
                expect(result.originalText).toEqual("Hello");
                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("to translate a piece of Chinese text", done => {
        TRANSLATOR.translate("你好", "zh-CN", "en")
            .then(result => {
                expect(result.mainMeaning).toEqual("Hello");
                expect(result.originalText).toEqual("你好");
                done();
            })
            .catch(error => {
                done(error);
            });
    });
});
