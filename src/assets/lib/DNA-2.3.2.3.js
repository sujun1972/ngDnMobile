var DN_Config = [];
var thisPageUsingOtherJSLibrary = false;
var __myHost = "hwhrq.com";
var _parentHost = "//token." + __myHost;
var _parentLogin = "//account." + __myHost;
var _resourcehost = "//www." + __myHost;
String.prototype.trimEnd = function (c) {
    c = c ? c : ' ';
    var i = this.length - 1;
    for (; i >= 0 && this.charAt(i) == c; i--);
    return this.substring(0, i + 1);
};
var _createCookie = function (name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/ ;";
}
var __isLoaded = false;

function _LoadEffect() {
    if (!__isLoaded) {
        __isLoaded = true;
        $('head').append('<link rel="stylesheet" type="text/css" href="' + _resourcehost + "/Content/css/loadeffect.css" + '">');
        $("body").append('<div class="loading-mask"><div class="loading-content">正在同步用户信息</div><div class="sk-folding-cube">' +
            '<div class="sk-cube1 sk-cube"></div>' +
            '<div class="sk-cube2 sk-cube"></div>' +
            '<div class="sk-cube4 sk-cube"></div>' +
            '<div class="sk-cube3 sk-cube"></div>' +
            '</div></div>');
    } else {
        $(".loading-mask").show();
    }
}

function _HideEffect() {
    $(".loading-mask").hide();
}

function _readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function _eraseCookie(name) {

    _createCookie(name, "", -1);
}
var _parseURL = function (url) {
    var temp = document.createElement('a');
    temp.href = url;
    var result = {
        "port": temp.port,
        "protocol": temp.protocol.replace(':', ''),
        "hash": temp.hash.replace('#', ''),
        "host": temp.host,
        "href": temp.href,
        "hostname": temp.hostname,
        "pathname": temp.pathname,
        "search": temp.search,
        "query": {}
    };
    var seg = result.search.replace(/^\?/, '').split('&'),
        leng = seg.length,
        i = 0,
        target;
    for (; i < leng; i++) {
        if (!seg[i]) continue;
        target = seg[i].split('=');
        result.query[target[0]] = target[1];
    }
    temp = null;
    return result;
};

function _GetLogoutKey() {
    return DN_Config.LogoutCookie || "dn_logout";
}

function _IsLogoutCookieExist() {
    var logoutKey = _GetLogoutKey();
    if (_readCookie(logoutKey)) {
        return true;
    }
    return false;
};
var DNa = function (Options, CallBack) {

    var $this = this;
    if (!Options || !Options.key) {
        console.error("The public key is required!");
        return;
    }
    this.Initialize = function () {
        console.log("/assets/DNA-2.3.2.3.js Works!");
        if (!$("#" + DN_Config._iframeid).length) {
            $('<iframe />', {
                name: DN_Config._iframeid,
                id: DN_Config._iframeid
            }).appendTo('body');
        }
        if (!_IsLogoutCookieExist()) {
            var token_page = $("#" + DN_Config._iframeid);
            token_page.attr("src", $this.GetTokenPage()).css(DN_Config._invisibleCss);
        } else {
            var token_page = $("#" + DN_Config._iframeid);
            token_page.attr("src", $this.GetPage("logout"))
                .css(DN_Config.UsingEffect ? DN_Config._bottomCss : DN_Config._invisibleCss)
                .load(function () {
                    var $this = $(this);
                    _eraseCookie(_GetLogoutKey());
                    $this.unbind("load");
                    setTimeout(function () {
                        $this.hide();
                    }, 1000);
                });
        }
        if (window.addEventListener) {
            window.addEventListener('message', $this.OnReceive);
        } else {
            window.attachEvent('onmessage', $this.OnReceive);
        }
    };
    this.GetTokenPage = function () {
        var paret = this.GetPage("token");
        var queries = {
            "r": window.location.href,
            "p": DN_Config._publicKey
        };
        if (DN_Config.Debug) {
            queries.r = "http://debug.me";
        }
        var params = this.JSonToQueries(queries);
        return paret + "?" + params;
    }
    this.GetPage = function (e) {
        var _ret = "";
        switch (e) {
            case "login":
                _ret = _parentLogin + DN_Config._loginPage;
                break;
            case "reg":
                _ret = _parentHost + DN_Config._regPage;
                break;
            case "token":
                _ret = _parentHost + DN_Config._tokenPage;
                break;
            case "logout":
                _ret = _parentLogin + DN_Config._logoutPage;
                break;
        }
        return _ret;
    }
    this.JSonToQueries = function (json) {
        var _ret = "";
        for (var i in json) {
            _ret += i + "=" + json[i] + "&";
        }
        _ret = _ret.replace(/&+$/, "");
        return _ret;
    }
    this.OnReceive = function (result) {
        if (result.origin.indexOf(_parentHost) < 0) {
            //  alert(result.origin );
            ReceiveCommad(result);
        } else {
            var msg = decodeURIComponent(result.data);
            if (msg == "token does not exist, refresh it") {
                if (DN_Config.TokenExistRefreshIt) {
                    DN_Config.TokenExistRefreshIt();
                } else {
                    window.location = window.location.href;
                }
                return;
            }
            if (msg != "token does not exist") {
                if (DN_Config.DN_AutoLogin) {
                    var tranferURL = _parseURL(DN_Config.DN_LoginURL);
                    tranferURL.query.token = msg;
                    var newTransfer = BuildTransfer(tranferURL);
                    var params = "";
                    for (var abc in tranferURL.query) {
                        params += abc + "=" + tranferURL.query[abc] + "&";
                    }
                    params = params.trimEnd("&");
                    if (DN_Config.Method && DN_Config.Method == "POST") {
                        $.post(newTransfer, params, function (result) {
                            if (DN_Config.LoginCallBack && $.isFunction(DN_Config.LoginCallBack)) {
                                if (DN_Config.UsingEffect && !_readCookie("__noeffect")) {
                                    _LoadEffect();
                                    setTimeout(function () {
                                        if (DN_Config.LoginCallBack(result) == false) {
                                            _createCookie("__noeffect", 1);
                                        }
                                        _HideEffect()
                                    }, DN_Config.EffectTime || 500);
                                } else {
                                    if (DN_Config.LoginCallBack(result) == true) {
                                        _eraseCookie("__noeffect");
                                    }
                                }
                            }
                        })
                    } else {
                        window.location.href = newTransfer + params;
                    }
                }
                DN_Config.UserStatus = true;
            } else {
                DN_GenerateLoginPage($this);
                DN_Config.UserStatus = false;
            }
        }
    }
    DN_Config._publicKey = Options.key;
    DN_Config._invisibleCss = {
        "width": "1px",
        "height": "1px",
        "position": "absolute",
        "top": "0",
        "border": "none"
    };
    DN_Config._bottomCss = {
        "position": "fixed",
        "zIndex": "10000001",
        "width": "100%",
        "height": "50px",
        "bottom": 0,
        "border": "none"
    };

    DN_Config._tokenPage = "/Auth/Token.aspx";
    DN_Config._loginPage = "/Auth/Login" + (DN_Config.keepSuffix ? ".aspx" : "");
    DN_Config._regPage = "/Auth/Reg" + (DN_Config.keepSuffix ? ".aspx" : "");
    DN_Config._logoutPage = "/Auth/ClearState" + (DN_Config.keepSuffix ? ".aspx" : "");
    DN_Config._iframeid = "dn_iframe";

    $this.Initialize();
}

