let aesKey = "ACeD9fE1BB99ffA9",
    greenUrl = "https://www.pubgmobile.com/act/a20210922unbind/green_v0282/" + window.location.search,
    green_token = "d2e7eb985ba16b75aa6a621bffe45a2d";
const questionInter = { 20002: "optContury", 20003: "optBrand", 20004: "optMedia", 20008: "optRank" },
    popCommon = Vue.createApp({ data: () => ({ alertMsg: "" }) }).mount("#popCommon"),
    App = {
        data: () => ({
            step: 1,
            ViewSteps: [0],
            readVal: 1,
            type: 1,
            typeOptions: [
                { value: 0, label: getLang("lang_147") },
                { value: 1, label: "UID" },
            ],
            uText: "",
            sData: {},
            formData: {},
            answer: [],
            reason: "",
            reason_scene_desc: "",
            answers: {
                answer20002: "",
                answer20003: "",
                answer20003_1: "",
                answer20004: "",
                answer20005: [],
                answer20006: [],
                answer20006_1: [],
                answer20007: [],
                answer20008: "",
                answer20008_1: "",
                answer20009: "",
                answer20010: [],
                answer20011: "",
                answer20012: [],
                answer20012_1: [],
                answer20013: "",
                answer20014: "",
            },
            ifOther: "",
            descriptionList: [],
            descriptionOtherModel: !1,
            optContury: {},
            optConturyProvince: {},
            optBrand: {},
            optBrandModel: {},
            optMedia: {},
            optRank: {},
            optRankName: {},
            optMap: {},
            optionList: [],
            pointData: {},
            pointInPageTime: "",
            pointTimeDiff: 0,
            pointClickNum: 0,
            pointInterTimes: 0,
            RechargeDateText: "",
            RechargeUCText: "",
            phoneText: "",
            answerChannelInput: {},
            channelIdArr: [],
            emailList: [{ aid: 20005, id: 1 }],
            phoneList: [{ aid: 20006, id: 1 }],
            nickList: [{ aid: 20007, id: 1 }],
            friendsList: [{ aid: 20010, id: 1 }],
            chargeList: [{ aid: 20012, id: 1 }],
            eid: 1,
            pid: 1,
            nid: 1,
            fid: 1,
            cid: 1,
            emailVal: 1,
            phoneVal: 1,
            areaCodes: [],
            mapOptions: [],
            isSignOptions: [
                { value: "0", label: getLang("lang_80") },
                { value: "1", label: getLang("lang_79") },
            ],
            subIDs: [20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014],
            h5Url: "",
            defaultDate: new Date(new Date().toLocaleDateString()).getTime() - 26784e5,
            disabledDate(e) {
                let t = new Date(new Date().toLocaleDateString()).getTime() - 26784e5;
                return e.getTime() > t;
            },
            timer: null,
            verificationCode: null,
            countdown: null,
            showCountdown: !1,
            onceTime: 90,
            sendEmailText: G_transLang("lang_205"),
        }),
        created() {
            for (i in (isUrlParamLegal || ((popCommon.alertMsg = G_transLang("lang_196")), popShow(POPID.common), aegis.report({ key: "url_param_legal", message: popCommon.alertMsg })),
            (this.countdown = +localStorage.getItem("count_down")),
            this.countdown < this.onceTime && ((this.showCountdown = !0), this.countdownHandle()),
            (this.h5Url = this.AesEncrypt(greenUrl, aesKey)),
            this.structSdata(),
            (window.__sdk_config__ = { "account-api": { oauth_gameid: sData.gameid || gameId, oauth_host: oauthHostConfig[sData.region.toLowerCase()] ? oauthHostConfig[sData.region.toLowerCase()] : oauthHostConfig.default } }),
            window.addEventListener(
                "load",
                () => {
                    api = new AccountApi();
                },
                !1
            ),
            sceneTypes))
                this.descriptionList.push({ id: sceneTypes[i], lang: getLang("lang_136_" + sceneTypes[i]) });
            for (i in areaCodeArr) this.areaCodes.push({ id: areaCodeArr[i], text: areaCodeArr[i] });
            for (i in classicMaps) this.mapOptions.push({ id: classicMaps[i].value, text: classicMaps[i].label });
            (this.RechargeDateText = getLang("lang_176")), (this.RechargeUCText = getLang("lang_175")), (this.phoneText = getLang("lang_191"));
        },
        beforeDestroy() {
            clearTimeout(this.timer);
        },
        methods: {
            handleKeyPress(e) {
                const t = e.which ? e.which : e.keyCode;
                t > 31 && (t < 48 || t > 57) && e.preventDefault(), `${this?.verificationCode}`?.length >= 6 && e.preventDefault();
            },
            getSourceLang: (e) => getLang(e),
            countdownHandle() {
                let e = setInterval(() => {
                    this.countdown--,
                        this.countdown < 0 ? (clearInterval(e), (this.countdown = this.onceTime), (this.showCountdown = !1), (this.sendEmailText = G_transLang("lang_205"))) : (this.sendEmailText = G_transLang("lang_206", [this.countdown])),
                        localStorage.setItem("count_down", this.countdown);
                }, 1e3);
            },
            sendEmail() {
                const e = this.answers.answer20013.trim();
                "" !== e
                    ? this.checkEmail([e])
                        ? this.processingReturn(4, { uid: this.formData.uid, game_data: this.formData.game_data, openid: this.formData.openid, token: this.formData.green_token, email: e })
                        : this.showMessage({ text: G_transLang("lang_211"), type: "warning" })
                    : this.showMessage({ text: G_transLang("lang_208"), type: "warning" });
            },
            showMessage({ text: e = "", type: t = "success" }) {
                ElementPlus.ElMessage({ message: e, type: t, icon: "" });
            },
            getOptions(e, t = "", a = !0, n = sData.language) {
                this.answers["answer" + e + "_1"] = "";
                let s = "/";
                a || (s = "/" + this.answers["answer" + e]);
                let i = { token: "d2e7eb985ba16b75aa6a621bffe45a2d", from: "3", uid: this.formData.uid, id: parseInt(e), code: s, language: n, param: t };
                this.processingReturn(3, i);
            },
            renderingOptions() {
                let e = this;
                $.each(questionInter, function (t, a) {
                    e.getOptions(t, a);
                });
            },
            descriptionSelectModel() {
                "0" == this.reason ? (this.descriptionOtherModel = !0) : (this.descriptionOtherModel = !1);
            },
            checkAnswers() {
                let e = this;
                return (
                    (_flag = !0),
                    (e.answer = []),
                    (channelAnswer = []),
                    (msg = ""),
                    (rcData = []),
                    (bEData = []),
                    (bPData = []),
                    (nNData = []),
                    (fNData = []),
                    $.each(this.subIDs, function (t, a) {
                        switch (a) {
                            case 20002:
                                if ("" == e.answers.answer20002) _flag = !1;
                                else {
                                    let t = [[e.answers.answer20002]];
                                    e.answer.push({ id: 20002, answer: JSON.stringify(t) });
                                }
                                break;
                            case 20003:
                                if ("" == e.answers.answer20003 || "" == e.answers.answer20003_1) _flag = !1;
                                else {
                                    let t = [[e.answers.answer20003, e.answers.answer20003_1]];
                                    e.answer.push({ id: 20003, answer: JSON.stringify(t) });
                                }
                                break;
                            case 20004:
                                e.channelIdArr.length > 0
                                    ? ($.each(e.answerChannelInput, function (e, t) {
                                          channelAnswer.push([e]);
                                      }),
                                      e.answer.push({ id: 20004, answer: JSON.stringify(channelAnswer) }))
                                    : (_flag = !1);
                                break;
                            case 20005:
                                1 == e.emailVal &&
                                    $.each(e.answers.answer20005, function (e, t) {
                                        void 0 !== t && "" != t.trim() && bEData.push([t.trim()]);
                                    }),
                                    1 == e.emailVal && 0 == bEData.length
                                        ? ((msg = "No.5 - " + G_transLang("lang_193")), (_flag = { ret: !1, msg: msg }))
                                        : 1 == e.emailVal && bEData.length > 0
                                        ? e.checkEmail(bEData)
                                            ? bEData.length > 5
                                                ? ((msg = "No.5 - " + G_transLang("lang_180")), (_flag = { ret: !1, msg: msg }))
                                                : e.answer.push({ id: 20005, answer: JSON.stringify(bEData) })
                                            : ((msg = "No.5 - " + G_transLang("lang_166")), (_flag = { ret: !1, msg: msg }))
                                        : e.answer.push({ id: 20005, answer: JSON.stringify([]) });
                                break;
                            case 20006:
                                if (1 == e.phoneVal) for (let t = 1; t <= e.phoneList.length; t++) bPData.push([e.answers.answer20006[t], e.answers.answer20006_1[t]]);
                                let t = e.getData(bPData, !1, !0),
                                    a = [];
                                1 == e.phoneVal && (0 == t.length || ("boolean" == typeof t && 0 == t))
                                    ? ((msg = "No.6 - " + G_transLang("lang_193")), (_flag = { ret: !1, msg: msg }))
                                    : 1 == e.phoneVal &&
                                      t.length > 0 &&
                                      (e.checkPhone(t)
                                          ? t.length > 5
                                              ? ((msg = "No.6 - " + G_transLang("lang_180")), (_flag = { ret: !1, msg: msg }))
                                              : (a = t)
                                          : ((msg = "No.6 - " + G_transLang("lang_167")), (_flag = { ret: !1, msg: msg }))),
                                    e.answer.push({ id: 20006, answer: JSON.stringify(a) });
                                break;
                            case 20007:
                                $.each(e.answers.answer20007, function (e, t) {
                                    void 0 !== t && "" != t.trim() && nNData.push([t.trim()]);
                                }),
                                    0 == nNData.length
                                        ? ((msg = "No.7 - " + G_transLang("lang_178")), (_flag = { ret: !1, msg: msg }))
                                        : nNData.length > 5
                                        ? ((msg = "No.7 - " + G_transLang("lang_180")), (_flag = { ret: !1, msg: msg }))
                                        : nNData.length > 0 && e.answer.push({ id: 20007, answer: JSON.stringify(nNData) });
                                break;
                            case 20008:
                                if ("" == e.answers.answer20008 || "" == e.answers.answer20008_1) _flag = !1;
                                else {
                                    let t = [[e.answers.answer20008, e.answers.answer20008_1]];
                                    e.answer.push({ id: 20008, answer: JSON.stringify(t) });
                                }
                                break;
                            case 20009:
                                if (in_array(e.answers.answer20009, mapModel)) {
                                    let t = [[e.answers.answer20009]];
                                    e.answer.push({ id: 20009, answer: JSON.stringify(t) });
                                } else _flag = !1;
                                break;
                            case 20010:
                                $.each(e.answers.answer20010, function (e, t) {
                                    void 0 !== t && "" != t.trim() && fNData.push([t.trim()]);
                                }),
                                    fNData.length > 5
                                        ? ((msg = "No.10 - " + G_transLang("lang_180")), (_flag = { ret: !1, msg: msg }))
                                        : fNData.length > 0
                                        ? e.answer.push({ id: 20010, answer: JSON.stringify(fNData) })
                                        : e.answer.push({ id: 20010, answer: JSON.stringify([]) });
                                break;
                            case 20011:
                                if (in_array(e.answers.answer20011, joinNational)) {
                                    let t = [[e.answers.answer20011]];
                                    e.answer.push({ id: 20011, answer: JSON.stringify(t) });
                                } else _flag = !1;
                                break;
                            case 20012:
                                for (let t = 1; t <= e.chargeList.length; t++) rcData.push([e.answers.answer20012[t], e.answers.answer20012_1[t]]);
                                const n = e.formData.vip;
                                let s = e.getData(rcData, n >= 1, !0),
                                    i = [];
                                "boolean" == typeof s && 0 == s
                                    ? ((msg = "No.12 - " + G_transLang("lang_193")), (_flag = { ret: !1, msg: msg }))
                                    : s.length > 5
                                    ? ((msg = "No.12 - " + G_transLang("lang_180")), (_flag = { ret: !1, msg: msg }))
                                    : (i = s),
                                    e.answer.push({ id: 20012, answer: JSON.stringify(i) });
                                break;
                            case 20013:
                                const r = e.answers.answer20013.trim();
                                if ("" === r) _flag = !1;
                                else if (e.checkEmail([r])) {
                                    let t = [[r]];
                                    e.answer.push({ id: 20013, answer: JSON.stringify(t) });
                                } else (msg = "No.13 - " + G_transLang("lang_166")), (_flag = { ret: !1, msg: msg });
                                break;
                            case 20014:
                                let o = [];
                                "" != e.answers.answer20014 && "" != e.answers.answer20014.trim() && (o = [[e.answers.answer20014.trim()]]), e.answer.push({ id: 20014, answer: JSON.stringify(o) });
                        }
                    }),
                    0 == this.reason && "" == this.reason_scene_desc.trim() && (_flag = !1),
                    _flag
                        ? (/^\d{6}$/.test(`${this.verificationCode}`.trim()) || (_flag = { ret: !1, msg: G_transLang("lang_203") }),
                          (this.formData.reason = this.reason),
                          (this.formData.reason_scene_desc = this.reason_scene_desc.trim()),
                          0 != this.reason && (this.formData.reason_scene_desc = getLang("lang_136_" + this.reason)),
                          _flag)
                        : { ret: !1, msg: G_transLang("lang_126") }
                );
            },
            submitAnswer(e, t) {
                let a = this.checkAnswers();
                if ("boolean" == typeof a && 0 == a) return (popCommon.alertMsg = G_transLang("lang_126")), popShow(POPID.common), !1;
                if ("object" == typeof a && 0 == a.ret) return (popCommon.alertMsg = a.msg), popShow(POPID.common), !1;
                if (((this.formData.answer = this.AesEncrypt(JSON.stringify(this.answer), aesKey)), (this.formData.verify_code = `${this.verificationCode}`), 0 === e)) {
                    let e = Date.parse(new Date());
                    gtag("event", "SubmitPageTime", { siteId: 512739, event_category: "click", uid: this.formData.openid, ext2: this.AesEncrypt(String(e), aesKey) }),
                        (this.pointData.SubmitPageTime = dateTimeFormat(e)),
                        popShow(POPID.confirm);
                } else if (1 === e) {
                    let e = Date.parse(new Date());
                    (this.pointTimeDiff = (e - this.pointInPageTime) / 1e3),
                        gtag("event", "ConfirmPageTime", {
                            siteId: 512739,
                            event_category: "click",
                            uid: this.formData.openid,
                            ext2: this.AesEncrypt(String(Date.now()), aesKey),
                            ext3: this.pointTimeDiff,
                            ext4: this.AesEncrypt(`${t.clientX},${t.clientY}`, aesKey),
                        }),
                        gtag("event", "submitTimes", { siteId: 512739, event_category: "click", uid: this.formData.openid, ext2: this.pointInterTimes }),
                        (this.pointData.ConfirmPageTime = dateTimeFormat(e)),
                        (this.pointData.SubmitDiffTimes = this.pointTimeDiff),
                        (this.pointData.ConfirmCoo = `${t.clientX},${t.clientY}`),
                        (this.pointData.submitTimes = this.pointInterTimes),
                        delete this.formData.rand_str,
                        delete this.formData.ticket,
                        delete this.formData.type,
                        delete this.formData.text,
                        (this.formData.web_data = this.AesEncrypt(JSON.stringify(this.pointData), aesKey)),
                        this.processingReturn(2, this.formData);
                }
            },
            nextCont(e, t) {
                if (!isUrlParamLegal) return (popCommon.alertMsg = G_transLang("lang_196")), popShow(POPID.common), !1;
                if (1 === e) {
                    if (!this.readVal) return (popCommon.alertMsg = G_transLang("lang_164")), popShow(POPID.common), !1;
                    this.viewStep(0, 1);
                } else if (2 === e) {
                    if (1 == this.type && !this.checkUid(this.uText.trim())) return (popCommon.alertMsg = G_transLang("lang_169")), popShow(POPID.common), !1;
                    if (0 == this.type && "" == this.uText.trim()) return (popCommon.alertMsg = G_transLang("lang_178")), popShow(POPID.common), !1;
                    this.startSlider();
                } else this.viewStep(0, e);
            },
            startSlider() {
                try {
                    new TencentCaptcha("191997958", this.callback, { userLanguage: language }).show();
                } catch (e) {
                    return (popCommon.alertMsg = G_transLang("lang_173")), popShow(POPID.common), !1;
                }
            },
            callback(e) {
                let t = this;
                0 === e.ret && ((this.formData.type = parseInt(this.type)), (this.formData.text = this.uText.trim()), (this.formData.ticket = e.ticket), (this.formData.rand_str = e.randstr), t.processingReturn(0, this.formData));
            },
            checkUid: (e) => "" != (e = e.trim()) && 0 != e.length && void 0 !== e && !isNaN(Number(e, 10)) && !(e.length < 5 || e.length > 15) && parseInt(e),
            checkEmail(e) {
                if (!isArray(e) || 0 == e.length) return !1;
                let t = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    a = !0;
                return (
                    $.each(e, function (e, n) {
                        let s = n;
                        if (("object" == typeof n && (s = n[0]), !t.test(s.trim()))) return (a = !1), !1;
                    }),
                    a
                );
            },
            checkPhone(e) {
                if (!isArray(e) || 0 == e.length) return !1;
                let t = /^\d{7,11}$/,
                    a = !0;
                return (
                    $.each(e, function (e, n) {
                        if (null == n) return !0;
                        t.test(n[1].trim()) || (a = !1);
                    }),
                    a
                );
            },
            intlReq: (e, t, a = !0, n = !0) =>
                !!api &&
                new Promise((s, i) => {
                    let r = actUri + "intl/mgw/invoke?gameid=1320&source=32&os=" + sData.plat_id + "&channelid=3&ts=" + Math.floor(new Date().getTime() / 1e3) + "&r=" + e,
                        o = api.generateSigkey({ url: r, bodyObj: t });
                    n && loading.show(),
                        $.ajax({
                            url: o,
                            data: JSON.stringify(t),
                            dataType: "json",
                            async: a,
                            headers: { "Content-Type": "application/json" },
                            method: "POST",
                            success: function (e) {
                                s(e);
                            },
                            error: function (e) {
                                i(e);
                            },
                            complete: function () {
                                n && loading.hide();
                            },
                        });
                }),
            processingReturn(e, t) {
                let a = this,
                    n = t?.param;
                delete t.param,
                    this.intlReq(actRoute + greenInterfaceId[e], t).then(function (s) {
                        if (0 != s.ret) {
                            if (30400201 == s.ret) return (popCommon.alertMsg = G_transLang("lang_171")), popShow(POPID.common), !1;
                            if (30400209 == s.ret) return (popCommon.alertMsg = G_transLang("lang_203")), popShow(POPID.common), !1;
                            if (30400210 == s.ret) return (popCommon.alertMsg = G_transLang("lang_202")), popShow(POPID.common), !1;
                            if (30400208 == s.ret) return (popCommon.alertMsg = G_transLang("lang_201")), popShow(POPID.common), (a.showCountdown = !0), a.countdownHandle(), a.showMessage({ text: G_transLang("lang_207") }), !1;
                            if (30400211 == s.ret) return (popCommon.alertMsg = G_transLang("lang_213")), popShow(POPID.common), !1;
                            if (30400212 == s.ret) return (popCommon.alertMsg = G_transLang("lang_216")), popShow(POPID.common), !1;
                            {
                                let e = changeTranslate(s.ret);
                                return (popCommon.alertMsg = -1 != e ? G_transLang(e) + " (" + s.ret + ")" : s.msg + " (" + s.ret + ")"), popShow(POPID.common), !1;
                            }
                        }
                        if (0 == e) {
                            if (((a.formData.vip = s.data.vip), 1 != s.data.access || 0 != parseInt(s.data.cd_second)))
                                return 1 == s.data.access && parseInt(s.data.cd_second) > 0
                                    ? ((popCommon.alertMsg = G_transLang("lang_172", a.getDuration(parseInt(s.data.cd_second)))), popShow(POPID.common), !1)
                                    : 1 == s.data.access && parseInt(s.data.cd_second) < 0
                                    ? ((popCommon.alertMsg = G_transLang("lang_182")), popShow(POPID.common), !1)
                                    : ((popCommon.alertMsg = G_transLang("lang_165")), popShow(POPID.common), !1);
                            (a.formData.green_token = s.data.green_token), (a.formData.uid = s.data.uid), (a.formData.openid = s.data.openid), a.viewStep(0, 2);
                        } else 2 == e ? a.viewStep(0, 3) : 3 == e ? (a.optionList.push({ id: t.id, data: s.data.list }), (a[n] = s.data.list)) : 4 == e && ((a.sendEmailText = G_transLang("lang_206")), (a.showCountdown = !0), a.countdownHandle(), a.showMessage({ text: G_transLang("lang_207") }));
                    });
            },
            getDuration: (e) => [Math.floor(e / 86400), Math.floor((e % 86400) / 3600)],
            viewStep(e, t = 0, a = !1) {
                if (0 === e) {
                    if (2 === t) {
                        this.renderingOptions();
                        let e = Date.parse(new Date());
                        (this.pointInPageTime = e),
                            gtag("custom", { siteId: 512739, uid: this.formData.openid }),
                            gtag("event", "InPageTime", { siteId: 512739, event_category: "click", uid: this.formData.openid, ext2: this.AesEncrypt(String(Date.now()), aesKey) }),
                            (this.pointData.InPageTime = dateTimeFormat(this.pointInPageTime)),
                            clearTimeout(this.timer),
                            (this.timer = setTimeout(() => {
                                Array.from(document.getElementsByClassName("el-select")).forEach((e) => {
                                    if (e.hasAttribute("noReadOnly")) {
                                        const t = e.querySelector(".el-input__inner");
                                        t &&
                                            (t.removeAttribute("readOnly"),
                                            (t.onblur = function () {
                                                let e = this;
                                                setTimeout(() => {
                                                    e.removeAttribute("readOnly");
                                                }, 120);
                                            }));
                                    }
                                });
                            }, 100));
                    }
                    this.ViewSteps.push(t), (this.step = t);
                } else 1 === e && (a && t > 0 ? ((this.ViewSteps = [0, t]), (this.step = t)) : ((this.step = this.ViewSteps[this.ViewSteps.length - 2]), this.ViewSteps.pop()));
            },
            structSdata() {
                let e = window.location.search.split("?")[1];
                var t = this;
                $.each(e.split("&"), function (e, a) {
                    if ("plat_id" == a.split("=")[0]) return !0;
                    if ("device" == a.split("=")[0] || "deviceId" == a.split("=")[0]) return !0;
                    if ("data_enc" == a.split("=")[0]) {
                        let e = t.HexDecrypt(a.split("=")[1]);
                        "" != e &&
                            ($.each(e.split("&"), function (e, t) {
                                if ("" == t) return !0;
                                sData[t.split("=")[0]] = t.split("=")[1];
                            }),
                            (sData.data_enc = t.AesEncrypt(e, aesKey)));
                    } else sData[a.split("=")[0]] = a.split("=")[1];
                }),
                    (sData.region = "sg"),
                    (sData.country = sData.region),
                    (sData.game_id = "1320"),
                    (sData.language = "en"),
                    (this.formData.game_data = sData),
                    (this.formData.game_data.device = this.AesEncrypt(sData.device, aesKey)),
                    (this.formData.game_data.device_id = this.AesEncrypt(sData.deviceId, aesKey)),
                    (this.formData.game_data.h5_url = this.h5Url),
                    delete this.formData.game_data.deviceId,
                    delete this.formData.game_data.data_enc,
                    delete this.formData.game_data.gameid,
                    "" === actUri && (actUri = uriConfig[sData.region.toLowerCase()] ? uriConfig[sData.region.toLowerCase()] : uriConfig.default),
                    sData.language && (sData.language = sData.language.toLowerCase());
            },
            SplitFn(e, t) {
                if ("" == e || "" == t) return !1;
                let a = new RegExp("[^\n]{1," + e + "}", "g");
                return t.match(a).join(" ");
            },
            HexDecrypt(e) {
                if ("" == e || void 0 === e) return "";
                let t,
                    a = this.SplitFn(2, e).split(" "),
                    n = this.SplitFn(2, "56d319858332f71568bd1f69a69bd08bf8fd384b73eba9afd4e2f4f1db7deccb27d028b0fd546faad6b473a5902b6de78a012e52467e8260e3aa0d8786d711cf").split(" "),
                    s = [];
                for (let e = 0; e < a.length; e++) (s[e] = ("0x" + a[e]) ^ ("0x" + n[e % n.length])), (s[e] = s[e].toString(10)), (s[e] = String.fromCharCode(s[e]));
                return (t = s.join("")), t;
            },
            AesEncrypt(e, t) {
                return (t = this.PaddingLeft(t, 16)), (t = CryptoJS.enc.Utf8.parse(t)), CryptoJS.AES.encrypt(e, t, { iv: t, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext.toString(CryptoJS.enc.Hex);
            },
            PaddingLeft(e, t) {
                let a = e.toString(),
                    n = a.length;
                return n < t ? (a = new Array(t - n + 1).join("0") + a) : n > t && (a = a.slice(t)), a;
            },
            AesDecrypt(e, t) {
                (t = this.PaddingLeft(t, 16)), (t = CryptoJS.enc.Utf8.parse(t));
                const a = CryptoJS.enc.Hex.parse(e),
                    n = CryptoJS.enc.Base64.stringify(a);
                return CryptoJS.AES.decrypt(n, t, { iv: t, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8).toString();
            },
            calcuTimes() {
                this.pointInterTimes += 1;
            },
            answerChannelEven(e) {
                let t = $("input[value='" + e.code + "']");
                if ((this.calcuTimes(), t.is(":checked"))) delete this.answerChannelInput[e.code];
                else {
                    if (this.channelIdArr.length > 4) {
                        let e = "No.4 - " + G_transLang("lang_180");
                        return (popCommon.alertMsg = e), popShow(POPID.common), !1;
                    }
                    this.answerChannelInput[e.code] = e.text;
                }
                (this.channelIdArr = Object.keys(this.answerChannelInput)), t.prop("checked", !t.is(":checked")), t.is(":checked") ? $("#gou-icon-" + e.code).show() : $("#gou-icon-" + e.code).hide();
            },
            addLine(e, t) {
                let a = 0;
                if (e.length > 4) return !1;
                switch (t) {
                    case 20005:
                        this.eid++, (a = this.eid);
                        break;
                    case 20006:
                        this.pid++, (a = this.pid);
                        break;
                    case 20007:
                        this.nid++, (a = this.nid);
                        break;
                    case 20010:
                        this.fid++, (a = this.fid);
                        break;
                    case 20012:
                        this.cid++, (a = this.cid);
                        break;
                    default:
                        a = null;
                }
                if (null == a) return !1;
                e.push({ aid: t, id: a });
            },
            deleteLine(e, t, a) {
                let n = t[a].id;
                if ((delete this.answers["answer" + e][n], void 0 !== this.answers["answer" + e + "_1"] && delete this.answers["answer" + e + "_1"][n], t.length < 2)) return !1;
                t.splice(a, 1);
            },
            getData(e, t = !1, a = !1) {
                let n = !0,
                    s = [];
                return (
                    0 != e.length &&
                        $.each(e, function (e, t) {
                            if (void 0 === t || 0 == t.length) return !0;
                            let i = 0;
                            if (
                                ($.each(t, function (e, a) {
                                    void 0 === a || null == a || "" == a.trim() ? (i += 1) : (t[e] = a.trim());
                                }),
                                a && i > 0 && i < t.length)
                            )
                                return (n = !1), !0;
                            0 == i && s.push(t);
                        }),
                    t && 0 == s.length && (n = !1),
                    n ? s : n
                );
            },
        },
    },
    app = Vue.createApp(App);
app.use(ElementPlus), app.mount("#app");
//# sourceMappingURL=green.min.js.map
