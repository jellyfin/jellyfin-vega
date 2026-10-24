import { URL, URLSearchParams } from 'whatwg-url-without-unicode';

const nativeURL = globalThis.URL;
URL.createObjectURL = nativeURL.createObjectURL.bind(nativeURL);
URL.revokeObjectURL = nativeURL.revokeObjectURL.bind(nativeURL);

globalThis.URL = URL;
globalThis.URLSearchParams = URLSearchParams;
