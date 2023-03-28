//提示语句
function tsy(tsy) {
    $("#ts").html(tsy);
    $("#ts").fadeToggle(1300);
    $("#ts").fadeToggle(1300);
}
//渲染班级数据
xr = () => {
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/clpost",
        success: (eew) => {
            $("#tbody").html(eew)
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
//添加班级数据
function tianjia() {
    let classname = qkg($("#classname").val())
    if (classname == '') {
        tsy("班级名称不得为空")
        return
    }
    let cas = {
        name: classname
    }
    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/clposttj",
        data: cas,
        success: (eew) => {
            if (eew == "z") {
                tsy("添加成功");
                $("#myModal").modal("hide");
                xr()
                $("#classname").val("");
            }
            if (eew == "c") {
                tsy("班级名称重复");
            }
        }
    })
}
//删除指定班级数据
function shan(id) {
    let shan = {
        "id": id
    }
    $.ajax({
        type: "delete",
        url: "http://localhost:3000/api/cldeleteshan",
        data: shan,
        success: (eew) => {
            if (eew == "z") {
                tsy("删除成功");
                xr()
            }
        }
    })
}
//修改班级数据回显
function xiugai(id) {
    let xiugai = {
        "id": id
    }
    $.ajax({
        type: "put",
        url: "http://localhost:3000/api/clputxiugai",
        data: xiugai,
        success: (eew) => {
            $("#classnamex").val(eew);
        }
    })
}
//修改班级数据
function xg() {
    let classname = qkg($("#classnamex").val())
    if (classname == '') {
        tsy("班级名称不得为空")
        return
    }
    let xiugai = {
        name: classname
    }
    $.ajax({
        type: "put",
        url: "http://localhost:3000/api/clputxg",
        data: xiugai,
        success: (eew) => {
            if (eew == "z") {
                tsy("修改成功")
                $("#myModal2").modal("hide");
                xr()
                $("#teachername2").val("");
                $("#classname2").val("");
            }
            if (eew == "c") {
                tsy("班级名称重复");
            }
        }
    })
}
//查找指定班级数据
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
        url: "http://localhost:3000/api/clgetchazhao",
        data: cz,
        success: (eew) => {
            $("#tbody").html(eew)
        }
    })
}