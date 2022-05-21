datas.activeBotTag = Vue.ref(1)
props.bookimgs = []

datas.screenRange = {minx:0,miny:0,maxx:0,maxy:0}
//定义加载
const mounted = () => {
    //props.bookimgs.push({url:"https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",id:0});
    //props.bookimgs.push({url:"https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg",id:1});

    const urlBook = APP_BASE_URL+"api/get/book";

    window.addEventListener('scroll',  windowScrollListener);
    //获得传入的参数
    const bookPath = query("book");
    const total = parseInt(query("total")) 
    for(let i=0; i<total; i++){
        if(i <= 3){
            props.bookimgs.push({url:urlBook+"?book="+bookPath + "&page="+i});
        }else{
            props.bookimgs.push({url:'../res/nopage.png'});
        }
        
    }

    
     
}

//监听窗口滚动
function windowScrollListener() {
    //获取操作元素最顶端到页面顶端的垂直距离
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var cHeight= window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
    //console.log(scrollTop)
    //可见屏幕的范围

  }