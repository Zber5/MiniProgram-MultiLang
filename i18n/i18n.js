// traslate 需要用到的方法
function getLanguage() {
    //返回缓存中的language属性 (en / zh_CN) 	
    return wx.getStorageSync('Language') || 'zh_CN'
};

function translate() {
    //返回翻译的对照信息
    //console.log('path',require('' + getLanguage() + '.js'))
    return require('' + getLanguage() + '.js').languageMap;
}

function translateTxt(desc) {
    //没有对应的词条的时候
    return translate()[desc] || '竟然没有翻译';
}

module.exports = {
    getLanguage: getLanguage,
    _t: translate,
    _: translateTxt,
}