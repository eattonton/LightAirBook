const storeKey = "lightairbook";

const store = {};
store.key = storeKey;
store.state = {};
store.getStore = ()=>{
    var data = localStorage.getItem(storeKey);
    if (data) {
        var dataObj = JSON.parse(data);
        store.state = dataObj.data;
        return dataObj.data;
    } else {
        return null;
    }
}

store.setStore = (val) =>{
    var curTime = new Date().getTime();
    localStorage.setItem(storeKey, JSON.stringify({data: val, time: curTime}));
    return store.getStore();
}

store.removeStore = () =>{
    localStorage.removeItem(storeKey);
}


 

