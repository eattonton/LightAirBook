function GetDDesc() {
    var date = new Date();
    var y = date.getFullYear() % 100;
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var str0 = Math.ceil(Math.random() * 899 + 100).toString()
    var str1 = Math.ceil(Math.random() * 899 + 100).toString()
    var str2 = Math.ceil(Math.random() * 899 + 100).toString()
    var stry = str0 + y.toString();
    var strm = str1 + m.toString();
    if (m < 10) {
        strm = str1 + "0" + m.toString();
    }
    var strd = str1 + d.toString();
    if (d < 10) {
        strd = str1 + "0" + d.toString();
    }

    return strd + stry + strm;
}

//前端路由
const model = {
    run: function (method, url, data, cb) {
        //axios.defaults.headers.common["Authorization"] = config.getLocalInfo();
        axios.defaults.headers.common["BrowserTag"] = GetDDesc();
        if (method == "get") {
            axios.get(url, {  //params参数必写 , 如果没有参数传{}也可以
                params: { data: data }
            })
                .then(function (res) {
                    cb(res.data);
                })
                .catch(function (err) {
                    console.log(err);

                })
        } else if (method == "post") {
            axios.post(url, "data=" + JSON.stringify(data)
            )
                .then(function (res) {
                    cb(res.data);
                })
                .catch(function (err) {
                    console.log(err);

                })
        } else if (method == "formdata") {
            axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } }
            )
                .then(function (res) {
                    cb(res.data);
                })
                .catch(function (err) {
                    console.log(err);

                })
        } else if (method == "image") {
            axios.get(url, {  //params参数必写 , 如果没有参数传{}也可以
                responseType: "arraybuffer",
                params: { data: data }
            }).then(function (res) {
                cb("data:image/png;base64," +
                    btoa(
                        new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
                    )
                )
            }).catch(function (err) {
                    console.log(err);
                })
        }
    }
}

//获得菜单
model.menus = (data, cb) => {
    model.run("get", APP_BASE_URL + 'api/get/menu', data, cb);
}
//获得书页
model.getbookpage = (data, cb) => {
    model.run("image", APP_BASE_URL + "api/get/book", data, cb);
}

//获得书的书签
model.getbookmark = (data, cb)=>{
    model.run("get", APP_BASE_URL + 'api/get/bookmark', data, cb);
}