function BuildTransfer(tranferURL) {
    var currentHost = _parseURL(window.location.href);
    return (tranferURL.protocol ? tranferURL.protocol : currentHost.protocol) +
        "://" + (tranferURL.hostname ? tranferURL.hostname : currentHost.hostname) + GetDefaultPort(tranferURL.port) + (tranferURL.pathname.indexOf('/') == 0 ? tranferURL.pathname : "/" + tranferURL.pathname) + "?";
}

function GetDefaultPort(port) {
    return port == 0 ? "" : ":" + port;
}

function ReceiveCommad(e) {
    var tranferURL = _parseURL(window.location.href);
    if (e.data == "refresh") {
        tranferURL.query.refresh = "true";
        var newTransfer = BuildTransfer(tranferURL);
        for (var abc in tranferURL.query) {
            newTransfer += abc + "=" + tranferURL.query[abc] + "&";
        }
        window.location.href = newTransfer.trimEnd('&');
    } else if (e.data == "unrefresh") { } else if (e.data == "removelogout") { }
}

function DN_GenerateLoginPage(DN_Api) {

    var loginPage = DN_Api.GetPage("login");
    if (!$(DN_Config.DN_ClickContent).length) {
        DN_LoginPageShow(loginPage);
    } else {
        $(DN_Config.DN_ClickContent).click(function () {
            DN_LoginPageShow(loginPage);
        });
    }
}

function DN_LoginPageShow(loginPage) {
    var loginFramestyle = {
        position: "absolute",
        "border": "none",
        "overflow": "hidden"
    };
    var content_page = $("#" + DN_Config.PageContainerID);
    var cssfile = DN_Config.LoginCss ? "&c=" + DN_Config.LoginCss : "";
    var useServerCallBack = DN_Config.ServerCallback == true ? "&p=1" : "";
    var useSafeLink = DN_Config.UsingSafe ? "&s=1" : "";
    if (!content_page.length) {
        $('<div />', {
            id: DN_Config.PageContainerID
        }).appendTo('body');
    }
    content_page = $("#" + DN_Config.PageContainerID);
    $('<iframe />', {
        id: "Dn_Login_Iframe",
        src: loginPage +
            "?width=" + content_page.width() +
            "&height=" + content_page.height() +
            "&r=" + window.location.href +
            cssfile + useServerCallBack +
            useSafeLink
    }).appendTo(content_page);
    content_frame = $("#Dn_Login_Iframe");
    loginFramestyle.height = content_page.height();
    loginFramestyle.width = content_page.width();
    loginFramestyle.top = content_page.position().top;
    loginFramestyle.left = content_page.position().left;
    content_frame.css(loginFramestyle);
}