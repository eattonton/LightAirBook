props.categorys = [];

const mounted = () => {
    props.categorys.push({name:'教辅资料'});
}

methods.updateMenu = (item)=>{
    model.menus({category:item.name, update:1}, (res) => {
        console.log(res);
    })
}