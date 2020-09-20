# Unified Translators

This is a collection of translators used in Edge Translate. We open source these translators separately
for people who want to build their own translator apps.

### Usage

```javascript
import { TRANSLATORS } from "unified-translators";

// Using Baidu translate.
TRANSLATORS.baidu.translate("hello", "en", "zh-CN").then(result => {
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

### More Info

Please refer to [tests](./test/).