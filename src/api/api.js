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
    async CreateCheck(parentIdCheck) {
        debugger;
        try {
            return await instance.get(`api/check/create?parent_id=${parentIdCheck}`);
        } catch (error) {
            throw new Error('Can\'t create check');
        }

    },
    async ViewCheck(parentIdCheck, checkIdCheck) {
        debugger;
        try {
            return instance.get(`api/check/view?parent_id=${parentIdCheck}&check_id=${checkIdCheck}`);
        } catch (error) {
            throw new Error('Can\'t view check');
        }

    },
    async AddText(value, itemId, checkId) {
        try {
            return instance.post("api/results/add-text?access-token=" + config.accessTocken, {
                value: value,
                itemId: itemId,
                checkId: checkId
            }); /* checkId - номер проверки */
        } catch (error) {
            throw new Error('Can\'t add text');
        }

    },
    async ShowResults(parentId, checkId) {
        try {
            return instance.get(`api/check/view?parent_id=${parentId}&check_id=${checkId}`);
        } catch (error) {
            throw new Error('Can\'t show results');
        }
    }
}

export const EndCheckAPI = {

    async EndCheckAPI(EndParentId, EndCheckId) {
        debugger;
        try {
            return await instance.get(`api2/check/finish?parent_id=${EndParentId}&check_id=${EndCheckId}`);
        } catch (error) {
            throw new Error('Can\'t loading check');
        }
    }
}

export const DelPictureApi = {
    async DelPicture(itemId, checkId, resultId) {
        try {
            return await instance.post(`api/results/delete-photo?access-token=` + config.accessTocken, {
                itemId: itemId,
                checkId: checkId,
                resultId: resultId
            })
        } catch (error) {
            throw new Error('Can\'t delete photo');
        }
    }
}

debugger;
export const ViewCheckHistoryAPI = {
    async ViewCheckHistory(parentIdView, Page = 2, pageSize = 15) {
        debugger;
        try {
            //return instance.get(`api/check/index?parent_id=${parentIdView}`);
            return await instance.get(`api/check/index?parent_id=${parentIdView}&page=${Page}&page-size=${pageSize}`);
        } catch (error) {
            throw new Error('Can\'t loading list check');
        }
    },
    async DeleteViewCheckHistory(checkIdView) {
        debugger;
        try {
            return await instance.post(`api/check/delete?check_id=${checkIdView}`);
        } catch (error) {
            throw new Error('Can\'t delete check');
        }
    },
}

export const DataEditingAPI = {
    async AddFile(formData, itemId, checkId) {
        debugger;
        try {
            return await instance.post(`api/results/add-file-new`, formData, {
                    'Content-Type': 'multipart/form-data'
                }
            )
        } catch (error) {
            throw new Error('Can\'t add file');
        }
    },
    async AddText(valueText, itemId, checkId) {
        try {
            return instance.post("api/results/add-text", {value: valueText, itemId: itemId, checkId: checkId}); /* checkId - номер проверки */
        } catch (error) {
            throw new Error('Can\'t add text');
        }

    },
    async ChangeCoefficient(selectedValue, itemId, checkId) {
        try {
            return await instance.post("api/results/add-coefficient", {
                value: selectedValue,
                itemId: itemId,
                checkId: checkId
            });
        } catch (error) {
            throw new Error('Can\'t add coefficient');
        }

    },
    async GetCoefficients(checkId) {
        try {
            return instance.get(`api/check/get-coefficients?check_id=${checkId}`);
        } catch (error) {
            throw new Error('Can\'t add get coefficients');
        }

    }
}