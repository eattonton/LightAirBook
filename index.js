//定义响应数据+非响应数据
datas.active = Vue.ref(0)
datas.activeBotTag = Vue.ref(0)
datas.lstAllBooks = []
datas.bookCategorys = [
        {thumb:"https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg"},
        {thumb:"https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg"}]
//定义响应式属性
props.menus = []
props.lstBooks = []

const mounted = () => {

    model.menus({category:'教辅资料'}, (res) => {
        if (res && res["items"]) {
            res["items"].forEach((item, index) => {
                //1.加载标签
                props.menus.push({label:item.name.substring(item.name.indexOf('#')+1), name: item.name })
                //2.加载书
                addBook(index,item["children"]);
            });

            //2.根据选择加载图书清单
            props.lstBooks = datas.lstAllBooks.filter((item) => {
                return item.cateory == datas.active.value;
            })

            vant.Toast('加载完成');
        }
    })
 
    function addBook(typeid, items) {
        items.forEach((item, index) => {
            datas.lstAllBooks.push({  name: item.name, cateory: typeid, path:item.filepath,total:item.total })
        })

    }


}

//当前的方法methods 里面的事件
methods.onChange = (index) => {
    vant.Toast(`标签名 ${props.menus[index].name}`);
    //获得清单
    props.lstBooks = datas.lstAllBooks.filter((item) => {
        return item.cateory == datas.active.value;
    })
},
    methods.onRefresh = () => {
        console.log("下拉刷新");
    },
    methods.onLoad = (refresh = false) => {
        console.log("上拉加载");
    },
    methods.onShowBook = (item) => {
        //console.log(item);
        //记录选择的项
        store.setStore({book:item.path, total:item.total, pageno:0});
        //跳转
        window.location.replace("./views/book.html");

    }


