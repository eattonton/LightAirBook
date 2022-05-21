//前端路由
const model = {
    run:function(method,url,data,cb){
        //axios.defaults.headers.common["Authorization"] = config.getLocalInfo();
        if(method == "get"){
            axios.get(url, {  //params参数必写 , 如果没有参数传{}也可以
                params: {data:data}
            })
            .then(function(res){ 
                cb(res.data);
            })
            .catch(function(err){ 
                console.log(err);
                
            })
        }else if(method == "post"){
            axios.post(url, "data="+JSON.stringify(data)
            )
            .then(function(res){ 
                cb(res.data);
            })
            .catch(function(err){ 
                console.log(err);
                
            })
        }else if(method == "formdata"){
            axios.post(url, data, {headers: { 'Content-Type': 'multipart/form-data'}}
            )
            .then(function(res){ 
                cb(res.data);
            })
            .catch(function(err){ 
                console.log(err);
                
            })
        }
    }
}

//获得菜单
model.menus = (data, cb)=>{
    model.run("get",APP_BASE_URL + 'api/get/menu',data,cb);
}
 