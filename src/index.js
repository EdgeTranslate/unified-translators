import BingTranslator from "./translators/bing.js";
import GoogleTranslator from "./translators/google.js";
import HybridTranslator from "./translators/hybrid.js";

/**
 * Default hybrid translator.
 */
const HYBRID_TRANSLATOR = new HybridTranslator({
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

/**
 * Supported translators.
 */
const TRANSLATORS = Object.freeze({
    hybrid: HYBRID_TRANSLATOR,
    ...HYBRID_TRANSLATOR.REAL_TRANSLATORS
});

/**
 * Supported languages.
 */
const LANGUAGES = {
    en: "English",
    "zh-CN": "ChineseSimplified",
    "zh-TW": "ChineseTraditional",
    fr: "French",
    es: "Spanish",
    ru: "Russian",
    ar: "Arabic",
    de: "German",
    ja: "Japanese",
    pt: "Portuguese",
    hi: "Hindi",
    ur: "Urdu",
    ko: "Korean",
    ach: "Achinese",
    af: "Afrikaans",
    aka: "Akan",
    sq: "Albanian",
    am: "Amharic",
    arg: "Aragonese",
    hy: "Armenian",
    asm: "Assamese",
    ast: "Asturian",
    aym: "Aymara",
    az: "Azerbaijani",
    bal: "Baluchi",
    sun: "BasaSunda",
    bak: "Bashkir",
    eu: "Basque",
    be: "Belarusian",
    bem: "Bemba",
    bn: "Bengali",
    ber: "Berberlanguages",
    bho: "Bhojpuri",
    bis: "Bislama",
    bli: "Blin",
    nob: "Bokmal",
    bs: "Bosnian",
    bre: "Breton",
    bg: "Bulgarian",
    bur: "Burmese",
    yue: "Cantonese",
    ca: "Catalan",
    ceb: "Cebuano",
    chr: "Cherokee",
    ny: "Chichewa",
    chv: "Chuvash",
    wyw: "ClassicalChinese",
    cor: "Cornish",
    co: "Corsican",
    cre: "Creek",
    cri: "CrimeanTatar",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    prs: "Dari",
    div: "Divehi",
    nl: "Dutch",
    eo: "Esperanto",
    et: "Estonian",
    fao: "Faroese",
    fj: "Fiji",
    fil: "Filipino",
    fi: "Finnish",
    fy: "Frisian",
    fri: "Friulian",
    ful: "Fulani",
    gla: "Gaelic",
    gl: "Galician",
    ka: "Georgian",
    el: "Greek",
    grn: "Guarani",
    gu: "Gujarati",
    ht: "HaitianCreole",
    hak: "HakhaChin",
    ha: "Hausa",
    haw: "Hawaiian",
    he: "Hebrew",
    iw: "Hebrew",
    hil: "Hiligaynon",
    hmn: "Hmong",
    hu: "Hungarian",
    hup: "Hupa",
    is: "Icelandic",
    ido: "Ido",
    ig: "Igbo",
    id: "Indonesian",
    ing: "Ingush",
    ina: "interlingua",
    iku: "Inuktitut",
    ga: "Irish",
    it: "Italian",
    jw: "Javanese",
    kab: "Kabyle",
    kal: "Kalaallisut",
    kn: "Kannada",
    kau: "Kanuri",
    kas: "Kashmiri",
    kah: "Kashubian",
    kk: "Kazakh",
    km: "Khmer",
    kin: "Kinyarwanda",
    tlh: "Klingon",
    kon: "Kongo",
    kok: "Konkani",
    ku: "Kurdish",
    kmr: "KurdishNorthern",
    ky: "Kyrgyz",
    lo: "Lao",
    lag: "Latgalian",
    la: "Latin",
    lv: "Latvian",
    lim: "Limburgish",
    lin: "Lingala",
    lt: "Lithuanian",
    loj: "Lojban",
    lug: "Luganda",
    lb: "Luxembourgish",
    mk: "Macedonian",
    mai: "Maithili",
    mg: "Malagasy",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    glv: "Manx",
    mi: "Maori",
    mr: "Marathi",
    mah: "Marshallese",
    mau: "MauritianCreole",
    frm: "MiddleFrench",
    mn: "Mongolian",
    mot: "Montenegrin",
    my: "Myanmar",
    nea: "Neapolitan",
    ne: "Nepali",
    sme: "NorthernSami",
    ped: "NorthernSotho",
    no: "Norwegian",
    nno: "Nynorsk",
    oci: "Occitan",
    oji: "Ojibwa",
    eno: "OldEnglish",
    or: "Oriya",
    orm: "Oromo",
    oss: "Ossetian",
    pam: "Pampanga",
    pap: "Papiamento",
    ps: "Pashto",
    fa: "Persian",
    pl: "Polish",
    ma: "Punjabi",
    que: "Quechua",
    otq: "QueretaroOttomi",
    ro: "Romanian",
    roh: "Romansh",
    rom: "Romany",
    ruy: "Rusyn",
    sm: "Samoan",
    san: "Sanskrit",
    srd: "Sardinian",
    sco: "Scots",
    gd: "ScotsGaelic",
    src: "SerbCyrillic",
    sr: "Serbian",
    "sr-Cyrl": "SerbianCyrillic",
    "sr-Latn": "SerbianLatin",
    sec: "SerboCroatian",
    st: "Sesotho",
    sha: "Shan",
    sn: "Shona",
    sil: "Silesian",
    sd: "Sindhi",
    si: "Sinhala",
    sk: "Slovak",
    sl: "Slovenian",
    so: "Somali",
    sol: "Songhailanguages",
    nbl: "SouthernNdebele",
    sot: "SouthernSotho",
    su: "Sundanese",
    sw: "Swahili",
    sv: "Swedish",
    syr: "Syriac",
    tgl: "Tagalog",
    ty: "Tahiti",
    tg: "Tajik",
    ta: "Tamil",
    tat: "Tatar",
    te: "Telugu",
    tet: "Tetum",
    th: "Thai",
    tir: "Tigrinya",
    to: "Tongan",
    tso: "Tsonga",
    tr: "Turkish",
    tuk: "Turkmen",
    twi: "Twi",
    uk: "Ukrainian",
    ups: "UpperSorbian",
    uz: "Uzbek",
    ven: "Venda",
    vi: "Vietnamese",
    wln: "Walloon",
    cy: "Welsh",
    fry: "WesternFrisian",
    wol: "Wolof",
    xh: "Xhosa",
    yi: "Yiddish",
    yo: "Yoruba",
    yua: "YukatanMayan",
    zaz: "Zaza",
    zu: "Zulu"
};

/**
 * Export languages.
 */
export { LANGUAGES, TRANSLATORS, HybridTranslator, BingTranslator, GoogleTranslator };
