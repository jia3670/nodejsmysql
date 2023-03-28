function cg() {
    window.location.href = "../../bootstrap框架2/index.html"
    $('#userl').val("")
    $('#passwordl').val("")
}
function cg2() {
    window.location.href = "../../bootstrap框架2/indexg.html"
    $('#userl').val("")
    $('#passwordl').val("")
}
//登录
$("#login").click(function () {
    let stus = new Stue($('#userl').val(), $('#passwordl').val());
    $.ajax({
        type: 'post',
        url: "http://localhost:3000/api/addById3",
        data: stus,
        success: function (name) {
            if (name == "ccw") {
                tsy("暂无数据请注册");
                setTimeout('animationreg()', 2500);
            }
            if (name == "true") {
                tsy("用户名或密码错误");
            }
            if (name.ccc == "gl") {
                tsy("管理员登录成功");
                sessionStorage.token = name.token;
                setTimeout('cg2()', 2500);
            }
            if (name.ccc == "yh") {
                tsy("学生登录成功");
                sessionStorage.token = name.token;
                setTimeout('cg()', 2500);
            }
        }
    })
})