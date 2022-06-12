var OK = OK || {};
OK.CONNECT = OK.CONNECT || {
    hostName: newFunction(),
    defaultStyle: "border:0;",
    frameId: 0,
    uiStarted: !1,
    insideok: !1,
    config: {
        detectClientCanonical: true,
        maxQueryLength: 400,
        pingWait: 5
    },
    insertGroupWidget: function(t, e, n) {
        this.insertWidget(t, "Group", "st.groupId=" + e, n, 250, 335)
    },
    insertShareWidget: function(t, e, n, i, o, r) {
        var a = "st.shareUrl=" + encodeURIComponent(e);
        void 0 !== i && (a += "&st.title=" + encodeURIComponent(i)),
        void 0 !== o && (a += "&st.description=" + encodeURIComponent(o)),
        void 0 !== r && (a += "&st.imageUrl=" + encodeURIComponent(r));
        var s = this.UTIL.detectCanonicalUrl();
        "string" == typeof s && s.length > 0 && ((a + ("&st.canonicalUrl=" + encodeURIComponent(s))).length <= this.config.maxQueryLength && (a += "&st.canonicalUrl=" + encodeURIComponent(s)));
        this.insertWidget(t, "Share", a, n, 170, 30)
    },
    insertContentWidget: function(t, e, n) {
        this.insertWidget(t, "Content", "st.content=" + e, n, "100%", 180)
    },
    insertProfileWidget: function(t, e, n) {
        this.insertWidget(t, "Profile", "st.profileId=" + e, n, 250, 335)
    },
    insertWidget: function(t, e, n, i, o, r) {
        setTimeout((function() {
            var a = OK.CONNECT
              , s = document.getElementById(t);
            if (null == s)
                return "error";
            void 0 === i && (i = "{}");
            var d = document.createElement("iframe");
            d.id = "__ok" + e + a.frameId++,
            d.scrolling = "no",
            d.frameBorder = 0,
            d.allowTransparency = !0,
            d.src = a.hostName + "/dk?st.cmd=Widget" + e + "&" + n + "&st.fid=" + d.id + "&st.hoster=" + encodeURIComponent(window.location) + "&st.settings=" + encodeURIComponent(i) + (a.insideok ? "&st.insideok=1" : ""),
            d.setAttribute("allowFullScreen", "");
            var l = a.UTIL.parseJson(i)
              , c = a.defaultStyle
              , g = a.UTIL.getJsonAttr(l, "width", o);
            c += "width:" + g + ("100%" === g ? ";" : "px;"),
            c += "height:" + a.UTIL.getJsonAttr(l, "height", r) + "px;",
            a.UTIL.applyStyle(d, c),
            s.appendChild(d)
        }
        ), this.frameId > 1 || this.insideok ? 0 : this.config.pingWait)
    },
    startUI: function() {
        if (!this.uiStarted) {
            this.uiStarted = !0;
            try {
                window.addEventListener ? window.addEventListener("message", this.onUI, !1) : window.attachEvent("onmessage", this.onUI),
                top.postMessage("ok_ping", "*")
            } catch (t) {}
        }
    },
    onUI: function(t) {
        if (t.origin == OK.CONNECT.hostName) {
            var e = t.data.split("$");
            if ("ok_setStyle" == e[0]) {
                var n = document.getElementById(e[1]);
                OK.CONNECT.UTIL.applyStyle(n, e[2])
            }
        } else
            "ok_pong" == t.data && (OK.CONNECT.insideok = !0)
    },
    UTIL: {
        applyStyle: function(t, e) {
            for (var n = e.split(";"), i = 0; i < n.length; i++) {
                var o = n[i].split(":");
                2 == o.length && o[0].length > 0 && (t.style[o[0]] = o[1])
            }
        },
        parseJson: function(jsonStr) {
            return eval("(function(){return " + jsonStr + ";})()")
        },
        getJsonAttr: function(t, e, n) {
            var i = t[e];
            return null != i ? i : n
        },
        detectCanonicalUrl: function() {
            if (!0 === OK.CONNECT.config.detectClientCanonical && document && document.getElementsByTagName) {
                for (var t = document.getElementsByTagName("link"), e = 0; e < t.length; e++) {
                    var n = t[e];
                    if (n && "canonical" === n.rel && void 0 !== n.href)
                        return n.href
                }
                var i = document.getElementsByTagName("meta");
                for (e = 0; e < i.length; e++) {
                    var o = i[e];
                    if (o && "og:url" === o.name && void 0 !== o.content)
                        return o.content
                }
            }
        }
    }
},
OK.CONNECT.startUI();

function newFunction() {
    return newFunction_1();

    function newFunction_1() {
        return "https://connect.ok.ru";
    }
}
