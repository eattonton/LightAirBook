//定义响应数据+非响应数据
datas.active = Vue.ref(0)
datas.activeBotTag = Vue.ref(0)
datas.lstAllBooks = []
datas.activeCategory = "教辅资料"
datas.bookCategorys = [
    { thumb: "./res/cover1.png", name: '教辅资料' },
    { thumb: "./res/cover2.png", name: '编程书籍' },
    { thumb: "./res/cover3.png", name: '2022书单' },
]
//定义响应式属性
props.menus = []
props.lstBooks = []

const mounted = () => {
    //加载目录
    LoadMenus(datas.activeCategory);

}

function LoadMenus(strCategory){
    //清空
    datas.lstAllBooks.length = 0;
    props.menus.length = 0;
    model.menus({ category: strCategory }, (res) => {
        if (res && res["items"]) {
            res["items"].forEach((item, index) => {
                //1.加载标签
                props.menus.push({ label: item.name.substring(item.name.indexOf('#') + 1), name: item.name })
                //2.加载书
                addBook(index, item["children"]);
            });

            //2.根据选择加载图书清单
            props.lstBooks = datas.lstAllBooks.filter((item) => {
                return item.cateory == datas.active.value;
            })

            vant.Toast('加载完成');
        }
    })
}

function addBook(typeid, items) {
    items.forEach((item, index) => {
        datas.lstAllBooks.push({ name: item.name, cateory: typeid, path: item.filepath, total: item.total })
    })

}

//当前的方法methods 里面的事件
methods.onChange = (index) => {
    //ant.Toast(`标签名 ${props.menus[index].name}`);
    //获得清单
    props.lstBooks = datas.lstAllBooks.filter((item) => {
        return item.cateory == datas.active.value;
    })
}
methods.onRefresh = () => {
    console.log("下拉刷新");
}
methods.onLoad = (refresh = false) => {
    console.log("上拉加载");
}
methods.onShowBook = (item) => {
    //console.log(item);
    //记录选择的项
    store.setStore({ book: item.path, total: item.total, pageno: 0, title:item.name });
    //跳转
    window.location.replace("./views/book.html");

}

methods.switchCategory = (name)=>{
    if(name != datas.activeCategory){
        datas.activeCategory = name;
        LoadMenus(datas.activeCategory);
    }
    
     
}


