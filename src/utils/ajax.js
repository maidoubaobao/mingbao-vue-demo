function Ajax(){

}

/**
 * 封装post请求
 * @param url
 * @param params
 * @param success
 * @param error
 */
Ajax.prototype.post = function (url, params, success, error){
    $.ajax({
        url:baseUrl + url,
        type:"POST",
        data:params,
        dataType:"json",
        contentType:"application/json",
        success:function (res){
            success(res);
        },
        error:function (error){
            error(error);
        }
    })
}

Ajax.prototype.get = function (url, params, success, error){
    $.ajax({
        url:baseUrl + url,
        type:"GET",
        data:params,
        success:function (res){
            success(res);
        },
        error:function (error){
            error(error);
        }
    })
}
