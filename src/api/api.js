import * as axios from "axios";
debugger;
export const TokenConfig = {
    Token(tokenStr) {
        console.log('Token')
        if(tokenStr){
            // axios.defaults.headers = {'Authorization': `Bearer ${tokenStr}`}
            config.accessTocken = tokenStr
            config.headers = {'Authorization': `Bearer ${tokenStr}`}
        }
        //return tokenStr;
    }
}

const config = {
    baseURL: 'http://109.73.14.239/',
    //timeout: 5000,

    /*data: {
        token: ''
    }*/
    /*'headers': {
        'Authorization': 'Bearer ' + TokenConfig.Token
    }*/
};


debugger;
// console.log(config);

const instance = axios.create(config);


debugger;
export const categoriesAPI = {
    getCategories() {
        debugger;
        return instance.get(`api/categories?access-token=`+  config.accessTocken);
    }
}
debugger;

export const subCategoriesAPI = {
    getSubCategories(subCatId) {
        debugger;
        return instance.get(`api/categories?parent_id=${subCatId}&access-token=`+  config.accessTocken);
    }
}

export const ThirdCategoriesAPI = {
    getThirdCategories(subCatId) {
        debugger;
        return instance.get(`api/categories?parent_id=${subCatId}&access-token=`+  config.accessTocken);
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
export const CreateCheckAPI = {
    CreateCheck(parentIdCheck) {
         return instance.get(`api/check/create?parent_id=${parentIdCheck}&access-token=`+ config.accessTocken)
    },
    ViewCheck(parentIdCheck, checkIdCheck) {
        return instance.get(`api/check/view?parent_id=${parentIdCheck}&check_id=${checkIdCheck}&access-token=`+ config.accessTocken);
    },
    AddText (value, itemId, checkId){
        return instance.post("api/results/add-text?access-token="+ config.accessTocken, { value: value, itemId: itemId, checkId: checkId }); /* checkId - номер проверки */
    },
    ShowResults (parentId, checkId){
        return instance.get(`api/check/view?parent_id=${parentId}&check_id=${checkId}&access-token=`+ config.accessTocken);
    }
}

debugger;
export const ViewCheckHistoryAPI = {
    ViewCheckHistory(parentIdView) {
        debugger;
        return instance.get(`api/check/index?parent_id=${parentIdView}&access-token=`+ config.accessTocken);
    },
    DeleteViewCheckHistory(checkIdView) {
        debugger;
        return instance.delete(`api/check/delete?check_id=${checkIdView}&access-token=`+ config.accessTocken);
    }
}

debugger;
export const  DataEditingAPI = {
    AddFile(formDataImg, itemId, checkId){


        console.log({formDataImg, itemId, checkId});
        debugger;
        const formData = new FormData();
        console.log({formDataImg});
        formData.append('file', formDataImg);
        formData.append('itemId', itemId);
        formData.append('checkId', checkId);

        // axios({
        //     url: 'http://localhost:5000/api/hello',
        //     method: 'POST',
        //     data: formData,
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'multipart/form-data',
        //     },
        // });

        return instance.post(`api/results/add-file?access-token=`+ config.accessTocken,  formData, {
            'Content-Type': 'multipart/form-data'
        }
        )/*.then(function () {
            debugger;
            console.log('SUCCESS!!');
        })
            .catch(function () {
                console.log('FAILURE!!');
            });*/
    }
}