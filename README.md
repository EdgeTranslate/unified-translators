# Unified Translators

This is a collection of translators used in Edge Translate. We open source these translators separately
for people who want to build their own translator apps.

### Usage

```javascript
import { TRANSLATORS } from "unified-translators";

// Using Hybrid translate.
TRANSLATORS.hybrid.translate("hello", "en", "zh-CN").then(result => {
    console.log(result.mainMeaning);
});

// Using Bing translate.
TRANSLATORS.bing.translate("hello", "en", "zh-CN").then(result => {
    console.log(result.mainMeaning);
});

// Using Google translate.
TRANSLATORS.google.translate("hello", "en", "zh-CN").then(result => {
    console.log(result.mainMeaning);
});
```

### Supported

* Hybrid Translate

  Combine translations from different translators.

* Google Translate

  Translations from [Google Translate](https://translate.google.cn).

* Bing Translate

  Translations from [Bing Translate](https://cn.bing.com/translator).

### To Be Done

* Baidu Translate (supported in Edge Translate)

* Tencent Translate (supported in Edge Translate)

* Youdao Translate

### More Info

Please refer to [tests](./test/).