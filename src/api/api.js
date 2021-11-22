import * as axios from "axios";
debugger;
export const TokenConfig = {
    Token(tokenStr) {
        //console.log('Token')
        if(tokenStr){
            // axios.defaults.headers = {'Authorization': `Bearer ${tokenStr}`}
            config.accessTocken = tokenStr
            config.headers = {'Authorization': `Bearer ${tokenStr}`}
            instance = axios.create(config);
        }

        //console.log(typeof(tokenStr));
        //if(tokenStr === null){
            console.log(tokenStr);
            // axios.defaults.headers = {'Authorization': `Bearer ${tokenStr}`}
           // config.accessTocken = ""
           // config.headers = {'Authorization': `Bearer ${""}`}
        //}

        //return tokenStr;
    }
}



const config = {
    // baseURL: 'http://109.73.14.239/',
    baseURL: 'https://qs.marinsgroup.ru/',
    //timeout: 5000,

    /*data: {
        token: ''
    }*/
    /*headers: {
        'Authorization': 'Bearer ' + TokenConfig.Token
    }*/
    /*headers: {
        "Content-Type": "application/json",
    },*/
};


debugger;

let instance = axios.create(config);


debugger;
export const categoriesAPI = {
    getCategories() {
        debugger;
        // let instance2 = axios.create(config);
        return instance.get(`api/categories`);
    }
}
debugger;

export const subCategoriesAPI = {
    getSubCategories(subCatId) {
        debugger;
        return instance.get(`api/categories?parent_id=${subCatId}`);
    }
}

export const ThirdCategoriesAPI = {
    getThirdCategories(subCatId) {
        debugger;
        return instance.get(`api/categories?parent_id=${subCatId}`);
    }
}
debugger;
export const loadScreenAuthAPI = {
    login(grant_type = "password" ,username, password, client_id = "testclient", client_secret = "testpass") {
        debugger;
        return instance.post(`oauth2/token`, { grant_type, username, password, client_id, client_secret } );
    }
}

debugger;
export const logoutScreenAuthAPI = {
    logout() {
        debugger;
        return instance.post(`api/user/logout`);
    }
}

debugger;
export const CreateCheckAPI = {
    CreateCheck(parentIdCheck) {
        debugger;
         return instance.get(`api/check/create?parent_id=${parentIdCheck}`);
    },
    ViewCheck(parentIdCheck, checkIdCheck) {
        debugger;
        return instance.get(`api/check/view?parent_id=${parentIdCheck}&check_id=${checkIdCheck}`);
    },
    AddText (value, itemId, checkId){
        return instance.post("api/results/add-text?access-token="+ config.accessTocken, { value: value, itemId: itemId, checkId: checkId }); /* checkId - номер проверки */
    },
    ShowResults (parentId, checkId){
        return instance.get(`api/check/view?parent_id=${parentId}&check_id=${checkId}`);
    }
}

export const EndCheckAPI = {
    EndCheckAPI(EndParentId, EndCheckId) {
        debugger;
        return instance.get(`api/check/finish?parent_id=${EndParentId}&check_id=${EndCheckId}`);
    }
}

export const DelPictureApi = {
    async DelPicture(itemId, checkId, resultId) {
        console.log(`${itemId} ${checkId} ${resultId}`);
        debugger;
        return await instance.post(`api/results/delete-photo?access-token=`+ config.accessTocken, { itemId: itemId, checkId: checkId, resultId: resultId })
    }
}

debugger;
export const ViewCheckHistoryAPI = {
    ViewCheckHistory(parentIdView) {
        debugger;
        return instance.get(`api/check/index?parent_id=${parentIdView}`);
    },
    DeleteViewCheckHistory(checkIdView) {
        debugger;
        return instance.post(`api/check/delete?check_id=${checkIdView}`);
    },
}

export const DataEditingAPI = {
    AddFile(formData, itemId, checkId){
        debugger;
        return instance.post(`api/results/add-file-new`, formData, {
            'Content-Type': 'multipart/form-data'
        }
        )
    },
    AddText (valueText, itemId, checkId){
        return instance.post("api/results/add-text", { value: valueText, itemId: itemId, checkId: checkId }); /* checkId - номер проверки */
    },
    async ChangeCoefficient (selectedValue, itemId, checkId) {
        return await instance.post("api/results/add-coefficient", { value: selectedValue, itemId: itemId, checkId: checkId });
    },
    GetCoefficients (checkId){
        return instance.get(`api/check/get-coefficients?check_id=${checkId}`);
    }
}