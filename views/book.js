//定义数据
datas.activeBotTag = Vue.ref(1)
datas.listImage = Vue.ref(null)
//记录当前页
datas.pageNumber = Vue.ref(0)
datas.pageTotal = 1
datas.bookInfo = store.getStore();
//定义响应式数据
props.bookimgs = []

datas.screenRange = { minx: 0, miny: 0, maxx: 0, maxy: 0 }
//定义加载
const mounted = () => {
    //props.bookimgs.push({url:"https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",id:0});
    //props.bookimgs.push({url:"https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg",id:1});

    const urlBook = APP_BASE_URL + "api/get/book";

    //添加滚动事件
    //window.addEventListener('scroll',  windowScrollListener);
    //添加鼠标弹起 或者 触摸弹起
    //window.addEventListener('click', windowScrollListener);
    window.addEventListener('touchend', windowScrollListener);
    //获得传入的参数
    datas.pageTotal = datas.bookInfo.total;
    for (let i = 0; i < datas.pageTotal; i++) {
        props.bookimgs.push({ url: '../res/nopage.png', url2: urlBook + "?book=" +encodeURIComponent(datas.bookInfo.book) + "&page=" + i, page: i });
    }

    //判断可显示的图片
    setTimeout(()=>{
       setScrollByIndex(datas.bookInfo.pageno);
    }, 200);

}

//根据序号显示图片
methods.showImage = (index) => {
    if (typeof (index) == "string") {
        index = parseInt(index);
    }

    if (typeof(index) === 'number' && props.bookimgs[index]["url2"]) {
        props.bookimgs[index].url = props.bookimgs[index].url2;
        delete props.bookimgs[index].url2;

        return true;
    }

    return false;

}

methods.topmost = () => {
    setScrollByIndex(0);
}

//跳转到上一页
methods.previous = () => {
    setScrollByIndex(datas.pageNumber.value-1);
}

//跳转到下一页
methods.next = () => {
    setScrollByIndex(datas.pageNumber.value+1);
}

methods.bottom = () => {
    setScrollByIndex(datas.pageTotal - 1);
}

//监听窗口滚动
function windowScrollListener() {
    //获取操作元素最顶端到页面顶端的垂直距离
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //console.log(scrollTop)
    let bfindPage = false;
    //可见屏幕的范围
    for (let i = 0, len = datas.listImage.value.children.length; i < len; i++) {
        let eleSpan = datas.listImage.value.children[i];
        let eleVanImage = eleSpan.children[0];

        let offsetTop = eleVanImage.offsetTop;
        if (offsetTop >= scrollTop && offsetTop <= (scrollTop + cHeight)) {
            //console.log(offsetTop,scrollTop,scrollTop + cHeight);
            //在可见范围内
            let bshowimg = methods.showImage(eleVanImage.attributes["id"].value);

            if (bshowimg && !bfindPage) {
                updatePageNumber(i);
                bfindPage = true;
                break;
            }
        }

    }
}

//设置窗口滚动到指定位置
function setScrollByIndex(index) {
    //更新页码
    index = updatePageNumber(index);
    let eleSpan = datas.listImage.value.children[index];
    let eleVanImage = eleSpan.children[0];
 
    //windowScrollListener();
    let ipage = parseInt(eleVanImage.attributes["id"].value);
    methods.showImage(ipage);

    setTimeout(() => {
        let offsetTop = eleVanImage.offsetTop;
        //跳转页面
        if (document.body && document.body.scrollTop) {
            document.body.scrollTop = offsetTop;
        } else {
            document.documentElement.scrollTop = offsetTop;
        }
    },100);
    //datas.pageNumber.value = ipage;
}

function updatePageNumber(index){
    if (index < 0) {
        index = 0;
    }
    if (index >= datas.pageTotal) {
        index = datas.pageTotal - 1;
    }
    datas.pageNumber.value = index;
    datas.bookInfo.pageno = index;
    store.setStore(datas.bookInfo);
    return index;
}