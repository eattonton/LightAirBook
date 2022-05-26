props.categorys = [];

const mounted = () => {
    props.categorys.push({name:'教辅资料'});
    props.categorys.push({name:'编程书籍'});
    props.categorys.push({name:'2022书单'});
}

methods.updateMenu = (item)=>{
    model.menus({category:item.name, update:1}, (res) => {
        console.log(res);
    })
}