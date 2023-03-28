//提示语句
function tsy(tsy) {
    $("#ts").html(tsy);
    $("#ts").fadeToggle(1300);
    $("#ts").fadeToggle(1300);
}
//渲染宿舍数据
xr = () => {
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/qspost",
        success: (eew) => {
            $("#tbody").html(eew.s)
            let ss = eew.c;
            for (let i = 0; i < ss.length; i++) {
                $(".yz").each(function (c, ee) {
                    if ($(ee).attr("index") == ss[i].dormitoryNo) {
                        $(ee).text(ss[i].sl);
                    }
                })
            }
            $(".yz").each(function (c, ee) {
                if ($(ee).text() == '') {
                    $(ee).text("0")
                }
            })

            for (let i = 0; i < ss.length; i++) {
                $(".kz").each(function (c, ee) {
                    if ($(ee).attr("index") == ss[i].dormitoryNo) {
                        $(ee).text(8 - ss[i].sl);
                    }
                })
            }
            $(".kz").each(function (c, ee) {
                if ($(ee).text() == '') {
                    $(ee).text("8")
                }
            })
        }
    }
    )
}
xr()
//去除空格
function qkg(ew) {
    let qkgh = ew.replace(/\s*/g, "");
    return qkgh
}
//创建宿舍class
class Chamber {
    constructor(name, sex) {
        this.name = name;
        this.sex = sex;
    }
}
//添加宿舍数据
function tianjia() {
    let name = qkg($("#name").val());
    if (name == '') {
        tsy("宿舍名称不得为空")
        return
    }
    let cas = new Chamber(name, $("#sex").val());
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/qsposttj",
        data: cas,
        success: (eew) => {
            if (eew == "z") {
                tsy("添加成功");
                $("#myModal").modal("hide");
                xr()
                $("#name").val("");
            }
            if (eew == "c") {
                tsy("宿舍名称重复");
            }
        }
    })
}
//删除指定寝室数据
function shan(id) {
    let shan = {
        "id": id
    }
    $.ajax({
        type: "delete",
        url: "http://localhost:3000/api/qsdeleteshan",
        data: shan,
        success: (eew) => {
            if (eew == "z") {
                tsy("删除成功");
                xr()
            }
        }
    })
}
//修改回显宿舍数据
function xiugai(id) {
    let xiugai = {
        "id": id
    }
    $.ajax({
        type: "put",
        url: "http://localhost:3000/api/qsputxiugai",
        data: xiugai,
        success: (eew) => {
            $("#namex").val(eew);
        }
    })
}
//修改指定宿舍数据
function xg() {
    let name = qkg($("#namex").val())
    if (name == '') {
        tsy("宿舍名称不得为空")
        return
    }
    let xiugai = {
        name: name
    }
    $.ajax({
        type: "put",
        url: "http://localhost:3000/api/qsputxg",
        data: xiugai,
        success: (eew) => {
            if (eew == "z") {
                tsy("修改成功")
                $("#myModal2").modal("hide");
                xr()
                $("#namex").val("");
            }
            if (eew == "c") {
                tsy("宿舍名称重复");
            }
        }
    })
}
//查找宿舍数据
function chazhao() {
    let cz = {
        name: qkg($("#chazhao").val())
    }
    if (cz.name == '') {
        xr()
        return
    }
    $.ajax({
        type: "get",
        url: "http://localhost:3000/api/qsgetchazhao",
        data: cz,
        success: (eew) => {
            $("#tbody").html(eew.s)
            let ss = eew.c;
            for (let i = 0; i < ss.length; i++) {
                $(".yz").each(function (c, ee) {
                    if ($(ee).attr("index") == ss[i].dormitoryNo) {
                        $(ee).text(ss[i].sl);
                    }
                })
            }
            for (let i = 0; i < ss.length; i++) {
                $(".kz").each(function (c, ee) {
                    if ($(ee).attr("index") == ss[i].dormitoryNo) {
                        $(ee).text(8 - ss[i].sl);
                    }
                })
            }
        }
    })
}
function cha(id) {
    let st = {
        id: id
    }
    $.ajax({
        type: "get",
        url: "http://localhost:3000/api/xq",
        data: st,
        success: (ew) => {
            let zc = ew.zc;
            let wc = ew.wc;
            let qj = ew.qj;
            let qs = ew.ccs;
            $("#eesd").text(qs + "宿舍信息表");
            let zcr = []
            for (let i = 0; i < zc.length; i++) {
                zcr.push(zc[i].name)
            }
            let wcr = []
            for (let i = 0; i < wc.length; i++) {
                wcr.push(wc[i].name)
            }
            let qjr = []
            for (let i = 0; i < qj.length; i++) {
                qjr.push(qj[i].name)
            }
            if (zc.length == 0) {
                $("#zai1").text("无人在宿舍")
            } else {
                $("#zai1").text(zc.length + "人在宿舍分别是：" + zcr)
            }
            if (wc.length == 0) {
                $("#wai1").text("无人外出")
            } else {
                $("#wai1").text(wc.length + "人外出未归分别是：" + wcr)
            }
            if (qj.length == 0) {
                $("#qing1").text("无人请假")
            } else {
                $("#qing1").text(qj.length + "人请假分别是：" + qjr)
            }

        }
    })
}
function xiangqing(id) {
    let st = {
        id: id
    }
    $.ajax({
        type: "get",
        url: "http://localhost:3000/api/xqxx",
        data: st,
        success: function (data) {
            $("#xqxx").text(data.ccs);
            $("#tbody2").html(data.s);
            let ss = data.c;
            let cs = data.cs;
            for (let i = 0; i < ss.length; i++) {
                $(".qs").each(function (c, ee) {
                    if ($(ee).text() == ss[i].id) {
                        $(ee).text(ss[i].name);
                    }
                })
            }
            for (let i = 0; i < cs.length; i++) {
                $(".cls").each(function (c, ee) {
                    if ($(ee).text() == cs[i].id) {
                        $(ee).text(cs[i].name);
                    }
                })
            }
        }
    })
}