import axios from "axios";
import fs from "fs";
import mockAdapter from "axios-mock-adapter";
import BaiduTranslator from "translators/baidu.js";

describe("baidu translator api", () => {
    const TRANSLATOR = new BaiduTranslator();

    beforeAll(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);
    });

    it("to detect language of English text", () => {
        return TRANSLATOR.detect("hello").then(result => {
            expect(result).toEqual("en");
        });
    });

    it("to detect language of Chinese text", () => {
        return TRANSLATOR.detect("你好").then(result => {
            expect(result).toEqual("zh-CN");
        });
    });

    it("to get token and gtk", () => {
        return TRANSLATOR.getTokenGtk().then(translator => {
            expect(translator).toBeUndefined();
            expect(TRANSLATOR.token).not.toEqual("");
            expect(TRANSLATOR.gtk).not.toEqual("");
        });
    });

    it("to parse translation result", done => {
        let result = fs.readFileSync("test/translators/baiduTransResult.json", "utf-8");
        result = JSON.parse(result);
        let parseResult = TRANSLATOR.parseResult(result);
        expect(parseResult.originalText).toEqual("hello");
        expect(parseResult.mainMeaning).toEqual("你好");
        expect(parseResult.tPronunciation).toEqual("nǐ hǎo");
        expect(parseResult.sPronunciation).toEqual("həˈləʊ");
        expect(parseResult.detailedMeanings[0].pos).toBeDefined();
        expect(parseResult.definitions[0].pos).toBeDefined();
        expect(parseResult.examples.length).toBeGreaterThan(0);
        done();
    });

    it("to translate a word", done => {
        TRANSLATOR.getTokenGtk()
            .then(() => {
                // translation request using axios' http adapter always return errors
                // I have to mock requests of axios to avoid crossing origin and the errors
                let mock = new mockAdapter(axios);
                let query = "hello",
                    from = "en",
                    to = TRANSLATOR.LAN_TO_CODE.get("zh-CN"),
                    url = "/v2transapi?" + "from=" + from + "&to=" + to;
                mock.onPost(url).reply(config => {
                    // to check post data
                    let data = new URLSearchParams(config.data);
                    expect(data.get("from")).toEqual(from);
                    expect(data.get("to")).toEqual(to);
                    expect(data.get("query")).toEqual(query);
                    expect(data.get("sign")).not.toEqual("");
                    expect(data.get("token")).not.toEqual("");

                    // to return translation result stored at $localResultPath
                    let localResultPath = "test/translators/baiduTransResult.json";
                    let result = fs.readFileSync(localResultPath, "utf-8").toString();
                    return [200, result];
                });
                return TRANSLATOR.translate(query, "en", "zh-CN");
            })
            .then(parseResult => {
                expect(parseResult.originalText).toEqual("hello");
                expect(parseResult.mainMeaning).toEqual("你好");
                expect(parseResult.tPronunciation).toEqual("nǐ hǎo");
                expect(parseResult.sPronunciation).toEqual("həˈləʊ");
                expect(parseResult.detailedMeanings[0].pos).toBeDefined();
                expect(parseResult.definitions[0].pos).toBeDefined();
                expect(parseResult.examples.length).toBeGreaterThan(0);
                done();
            })
            .catch(error => done(error));
    });
});
