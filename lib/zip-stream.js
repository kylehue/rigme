"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Crc32 = /*#__PURE__*/function () {
  function Crc32() {
    _classCallCheck(this, Crc32);

    this.crc = -1;
  }

  _createClass(Crc32, [{
    key: "append",
    value: function append(e) {
      for (var t = 0 | this.crc, r = this.table, n = 0, a = 0 | e.length; n < a; n++) {
        t = t >>> 8 ^ r[255 & (t ^ e[n])];
      }

      this.crc = t;
    }
  }, {
    key: "get",
    value: function get() {
      return ~this.crc;
    }
  }]);

  return Crc32;
}();

Crc32.prototype.table = function () {
  for (var e, t, r = [], n = 0; n < 256; n++) {
    for (t = n, e = 0; e < 8; e++) {
      t = 1 & t ? t >>> 1 ^ 3988292384 : t >>> 1;
    }

    r[n] = t;
  }

  return r;
}();

var getDataHelper = function getDataHelper(e) {
  e = new Uint8Array(e);
  return {
    array: e,
    view: new DataView(e.buffer)
  };
},
    pump = function pump(t) {
  return t.reader.read().then(function (e) {
    if (e.done) return t.writeFooter();
    e = e.value;
    t.crc.append(e), t.uncompressedLength += e.length, t.compressedLength += e.length, t.ctrl.enqueue(e);
  });
};

function createWriter(t) {
  var i = Object.create(null),
      s = [],
      o = new TextEncoder();
  var c = 0,
      e = 0,
      l,
      d,
      u;

  function h() {
    e++, d = i[s[e]], d ? w() : u && n();
  }

  var r = {
    enqueue: function enqueue(e) {
      if (u) throw new TypeError("Cannot enqueue a chunk into a readable stream that is closed or has been requested to be closed");
      var t = e.name.trim();
      var r = new Date(void 0 === e.lastModified ? Date.now() : e.lastModified);
      if (e.directory && !t.endsWith("/") && (t += "/"), i[t]) throw new Error("File already exists.");
      var n = o.encode(t);
      s.push(t);
      var a = i[t] = {
        level: 0,
        ctrl: l,
        directory: !!e.directory,
        nameBuf: n,
        comment: o.encode(e.comment || ""),
        compressedLength: 0,
        uncompressedLength: 0,
        writeHeader: function writeHeader() {
          var e = getDataHelper(26),
              t = getDataHelper(30 + n.length);
          a.offset = c, a.header = e, 0 === a.level || a.directory || e.view.setUint16(4, 2048), e.view.setUint32(0, 335546376), e.view.setUint16(6, (r.getHours() << 6 | r.getMinutes()) << 5 | r.getSeconds() / 2, !0), e.view.setUint16(8, (r.getFullYear() - 1980 << 4 | r.getMonth() + 1) << 5 | r.getDate(), !0), e.view.setUint16(22, n.length, !0), t.view.setUint32(0, 1347093252), t.array.set(e.array, 4), t.array.set(n, 30), c += t.array.length, l.enqueue(t.array);
        },
        writeFooter: function writeFooter() {
          var e = getDataHelper(16);
          e.view.setUint32(0, 1347094280), a.crc && (a.header.view.setUint32(10, a.crc.get(), !0), a.header.view.setUint32(14, a.compressedLength, !0), a.header.view.setUint32(18, a.uncompressedLength, !0), e.view.setUint32(4, a.crc.get(), !0), e.view.setUint32(8, a.compressedLength, !0), e.view.setUint32(12, a.uncompressedLength, !0)), l.enqueue(e.array), c += a.compressedLength + 16, h();
        },
        fileLike: e
      };
      d || (d = a, w());
    },
    close: function close() {
      if (u) throw new TypeError("Cannot close a readable stream that has already been requested to be closed");
      d || n(), u = !0;
    }
  };

  function n() {
    for (var e, t = 0, r = 0, n = 0; n < s.length; n++) {
      t += 46 + (e = i[s[n]]).nameBuf.length + e.comment.length;
    }

    var a = getDataHelper(t + 22);

    for (n = 0; n < s.length; n++) {
      e = i[s[n]], a.view.setUint32(r, 1347092738), a.view.setUint16(r + 4, 5120), a.array.set(e.header.array, r + 6), a.view.setUint16(r + 32, e.comment.length, !0), e.directory && a.view.setUint8(r + 38, 16), a.view.setUint32(r + 42, e.offset, !0), a.array.set(e.nameBuf, r + 46), a.array.set(e.comment, r + 46 + e.nameBuf.length), r += 46 + e.nameBuf.length + e.comment.length;
    }

    a.view.setUint32(r, 1347093766), a.view.setUint16(r + 8, s.length, !0), a.view.setUint16(r + 10, s.length, !0), a.view.setUint32(r + 12, t, !0), a.view.setUint32(r + 16, c, !0), l.enqueue(a.array), l.close();
  }

  function w() {
    if (d) return d.directory ? d.writeFooter(d.writeHeader()) : d.reader ? pump(d) : void (d.fileLike.stream ? (d.crc = new Crc32(), d.reader = d.fileLike.stream().getReader(), d.writeHeader()) : h());
  }

  return new ReadableStream({
    start: function start(e) {
      l = e, t.start && Promise.resolve(t.start(r));
    },
    pull: function pull() {
      return w() || t.pull && Promise.resolve(t.pull(r));
    }
  });
}

window.ZIP = createWriter;