(function() {

    function Request() {
    }

    var _request = function(param) {
        return new Promise(function(resolve, reject) {
            if(param.method === 'post' && !_.isEmpty(param.data)) {
              reject("defined method post require data");
            }

            var success = function(data) {
              resolve(data);
            };

            var error = function(error) {
              reject(error);
            };

            var params = _.extend({
              dataType: "json",
              cache: false
            }, param);

            $.ajax(params).success(success).error(error);
        });
    };

    var _doGet = function(url, data) {
        var param = {
            data: data,
            url: url,
            method: "GET"
        };
        return _request.call(this, param);
    };

    var _doPost = function(url, data, encodeType) {
        var param = {
            data: data,
            url: url,
            method: "POST",
            headers: {'Content-Type': encodeType || 'application/x-www-form-urlencoded'}
        };
        return _request.call(this, param);
    };

    var _doPut = function(url, data, encodeType) {
        var param = {
            data: data,
            url: url,
            method: "PUT",
            headers: {'Content-Type': encodeType || 'application/x-www-form-urlencoded'}
        };
        return _request.call(this, param);
    };

    var _doDelete = function(url, data, encodeType) {
        var param = {
            data: data,
            url: url,
            method: "DELETE",
            headers: {'Content-Type': encodeType || 'application/x-www-form-urlencoded'}
        };
        return _request.call(this, param);
    };

    var _doUpload = function(url, data) {
        var param = {
            data: data,
            url: url,
            method: "POST",
            headers: {'Content-Type': undefined}
        };
        return _request.call(this, param);
    };


    /*
    * Need to specify encode type if other than application/x-www-form-urlencoded
    */
    Request.prototype.save = function(url, data, encodeType) {
        return _doPost(url, data, encodeType);
    };

    Request.prototype.fetch = function(url, data) {
        return _doGet(url, data);
    };

    Request.prototype.upload = function(url, data) {
        return _doUpload(url, data);
    };

    Request.prototype.update = function(url, data, encodeType) {
        return _doPut(url, data, encodeType);
    };

    Request.prototype.delete = function(url, data, encodeType) {
        return _doDelete(url, data, encodeType);
    };

    this.request = this.request || new Request();

}).call(this);

