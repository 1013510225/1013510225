
const domain = [
    {
        'url': 'https://115.com',
        'domain': '.115.com'
    },
    {
        'url': 'https://anxia.com',
        'domain': '.anxia.com'
    }
];
const newC = {
    url: 'https://115.com',
    name: '',
    value: '',
    domain: '.115.com',
    expirationDate: 253402300799,
    path: '/'
};
let isExpired = false;
function setCookie(newC) {
    return new Promise((resolve, reject) => {
        chrome.cookies.set(newC, cookie => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else if (!cookie) {
                reject(new Error('This cookie is deleted (expired)'));
            } else {
                resolve(cookie);
            }
        });
    });
}
function applayCookie(){
    if (CID.length > 0 && SEID.length > 0 && UID.length > 0 && KID.length > 0) {
        for (let i = 0; i < domain.length; i++) {
            newC['url'] = domain[i]['url'];
            newC['domain'] = domain[i]['domain'];
            newC['name'] = 'CID';
            newC['value'] = CID;
            setCookie(newC);
            newC['name'] = 'SEID';
            newC['value'] = SEID;
            setCookie(newC);
            newC['name'] = 'UID';
            newC['value'] = UID;
            setCookie(newC);
            newC['name'] = 'KID';
            newC['value'] = KID;
            setCookie(newC);
        }
    }
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'greet') {
        if(!isExpired){
            applayCookie();
        }
        fetch('https://115.com/?ct=offline&ac=space').then(response => {
            if (response.redirected) {
                sendResponse('offline');
                isExpired = true;
            }
        });
    }
    return true;
});
