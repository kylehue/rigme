"use strict";

!function (t) {
  "use strict";

  var B,
      d = t.Uint8Array,
      o = t.HTMLCanvasElement,
      t = o && o.prototype,
      a = /\s*;\s*base64\s*(?:;|$)/i,
      l = "toDataURL";
  d && (B = new d([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51])), !o || t.toBlob && t.toBlobHD || (t.toBlob || (t.toBlob = function (t, o) {
    var e, n, s, i;
    o = o || "image/png", this.mozGetAsFile ? t(this.mozGetAsFile("canvas", o)) : this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(o) ? t(this.msToBlob()) : (n = Array.prototype.slice.call(arguments, 1), s = (e = this[l].apply(this, n)).indexOf(","), n = e.substring(s + 1), s = a.test(e.substring(0, s)), Blob.fake ? ((i = new Blob()).encoding = s ? "base64" : "URI", i.data = n, i.size = n.length) : d && (i = s ? new Blob([function (t) {
      for (var o, e, n = t.length, s = new d(n / 4 * 3 | 0), i = 0, a = 0, l = [0, 0], b = 0, r = 0; n--;) {
        e = t.charCodeAt(i++), 255 !== (o = B[e - 43]) && void 0 !== o && (l[1] = l[0], l[0] = e, r = r << 6 | o, 4 === ++b && (s[a++] = r >>> 16, 61 !== l[1] && (s[a++] = r >>> 8), 61 !== l[0] && (s[a++] = r), b = 0));
      }

      return s;
    }(n)], {
      type: o
    }) : new Blob([decodeURIComponent(n)], {
      type: o
    })), t(i));
  }), !t.toBlobHD && t.toDataURLHD ? t.toBlobHD = function () {
    l = "toDataURLHD";
    var t = this.toBlob();
    return l = "toDataURL", t;
  } : t.toBlobHD = t.toBlob);
}("undefined" != typeof self && self || "undefined" != typeof window && window || (void 0).content || void 0);