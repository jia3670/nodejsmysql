//提示语句
function tsy(tsy) {
    $("#ts").html(tsy);
    $("#ts").fadeToggle(1300);
    $("#ts").fadeToggle(1300);
}
let ss = /^[\u4e00-\u9fa5]{2,8}$/;
let se = /^\d{11}$/;
//渲染学生数据
xr = () => {
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/stupost",
        success: (eew) => {
            if (eew.es == "暂无数据") {
                $("#tbody").html(eew.s)
            } else {
                $("#tbody").html(eew.s)
                let ss = eew.c;
                let cs = eew.cs;
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

        }
    }
    )
}
xr()
//清除空格
function qkg(ew) {
    let qkgh = ew.replace(/\s*/g, "");
    return qkgh
}

//渲染班级
function xrclass() {
    $.ajax({
        type: "get",
        url: "http://localhost:3000/api/xrget",
        success: (se) => {
            $("#classname1").html(se.s);
            $("#stu_man").click()
        }
    }
    )
}
function xrxclass() {
    $.ajax({
        type: "get",
        url: "http://localhost:3000/api/xrget",
        success: (cs) => {
            $("#classname1x").html(cs.s);
        }
    }
    )
}
$("#stu_man").click(
    function () {
        $.ajax({
            type: "get",
            url: "http://localhost:3000/api/xbtn",
            success: (se) => {
                if (se.s2 == "暂无数据") {
                    $("#dormitoryNo").html(se.s)
                } else {
                    if (se.s2 == [] || se.s2.length == 0) {
                        $("#dormitoryNo").html(se.s)
                    } else {
                        $("#dormitoryNo").html(se.s)
                        for (let item of se.s2) {
                            $(".qss").each(function (c, ee) {
                                if ($(ee).val() == item.dormitoryNo) {
                                    $(ee).remove();
                                }
                            })
                        }
                        if ($(".qss").length == 0) {
                            let c = `<option  disabled=disabled>暂无宿舍</option>`
                            $("#dormitoryNo").html(c);
                        }
                    }

                }
            }
        })
    }
)
$("#stu_woman").click(
    function () {
        $.ajax({
            type: "get",
            url: "http://localhost:3000/api/xbtv",
            success: (se) => {
                if (se.s2 == "暂无数据") {
                    $("#dormitoryNo").html(se.s)
                } else {
                    if (se.s2 == [] || se.s2.length == 0) {
                        $("#dormitoryNo").html(se.s)
                    } else {
                        $("#dormitoryNo").html(se.s)
                        for (let item of se.s2) {
                            $(".qss").each(function (c, ee) {
                                if ($(ee).val() == item.dormitoryNo) {
                                    $(ee).remove();
                                }
                            })
                        }
                        if ($(".qss").length == 0) {
                            let c = `<option  disabled=disabled>暂无宿舍</option>`
                            $("#dormitoryNo").html(c);
                        }
                    }
                }
            }
        })
    }
)
$("#stu_manx").click(
    function () {
        $.ajax({
            type: "get",
            url: "http://localhost:3000/api/xbxn",
            success: (se) => {
                if (se.s2 == "只有当前数据") {
                    $("#dormitoryNox").html(se.s)
                } else {
                    $("#dormitoryNox").html(se.s)
                    for (let item of se.s2) {
                        $(".qqs").each(function (c, ee) {
                            if ($(ee).val() == item.dormitoryNo) {
                                $(ee).remove();
                            }
                        })
                    }
                    if ($(".qqs").length == 0) {
                        let c = `<option  disabled=disabled>暂无宿舍</option>`
                        $("#dormitoryNox").html(c);
                    }
                }
            }
        })
    }
)
$("#stu_womanx").click(
    function () {
        $.ajax({
            type: "get",
            url: "http://localhost:3000/api/xbxv",
            success: (se) => {
                if (se.s2 == "只有当前数据") {
                    $("#dormitoryNox").html(se.s)
                } else {
                    $("#dormitoryNox").html(se.s)
                    for (let item of se.s2) {
                        $(".qqs").each(function (c, ee) {
                            if ($(ee).val() == item.dormitoryNo) {
                                $(ee).remove();
                            }
                        })
                    }
                    if ($(".qqs").length == 0) {
                        let c = `<option  disabled=disabled>暂无宿舍</option>`
                        $("#dormitoryNox").html(c);
                    }
                }
            }
        })
    }
)
//判断学生性别（添加）
function stu_sex() {
    let stu_sex = document.getElementById('stu_man').checked ? document.getElementById('stu_man').value : document.getElementById('stu_woman').value;
    return stu_sex;
}
//判断学生性别（修改）
function stu_sexxg() {
    let stu_sexeer = document.getElementById('stu_manx').checked ? document.getElementById('stu_manx').value : document.getElementById('stu_womanx').value;
    return stu_sexeer;
}
//创建学生修改class
class Student {
    constructor(stu_name, stu_age, stu_sex, nation, classname, contact, address, dormitoryNo, status) {
        this.name = stu_name;
        this.age = stu_age;
        this.sex = stu_sex;
        this.nation = nation;
        this.classname = classname;
        this.contact = contact;
        this.address = address;
        this.dormitoryNo = dormitoryNo;
        this.status = status;
    }
}
//添加学生数据
function tianjia() {
    let name = qkg($("#stu_name").val())
    let age = qkg($("#stu_age").val())
    let nation = qkg($("#nation").val())
    let contact = qkg($("#contact").val())
    let address = qkg($("#address").val())
    if (name == '' || age == '' || nation == '' || contact == '' || address == '') {
        tsy("所有数据均要添加")
        return
    }
    if (ss.test(name) != true) {
        tsy("学生姓名2~8位中文")
        return
    }
    if (ss.test(nation) != true) {
        tsy("民族2~8位中文")
        return
    }
    if (se.test(contact) != true) {
        tsy("联系方式11位数字")
        return
    }
    let cas = new Student(name, age, stu_sex(), nation, $("#classname1").val(), contact, address, $("#dormitoryNo").val(), $("#status").val());
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/stuposttj",
        data: cas,
        success: (eew) => {
            if (eew == "z") {
                tsy("添加成功");
                $("#myModal").modal("hide");
                xr()
                $("#stu_name").val("")
                $("#stu_age").val("")
                $("#nation").val("")
                $("#contact").val("")
                $("#address").val("")
            }
        }
    })
}
//删除指定学生数据
function shan(id) {
    let shan = {
        "id": id
    }
    $.ajax({
        type: "delete",
        url: "http://localhost:3000/api/studeleteshan",
        data: shan,
        success: (eew) => {
            if (eew == "z") {
                tsy("删除成功");
                xr()
            }
        }
    })
}
//判断学生修改回显性别
function stu_sexx(sex) {
    if (sex == "男") {
        $("#stu_womanx").attr("checked", "")
        return $("#stu_manx").attr("checked", true)
    } else {
        $("#stu_manx").attr("checked", "")
        return $("#stu_womanx").attr("checked", true)
    }
}
//修改回显学生数据
function xiugai(id) {
    xrxclass()
    let xiugai = {
        "id": id
    }
    $.ajax({
        type: "put",
        url: "http://localhost:3000/api/stuputxiugai",
        data: xiugai,
        success: (eew) => {
            $("#stu_namex").val(eew.name);
            $("#stu_agex").val(eew.age);
            stu_sexx(eew.sex)
            $("#nationx").val(eew.nation);
            $("#contactx").val(eew.contact);
            $("#addressx").val(eew.address);
            $("#nationx").val(eew.nation);
            $("#classname1x").val(eew.classname);
            if (eew.sex == "男") {
                $("#stu_manx").click()
            } else {
                $("#stu_womanx").click()
            }
            $("#dormitoryNox").val(eew.dormitoryNo);
            $("#statusx").val(eew.status);
        }
    })
}
//修改指定学生数据
function xg() {
    let name = qkg($("#stu_namex").val())
    let age = qkg($("#stu_agex").val())
    let nation = qkg($("#nationx").val())
    let contact = qkg($("#contactx").val())
    let address = qkg($("#addressx").val())
    if (name == '' || age == '' || nation == '' || contact == '' || address == '') {
        tsy("所有数据均要添加")
        return
    }
    if (ss.test(name) != true) {
        tsy("学生姓名2~8位中文")
        return
    }
    if (ss.test(nation) != true) {
        tsy("民族2~8位中文")
        return
    }
    if (se.test(contact) != true) {
        tsy("联系方式11位数字")
        return
    }
    let cas = new Student(name, age, stu_sexxg(), nation, $("#classname1x").val(), contact, address, $("#dormitoryNox").val(), $("#statusx").val());
    $.ajax({
        type: "put",
        url: "http://localhost:3000/api/stuputxg",
        data: cas,
        success: (eew) => {
            if (eew == "z") {
                tsy("修改成功")
                $("#myModal2").modal("hide");
                xr()
                $("#stu_namex").val("");
                $("#stu_agex").val("");
                $("#nationx").val("");
                $("#contactx").val("");
                $("#addressx").val("");
                $("#nationx").val("");
                $("#classname1x").val("");
                $("#dormitoryNox").val("");
                $("#statusx").val("");
            }
        }
    })
}
//查找指定学生数据
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
        url: "http://localhost:3000/api/stugetchazhao",
        data: cz,
        success: (eew) => {
            $("#tbody").html(eew.s)
            let ss = eew.c;
            let cs = eew.cs;
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