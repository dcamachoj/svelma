const browser = !!window;
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() ?? '' : '';
}
function setCookie(name, value, days = 0) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
export class CompositeLangGetter {
    children;
    constructor(children) {
        this.children = children;
    }
    getLang() {
        for (let getter of this.children) {
            const result = getter.getLang();
            if (result)
                return result;
        }
        return '';
    }
}
export class BrowserLangGetter {
    getLang() {
        if (!browser)
            return '';
        return (navigator.language || navigator.userLanguage).split(',')[0];
    }
}
export class CookieLangGetter {
    getLang() {
        if (!browser)
            return '';
        return getCookie('lang');
    }
}
export class StorageGetter {
    storage;
    constructor(storage) {
        this.storage = storage;
    }
    getLang() {
        if (!browser)
            return '';
        return this.storage.getItem('lang') || '';
    }
}
export class CookieLangSetter {
    days;
    constructor(days = 0) {
        this.days = days;
    }
    setLang(value) {
        if (browser) {
            setCookie('lang', value, this.days);
        }
    }
}
export class StorageLangSetter {
    storage;
    constructor(storage) {
        this.storage = storage;
    }
    setLang(value) {
        if (browser) {
            this.storage.setItem('lang', value);
        }
    }
}
export class StaticI18nGetter {
    data;
    constructor(data) {
        this.data = data;
    }
    getI18nData(lang) {
        return Promise.resolve(this.data[lang] || {});
    }
}
export class StaticI18nLangsGetter {
    data;
    constructor(data) {
        this.data = data;
    }
    getI18nData(lang) {
        const data = {};
        Object.entries(this.data).forEach(([key, val]) => {
            const kLang = lang;
            data[key] = val[kLang];
        });
        return Promise.resolve(data);
    }
}
export class FetchI18nGetter {
    fetch;
    urlGetter;
    constructor(fetch, urlGetter) {
        this.fetch = fetch;
        this.urlGetter = urlGetter;
    }
    getI18nData(lang) {
        return this.fetch(this.urlGetter(lang)).then((res) => {
            if (res.ok)
                return res.json();
            return Promise.reject(res.statusText);
        });
    }
}
