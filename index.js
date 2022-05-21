//定义响应数据+非响应数据
datas.active = Vue.ref(0)
datas.activeBotTag = Vue.ref(0)
datas.lstAllBooks = []

//定义响应式属性
props.menus = []
props.lstBooks = []

const mounted = () => {
    //1.加载标签
    props.menus.push({ name: "一年级上" })
    props.menus.push({ name: "一年级下" })

    datas.lstAllBooks.push({ id: 0, name: 'book1', cateory:0 })
    datas.lstAllBooks.push({ id: 1, name: 'book2', cateory:0 })
    datas.lstAllBooks.push({ id: 2, name: 'book3', cateory:1 })
    datas.lstAllBooks.push({ id: 3, name: 'book4', cateory:1 })

    //2.根据选择加载图书清单
    props.lstBooks = datas.lstAllBooks.filter((item)=>{
        return item.cateory == datas.active.value;
    })
    
    vant.Toast('加载完成');
}

//当前的方法methods 里面的事件
methods.onChange = (index) => {
    vant.Toast(`标签名 ${props.menus[index].name}`);
    //获得清单
    props.lstBooks = datas.lstAllBooks.filter((item)=>{
        return item.cateory == datas.active.value;
    })
},
methods.onRefresh = () => {
    console.log("下拉刷新");
},
methods.onLoad = (refresh = false) => {
    console.log("上拉加载");
},
methods.onShowBook = (item)=>{
    console.log(item);
    //跳转
    window.location.replace("./views/book.html");
}


