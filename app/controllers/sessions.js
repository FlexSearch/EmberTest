export default Ember.Controller.extend({
    bgConf: {
        ajaxSettings: {
            method: "GET",
            cache: false
        },
        currentPage: 1,
        requestHandler: function(request) {

            this.currentPage = request.current;

            var search = request.searchPhrase == ""
                ? ""
                : " and sessionproperties like '" + request.searchPhrase + "*'";

            request = {
                c: '*',
                q: "type = 'session'" + search,
                skip: (this.currentPage - 1) * this.rowCount,
                count: this.rowCount
                //returnFlatResult: true
            };

            return request;
        },
        responseHandler: function(response) {
            var sessions = [], docs = response.Data.Documents;
            for (var i = 0; i < docs.length; i++)
                sessions.push(JSON.parse(docs[i].Fields.sessionproperties));

            var ret = {
                current: this.currentPage,
                rowCount: 5,
                rows: sessions,
                total: response.Data.TotalAvailable
            }

            return ret;
        },
        converters: {
            datetime: {
                from: function (value) {return moment(value);},
                to: function(value){ return moment(value).format('MMMM Do YYYY, h:mm:ss a');}
            }
        },
        rowCount: 5,
        selection: true
    }
});
