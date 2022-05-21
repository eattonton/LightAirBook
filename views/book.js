datas.activeBotTag = Vue.ref(1)
props.bookimgs = []

//定义加载
const mounted = () => {
    props.bookimgs.push({url:"https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",id:0});
    props.bookimgs.push({url:"https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg",id:1});
}
