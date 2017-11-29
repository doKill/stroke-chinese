var l = 0;
window.CharAnimate = function(chardata, soder) {
    l && l.ClearTimer();
    l = this;
    this.charData = chardata;
    this.sorder = soder;
    m("eStroke");
    this.charWriter = new CharPainter;
    this.charWriter.parse(this.charData);
    var d = new p;
    d.parse(this.sorder);
    this.charWriter.drawBG("eStroke");
    this.charWriter.drawChar("eStroke", d);
    this.ClearTimer = function() {
        this.charWriter.ClearTimer()
    }
};
function drawChar(chardata, soder) {
    function draw(drawObj) {
        m("eStroke");//画米字格
        drawObj.painter = new CharPainter;//初始化绘制对象，n对象里就是包含了很多绘制函数,和坐标bia
        drawObj.painter.parse(drawObj.charData[drawObj.q]);//解析坐标数据并存在b.painter.h数组里，数组里存着集合，包含元素x/y的边界和坐标值数组
        var a = new p;
        a.parse(drawObj.sorder[drawObj.q]);//解析sorder,16进制字符串
        drawObj.painter.drawBG("eStroke");//用cccccc先写出字的背景
        drawObj.painter.drawChar("eStroke", a);
        drawObj.timer = setTimeout(function() {
            TimedDraw(drawObj)
        },
        10)
    }
    function TimedDraw(drawObj) { ! drawObj.painter || !drawObj.painter.IsAnimating() ? (++drawObj.q, drawObj.timer = drawObj.q >= drawObj.sorder.length ? 0 : setTimeout(function() {
            animTimer = setTimeout(function() {
                draw(drawObj)
            },
            500)
        },
        500)) : drawObj.timer = setTimeout(function() {
            TimedDraw(drawObj)
        },
        10)
    }
    r && r.ClearTimer();
    r = this;
    this.charData = chardata;//cvec密文
    this.sorder = soder;//sorder值
    this.painter = this.q = 0;
    clearTimeout(this.timer);
    chardata.length && draw(this);
    this.ClearTimer = function() {
        clearTimeout(this.timer);
        this.painter && this.painter.ClearTimer()
    }
}
var r = 0;
window.startAnimate = function(chardata, sorder) {
    r = new drawChar(chardata, sorder)
};
window.newContour = function(e, c) {
    0 != cvec && cvec.ClearTimer();
    m("eStroke");
    cvec = new CharPainter;
    cvec.parse(e);
    var d = new p;
    d.parse(c);
    cvec.i("eStroke");
    cvec.o("eStroke", d)
};
function m(e) {
    e = document.getElementById(e);
    var c = e.getContext("2d");
    setLineDash(c, [10, 2, 2, 2]);
    c.fillStyle = bgcolor;
    c.fillRect(0, 0, e.width, e.width);
    c.beginPath();
    "Star" == plan ? (c.moveTo(0, 0), c.lineTo(e.width, e.width), c.moveTo(e.width, 0), c.lineTo(0, e.width), c.moveTo(e.width / 2, 0), c.lineTo(e.width / 2, e.width), c.moveTo(0, e.width / 2), c.lineTo(e.width, e.width / 2)) : "Four Square" == plan ? (c.moveTo(0, 0), c.moveTo(e.width / 2, 0), c.lineTo(e.width / 2, e.width), c.moveTo(0, e.width / 2), c.lineTo(e.width, e.width / 2)) : "Nine Square" == plan && (c.moveTo(0, 0), c.moveTo(e.width / 3, 0), c.lineTo(e.width / 3, e.width), c.moveTo(2 * e.width / 3, 0), c.lineTo(2 * e.width / 3, e.width), c.moveTo(0, e.width / 3), c.lineTo(e.width, e.width / 3), c.moveTo(0, 2 * e.width / 3), c.lineTo(e.width, 2 * e.width / 3));
    c.strokeStyle = planColor;
    c.stroke();

    c.strokeStyle = "#cccccc";
    c.font="40px Georgia";
    c.strokeText("记忆大师",20,40+(e.width-40)/3);
}
window.init = function(e) {
    m("eStroke");
    //e && (e.action = "/common/fcg/estroke1.fcg?task=getPhrase", e.submit())
    e && (e.action = "hao.html", e.submit())
};
window.drawPlan = m;
window.finalize = function(e) {
    e.ClearTimer()
};
window.isAnimating = function(e) {
    return e.IsAnimating()
};
function ptInfo(x, y, flag) {
    this.x = x;
    this.y = y;
    this.flag = flag
}
function Stroke() {
    function DrawFromLeft2Right(ctx, stroke) {//从左到右
        stroke.cur_pos > stroke.end ? stroke.timer = 0 : (ctx.putImageData(stroke.imgData, stroke.left, stroke.top),
            stroke.cur_pos += eval(speed),
            ctx.save(),
            ctx.beginPath(),
            ctx.rect(stroke.begin, stroke.top, stroke.cur_pos - stroke.begin, stroke.bottom - stroke.top),
            ctx.clip(),
            ctx.beginPath(),
            stroke.Contour(ctx),
            ctx.fill(),
            ctx.restore(),
            stroke.timer = setTimeout(function() {
            DrawFromLeft2Right(ctx, stroke)
        },
        20))
    }
    function DrawFromTop2Bottom(ctx, stroke) {//从上到下
        stroke.cur_pos > stroke.end ? stroke.timer = 0 : (ctx.putImageData(stroke.imgData, stroke.left, stroke.top),
            stroke.cur_pos += eval(speed),
            ctx.save(),
            ctx.beginPath(),
            ctx.rect(stroke.left, stroke.begin, stroke.right - stroke.left, stroke.cur_pos - stroke.begin),
            ctx.clip(),
            ctx.beginPath(),
            stroke.Contour(ctx),
            ctx.fill(),
            ctx.restore(),
            stroke.timer = setTimeout(function() { DrawFromTop2Bottom(ctx, stroke) },
        20))
    }
    function DrawRight2Left(ctx, stroke) {//从右到左
        stroke.cur_pos < stroke.end ? stroke.timer = 0 : (ctx.putImageData(stroke.imgData, stroke.left, stroke.top),
            stroke.cur_pos -= eval(speed),
            ctx.save(),
            ctx.beginPath(),
            ctx.rect(stroke.cur_pos, stroke.top, stroke.begin - stroke.cur_pos, stroke.bottom - stroke.top),
            ctx.clip(),
            ctx.beginPath(),
            stroke.Contour(ctx),
            ctx.fill(),
            ctx.restore(),
            stroke.timer = setTimeout(function() { DrawRight2Left(ctx, stroke) },
        20))
    }
    function DrawBottom2Top(ctx, stroke) {//从下到上
        stroke.cur_pos < stroke.end ? stroke.timer = 0 : (ctx.putImageData(stroke.imgData, stroke.left, stroke.top),
            stroke.cur_pos -= eval(speed),
            ctx.save(),
            ctx.beginPath(),
            ctx.rect(stroke.left, stroke.cur_pos, stroke.right - stroke.left, stroke.begin - stroke.cur_pos),
            ctx.clip(),
            ctx.beginPath(),
            stroke.Contour(ctx),
            ctx.fill(),
            ctx.restore(),
            stroke.timer = setTimeout(function() { DrawBottom2Top(ctx, stroke) },
        20))
    }
    this.left = 1E4;//10000//x最小值
    this.right = 0;//x最大值
    this.top = 1E4;//y最小值
    this.imgData = this.G = this.bottom = 0;
    this.pts = [];//坐标集
    this.addPoint = function(pt) {
        this.left > pt.x && (this.left = pt.x);
        this.right < pt.x && (this.right = pt.x);
        this.top > pt.y && (this.top = pt.y);
        this.bottom < pt.y && (this.bottom = pt.y);//y最大值
        this.pts.push(pt)
    };
    this.IsAnimating = function() {
        return 0 != this.timer
    };
    this.ClearTimer = function() {
        clearTimeout(this.timer)
    };
    this.PutImg2Canvas = function(ctx) {
        this.imgData && ctx.putImageData(this.imgData, this.left, this.top)
    };
    this.DrawStroke = function(ctx, flag) {
        this.imgData = ctx.getImageData(this.left, this.top, this.right - this.left, this.bottom - this.top);
        switch (flag & 3) {
        case 0://从左到右
            this.begin = this.left;
            this.end = this.right;
            this.cur_pos = this.begin;
            DrawFromLeft2Right(ctx, this);
            break;
        case 1://从上到下
            this.begin = this.top;
            this.end = this.bottom;
            this.cur_pos = this.begin;
            DrawFromTop2Bottom(ctx, this);
            break;
        case 2://从右到左
            this.begin = this.right;
            this.end = this.left;
            this.cur_pos = this.begin;
            DrawRight2Left(ctx, this);
            break;
        case 3://从下到上
            this.begin = this.bottom,
            this.end = this.top,
            this.cur_pos = this.begin,
            DrawBottom2Top(ctx, this)
        }
    };
    this.Contour = function(ctx) {
        var all_pts = this.pts,
        c = !1,
        ptMiddle;
        if (all_pts[0].flag) ptMiddle = all_pts[0];
        else if (all_pts[1].flag) {
            var middleX = (all_pts[0].x + all_pts[1].x) / 2,
            middleY = (all_pts[0].y + all_pts[1].y) / 2;
            ptMiddle = new ptInfo(middleX, middleY, 1)
        } else ptMiddle = all_pts[0];
        for (var tmp_x = ptMiddle.x, tmp_y = ptMiddle.y, pts_num = all_pts.length, h = 1; h <= pts_num; ++h) {
            var x = all_pts[h % pts_num].x,
            y = all_pts[h % pts_num].y;
            if (all_pts[h % pts_num].flag) {
                if (1 < h || 1 == h && all_pts[0].flag) c ? ctx.lineTo(tmp_x, tmp_y) : (ctx.moveTo(tmp_x, tmp_y), c = !0),
                ctx.lineTo(x, y);
                //ctx.stroke();
                tmp_x = x;
                tmp_y = y;
                ptMiddle = all_pts[h % pts_num]
            } else {
                if (all_pts[(h + 1) % pts_num].flag) {
                    ptMiddle = this.DrawCurveLine(ctx, ptMiddle, all_pts[h % pts_num],
                        all_pts[(h + 1) % pts_num], c),
                        c = !0,
                        tmp_x = ptMiddle.x,
                        tmp_y = ptMiddle.y,
                        ++h;
                } else {
                    tmp_y = all_pts[(h + 1) % pts_num],
                        tmp_x = (all_pts[h % pts_num].x + tmp_y.x) / 2,
                        tmp_y = (all_pts[h % pts_num].y + tmp_y.y) / 2,
                        ptMiddle = this.DrawCurveLine(ctx, ptMiddle, all_pts[h % pts_num], new ptInfo(tmp_x, tmp_y, 1), c),
                        c = !0,
                        tmp_x = ptMiddle.x,
                        tmp_y = ptMiddle.y;
                }
            }
        }
    };
    this.DrawCurveLine = function(ctx, ptStart, ptCtl, ptEnd, isNeedDrawLine) {
        var ptStartX = ptStart.x;
        ptStart = ptStart.y;
        isNeedDrawLine ? ctx.lineTo(ptStartX, ptStart) : ctx.moveTo(ptStartX, ptStart);
        //ctx.stroke();
        ctx.quadraticCurveTo(ptCtl.x, ptCtl.y, ptEnd.x, ptEnd.y);
        //ctx.stroke();
        return ptEnd
    }
}
function CharPainter() {
    function drawStroke(ctx, writer, sorder) {
        if ( - 1 == writer.cur_pos || !writer.strokes[writer.cur_pos].IsAnimating()) {
            if (0 <= writer.cur_pos && !(writer.cur_pos < sorder.order_data.length && sorder.order_data[writer.cur_pos + 1] & 128) && transientColor.length && !writer.t) {
                writer.timer = setTimeout(function() {
                        writer.t = !0;
                        var idx = sorder.getIndexOfOrder(sorder.CountNumItLessThan128(writer.cur_pos));
                        if (0 <= idx) {
                            for (var i = idx; i <= writer.cur_pos; ++i) writer.strokes[i].PutImg2Canvas(ctx);
                            for (i = idx; i <= writer.cur_pos; ++i)
                                ctx.save(),
                                ctx.beginPath(),
                                writer.strokes[i].Contour(ctx),
                                idx = strokeColor,
                            sorder.biggerThan64(i) && (idx = radicalColor),
                                ctx.fillStyle = idx,
                                ctx.fill(),
                                ctx.restore()
                        }
                        drawStroke(ctx, writer, sorder)
                    },
                    200);
                return
            }
            if (++writer.cur_pos < sorder.order_data.length) {
                writer.t = !1;
                var clr = transientColor;
                timer.length || (timer = strokeColor, f.biggerThan64(d.cur_pos) && (timer = radicalColor));
                ctx.fillStyle = clr;
                clr = sorder.order_data[writer.cur_pos];
                if (clr & 128) writer.strokes[writer.cur_pos].DrawStroke(ctx, clr);
                else {
                    writer.timer = setTimeout(function() {
                            writer.strokes[writer.cur_pos].DrawStroke(ctx, sorder.order_data[writer.cur_pos]);
                            writer.timer = setTimeout(function() {
                                    drawStroke(ctx, writer, sorder)
                                },
                                10)
                        },
                        500);
                    return
                }
            } else {
                writer.timer = 0;
                return
            }
        }
        writer.timer = setTimeout(function() {
                drawStroke(ctx, writer, sorder)
            },
            10)
    }
    this.strokes = [];
    this.addStroke= function(c) {
        this.strokes.push(c)
    };
    this.DecodeString = function(c) {//解密字符串：从g点开始(循环移位)取值字符与私钥的第(g%147)字符进行xor得到其真实字符&FF
        //left.length=1595
        //Math.floor 下舍
        //e=531//531.667
        for (var d = c.length,
        e = Math.floor(d / 3), b = "", a = 0; a < c.length; ++a) {
            var g = a - e;//no.1 g=-531
            0 > g && (g += d);// g=1064=-531+1595
            b = b.concat(String.fromCharCode(c.charCodeAt(g) ^ "Copyright EON Media Limited 1999-2006 - http://www.eon.com.hk, Unit C, 13/F Skyview Cliff, 49 Conduit Road MidLevels Hong Kong. All Rights Reserved".charCodeAt(g % 147) & 15))
        }
        /*明文："09023f5cc2add1f5cb2ad00f5cd2ad31f5ce2ae80f5c32ae51f5c52afd1f5df2a970f5d92aaf1f5c62aa20f5d82aa31f5dd2aa50f5de2aa31f5d62aae0f5ab2aaa1f5aa2aa80f5a82a951f5d42a900f5d22a981f5d12a8b0f5dd2afe1f5db2ae71f5c62aed0f5c22ad31017f5c42ad80f5cc2add1f5c22ad31f5c22ad00f5c72ade1f5dd2adb0f5d02ad81f5a92ac41f5a72acc0f5a62a361f5b92a310f5a72a3f1f5a42a3d0f5a52a3d1f5a22a3d0f5d22acc1f5dd2ac21027f5d02ad81f5ab2ae90f5aa2ae71f5ad2afa0f5ad2afc1f5ad2af01f5ad2af50f5ab2a881f5ab2a8a0f5ad2a8b1f5a02a8c0f5b92af61f5ba2af40f5b82af11f5a42afb0f5a52ae31f5ac2add0f5a92ac41f5d22acc1f5d32acc0f5d32acc1f5cf2a270f5f12a391f5ff2a390f5f12a3b1f5c42ac80f5dd2ac21021f5c32ae51f5f62ae30f5fc2aee1f5fa2aed0f5fb2aee1f5e42ae20f5e32ae51f5e12ae60f5e02af91f5e02afa0f5e52afa1f5f82af90f5fc2afa1f5c82afc0f5c52afd1f5dd2afe1f5d52aff0f5ad2af01f5ad2afc1f5d22af90f5db2ae71021f56b2a9b1f56a2a9e0f5692a9f1f5942a910f58f2a861f5b62a810f5b32a841f5bf2a870f5bd2a991f5ba2a9d0f5be2a9d1f5882a9d0f58f2a9e1f59f2a930f5682aa81f56c2aa90f5602a971f57c2a900f57f2a9d1f57e2a9a0f57a2a991006f59a2a881f5922a820f56b2a9b1f57a2a991f5652a870f59f2af61022f56e2a3a0f5912a2b1f59a2a170f5982a171f59a2a3a1f5922acd0f59f2aec1f59c2ae21f59d2ae50f59a2af81f59b2af00f5852af51f5802a880f5852a891f5872a8a0f5982a881f59b2a880f59a2a881f59f2af61f5952af20f5962ae41f5692aed1013f5982a171f5872a160f5852a291f5832a2e0f58a2a241f5892a260f5b62a271f5b72a390f5892a391f58c2a380f5832a271f5982a260f59a2a3a1024f59f2aec1f59f2aec0f59f2aec1f58e2aea0f5b32ad61f5be2ad60f5bd2ad61f5b82ad70f5a72aea1f5a52aec0f5a62aed1f58a2ae00f59c2ae21f5962ae41f5652ae60f57c2af81f5772afb0f5412ae41f5422ae10f5432ae01f5402aee0f54f2aee1f5672aee0f5692aed1"*/
        return b
    };
    this.parse = function(char_data) {
        /*密文：
        "7>f<f;5igc4i;d>7ejb0j<i:6dgc0o<jk0a210k5n56a96>a2ah7n=73i8h99m3g?o1c7>ab;?`5go;gj7601=o3e?2el52i;b3;ee1?g1fn;ei`7c9ea:nkc0m:he<adi=f7l3:ef22c6`14da6>f<g85ia65i;e=7eo81j<h96dba1o<l80afg1k5n<6al6?a2am7nho2i8m09mff>o1c6>agg>`5go;go`6f6h<4gjf4o5bk<ec95f7ne6akj5j0b7>bf1?h2di=ob911>=f7?e:e:b3c63c4d=f?f<405i=f4i;997e000j<5o6d<60o<k;0a870k5j76a2;>a2eh7n693i8ll9m9<?o1bb>a8g?`5an;g0a6f6414g5d4o5;i<e<l5f76g6a4:4j00=>ba0>h26h=of70g9:00h>?5e55f1d;65b68f;c0c9b52j<a4d4o47m;l0=4407o<0l0a8>1k5166a2=?a21l7n7l2i89i9m9<?o166>a94?`5:m;go3601>o30i2e:a3i;=4;e2`>g19l;e=26c9:8:n?01m:7f<a2m=f705:e`d2c6<d4da`>f<;j5ia24i;9i7el40j<4h6db80o<0o0af60k5016al:>a2?>7n663i86=9m8<?o184>a9b?`5:3;g1=6f65k4g484o5:n<e=15f76g6ak?5j0?0>bf:?h29==ob:1g9:90hbl5311c6<:4d54>f<:>5i565i;887e;81j<5:6d6e1o<1l0a221k50=6a89?a2e87n<92i8l?9m3<>o18:>a2:>`5;strokes;g:=7f64:4g>75o5:7<e7?4f76`6a>h5<72c9:f:nkd1m:7a<ado<f70a:efc3c6=g4dab?f<`:5i`64i;bh7em70j<om6d`60o<k50ad10k5i36aon>a2f;7nkm3i8o>9mea?o18b>ad3?`5:strokes;gl76f65?4gi45o55:<e`?4f78b6ak15j012>bfj?h24:=ob:1g9820hb94e5661dg64b6;0;clb8b51i<ah`5o46;;lla5b570;hhf10?0?3n1gc8nkc6a;fm<og?=strokes=hh2dj:5f6oe3bj>0e>j5;db52j<e3>abm1e:jb7h=72i4`9?hej4`0o52in<7f>k65oa2=j5fm5ie60d0g`0gd72i5m4;fia0c:ob?deh0f9hl;ed<0g<h1?c957f8d<6e9:?i2c5<d66?e:i?:j4b5h<`d1mfd2i3da9hc>4a5`:;gch0b<c1=o`68415i4g4?strokes`45`0o`2ikj6f>l<5od2=j5a;5i`30d0`20gaa2i5mf;flf0c:j0?d`10f9h4;ef01g<strokes>?ccc6f8a>6e3<>i2e><d<?>e:l9:j?f4h<e41m3e3i3a69h5m4a5b>;g5h0b<d1=ogf8b5fk3ec?84>2`0h32ik66f>nl5oe8<j5ch5ia41d0ba0gce3i5hf;fng1c:od?db90f9hi;ec10g<hk?c887f8aj6e8k?i2fc<d7l?e:l>:j4c5h<f91mf72i3bb9h`=5a5a4;g`=1b<a7=obg9b5c:3ee>8b9de7mgd8i;f99nm"
        *
         * 明文：
         * "09 023 f5cc 2add 1 f5cb 2ad0 0 f5cd 2ad3 1 f5ce2ae80f5c32ae51f5c52afd1f5df2a970f5d92aaf1f5c62aa20f5d82aa31f5dd2aa50f5de2aa31f5d62aae0f5ab2aaa1f5aa2aa80f5a82a951f5d42a900f5d22a981f5d12a8b0f5dd2afe1f5db2ae71f5c62aed0f5c22ad310
          * 17f5c42ad80f5cc2add1f5c22ad31f5c22ad00f5c72ade1f5dd2adb0f5d02ad81f5a92ac41f5a72acc0f5a62a361f5b92a310f5a72a3f1f5a42a3d0f5a52a3d1f5a22a3d0f5d22acc1f5dd2ac21027f5d02ad81f5ab2ae90f5aa2ae71f5ad2afa0f5ad2afc1f5ad2af01f5ad2af50f5ab2a881f5ab2a8a0f5ad2a8b1f5a02a8c0f5b92af61f5ba2af40f5b82af11f5a42afb0f5a52ae31f5ac2add0f5a92ac41f5d22acc1f5d32acc0f5d32acc1f5cf2a270f5f12a391f5ff2a390f5f12a3b1f5c42ac80f5dd2ac21021f5c32ae51f5f62ae30f5fc2aee1f5fa2aed0f5fb2aee1f5e42ae20f5e32ae51f5e12ae60f5e02af91f5e02afa0f5e52afa1f5f82af90f5fc2afa1f5c82afc0f5c52afd1f5dd2afe1f5d52aff0f5ad2af01f5ad2afc1f5d22af90f5db2ae71021f56b2a9b1f56a2a9e0f5692a9f1f5942a910f58f2a861f5b62a810f5b32a841f5bf2a870f5bd2a991f5ba2a9d0f5be2a9d1f5882a9d0f58f2a9e1f59f2a930f5682aa81f56c2aa90f5602a971f57c2a900f57f2a9d1f57e2a9a0f57a2a991006f59a2a881f5922a820f56b2a9b1f57a2a991f5652a870f59f2af61022f56e2a3a0f5912a2b1f59a2a170f5982a171f59a2a3a1f5922acd0f59f2aec1f59c2ae21f59d2ae50f59a2af81f59b2af00f5852af51f5802a880f5852a891f5872a8a0f5982a881f59b2a880f59a2a881f59f2af61f5952af20f5962ae41f5692aed1013f5982a171f5872a160f5852a291f5832a2e0f58a2a241f5892a260f5b62a271f5b72a390f5892a391f58c2a380f5832a271f5982a260f59a2a3a1024f59f2aec1f59f2aec0f59f2aec1f58e2aea0f5b32ad61f5be2ad60f5bd2ad61f5b82ad70f5a72aea1f5a52aec0f5a62aed1f58a2ae00f59c2ae21f5962ae41f5652ae60f57c2af81f5772afb0f5412ae41f5422ae10f5432ae01f5402aee0f54f2aee1f5672aee0f5692aed1"
  09 023 f5cc 2add 1 f5cb 2ad0 0
     timer=23 坐标数据数量
     idx=5  x=0x2add y=2add p=1
     idx=14 x=0xf5cb k=0x2ad0 p=0
        * */
        this.left = 1E4;//10000//最小x坐标值
        this.right = 0;//最大x坐标值
        this.top = 1E4;//10000//最小y坐标值
        this.bottom = 0;//最大y坐标值
        this.cur_pos = -1;
        this.timer = 0;
        this.t = !1;
        char_data = this.DecodeString(char_data);//解密：循环按位与私钥异或
        for (var i = 2; i < char_data.length;) {
            //v对象存了x/y的边界和坐标值数组
            for (var stroke = new Stroke,
            b = parseInt(char_data.substr(i, 3), 10), i = i + 3, a = 0; a < b; ++a) {//timer=坐标数据数量
                //获取第a个点的x坐标
                var x = parseInt(char_data.substr(i, 4), 16),
                x = x ^ 62953;//37 = 0xf5cc ^ 0xF5E9
                32267 < x && (x -= 65536);//溢出控制
                this.left > x && (this.left = x);//更新this最小边界，减小本地c
                this.right < x && (this.right = x);//更新this最大边界，放大本地g
                //获取第a个点的y坐标
                var i = i + 4,//移动游标
                y = parseInt(char_data.substr(i, 4), 16),
                y = y ^ 10935;//106
                32267 < y && (y -= 65536);
                this.top > y && (this.top = y);//更新this最小边界，减小本地d
                this.bottom < y && (this.bottom = y);//更新this最大边界，减小本地l
                i += 4;
                //坐标集
                stroke.addPoint(new ptInfo(x, y, "1" == char_data.charAt(i)));//u的三个成员赋值：x=x=37,y=y=106,p="1"=="1" //第一个size=23
                ++i
            }
            this.addStroke(stroke)//存储每一笔的坐标集 //size=9
        }
    };
    this.drawBG = function(c) {
        c = document.getElementById(c).getContext("2d");
        c.beginPath();
        //c.strokeStyle="red";
        for (var d = 0; d < this.strokes.length; ++d) this.strokes[d].Contour(c);
        //c.restore();
        c.fillStyle = "#cccccc";
        c.fill()
    };
    this.drawChar = function(c, sorder) {
        var ctx = document.getElementById(c).getContext("2d");
        this.cur_pos = -1;
        sorder.order_data.length && drawStroke(ctx, this, sorder)
    };
    this.IsAnimating = function() {
        return 0 != this.timer
    };
    this.ClearTimer = function() {
        clearTimeout(this.timer);
        for (var c = 0; c < this.strokes.length; ++c) this.strokes[c].ClearTimer()
    }
};
function p() {
    this.order_data = [];//9个数字数组
    this.parse = function(e) {//解密sorder "518451580891219e08" 两个字符一组，二进制编码 e.length=18
        for (var i = 0; i < e.length; i += 2) this.order_data.push(parseInt(e.substr(i, 2), 16) & 255)
    };
    this.getIndexOfOrder = function(idx) {//获取第idx个小于128的序号，未找到返回-1
        for (var i = 0; i < this.order_data.length; ++i) if (! (this.order_data[i] & 128)) {//小于128 0x80
            if (0 == idx) return i; --idx
        }
        return - 1
    };
    this.getFlag = function(idx) {//获取第idx个小于128字符与0x40与的状态
        for (var c = !1,
        i = 0; i < this.order_data.length; ++i) if (! (this.order_data[i] & 128)) {//小于128 0x80
            c = this.order_data[i] & 64;
            if (0 == idx) break; --idx
        }
        return c
    };
    this.biggerThan64 = function(idx) {//判断第idx字符值是否>=64,或者第idx个小于128的字符是否>=64
        return this.order_data[idx] & 64 ? !0 : this.getFlag(this.CountNumItLessThan128(idx))
    };
    this.CountNumItLessThan128 = function(idx) {//计算小于128的数字个数
        for (var c = -1,
        i = 0; i <= idx; ++i) this.order_data[i] & 128 || ++c;
        return c
    }
};