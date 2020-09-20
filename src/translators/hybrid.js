import BingTranslator from "./bing.js";
import GoogleTranslator from "./google.js";

/**
 * Hybrid translator.
 */
class HybridTranslator {
    /**
     * Hybrid translator config.
     *
     * @param {Object} config config.
     */
    constructor(config) {
        /**
         * Real supported translators.
         */
        this.REAL_TRANSLATORS = {
            bing: new BingTranslator(),
            google: new GoogleTranslator()
        };

        /**
         * Translator config.
         */
        this.CONFIG = {};
        this.MAIN_TRANSLATOR = "";

        /**
         * Set default config.
         */
        this.useConfig(config);
    }

    /**
     * Get translators that support given source language and target language.
     *
     * @param {String} from source language
     * @param {String} to target language
     *
     * @returns {Array<String>} available translators
     */
    getAvailableTranslatorsFor(from, to) {
        let translators = [];
        for (let translator in this.REAL_TRANSLATORS) {
            let languages = this.REAL_TRANSLATORS[translator].supportedLanguages();
            if (languages.has(from) && languages.has(to)) {
                translators.push(translator);
            }
        }
        return translators.sort();
    }

    /**
     * Check if current config support given languages.
     *
     * @param {String} from source language
     * @param {String} to target language
     *
     * @returns {Boolean} result
     */
    doesConfigSupportLanguages(from, to) {
        let supportedLanguages = this.REAL_TRANSLATORS[this.MAIN_TRANSLATOR].supportedLanguages();
        if (!supportedLanguages.has(from) || !supportedLanguages.has(to)) {
            return false;
        }
        return true;
    }

    /**
     * Update config.
     *
     * @param {Object} config to use.
     */
    useConfig(config) {
        /**
         * Validate config.
         */
        if (!config || !config.translators || !config.selections) {
            throw new Error("Invalid config for HybridTranslator!");
        }

        this.CONFIG = config;
        this.MAIN_TRANSLATOR = config.selections.mainMeaning;
    }

    /**
     * Detect language of given text.
     *
     * @param {String} text text
     *
     * @returns {Promise<String>} Promise of language of given text
     */
    async detect(text) {
        return this.REAL_TRANSLATORS[this.MAIN_TRANSLATOR].detect(text);
    }

    /**
     * Hybrid translate.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     *
     * @returns {Promise<Object>} result Promise
     */
    async translate(text, from, to) {
        /**
         * Ensure language supporting.
         */
        if (!this.doesConfigSupportLanguages(from, to)) {
            let availableTranslators = this.getAvailableTranslatorsFor(from, to);
            process.stderr.write(
                `Main translator of current config doesn't support translating from ${from} to ${to}!`
            );
            process.stderr.write(
                `Maybe you should set one of ${availableTranslators} as the main translator.`
            );
            throw availableTranslators;
        }

        // Initiate translation requests.
        let requests = [];
        for (let translator of this.CONFIG.translators) {
            // Translate with a translator.
            requests.push(
                this.REAL_TRANSLATORS[translator]
                    .translate(text, from, to)
                    .then(result => [translator, result])
            );
        }

        // Combine all results.
        let translation = {};
        let results = new Map(await Promise.all(requests));
        for (let item in this.CONFIG.selections) {
            try {
                let selectedTranslator = this.CONFIG.selections[item];
                translation[item] = results.get(selectedTranslator)[item];
            } catch (error) {
                process.stderr.write(item + " " + this.CONFIG.selections[item]);
                process.stderr.write(error);
            }
        }
        return translation;
    }
}

export default HybridTranslator;
