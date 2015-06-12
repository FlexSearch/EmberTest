export default Ember.Controller.extend({
    bgConf: function(){
        var sessionData = this.get('model').Data;

        return {
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
                    q: "type = 'source' and sessionid = '" + sessionData.Fields.sessionid + "'" + search,
                    skip: (this.currentPage - 1) * this.rowCount,
                    count: this.rowCount
                    //returnFlatResult: true
                };

                return request;
            },
            responseHandler: function(response) {
                var sources = [], docs = response.Data.Documents;
                for (var i = 0; i < docs.length; i++)
                    sources.push(docs[i].Fields);

                var ret = {
                    current: this.currentPage,
                    rowCount: 10,
                    rows: sources,
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
            rowCount: 10,
            selection: true
        }
    }.property('model'),
    sampleSource: {Name: "Vladimir Negacevschi", Status: "Processed"},
    sampleTargets: [
        {Name: "Vladimir", Score: 88, Quality: 3},
        {Name: "Vlad", Score: 65, Quality: 2},
        {Name: "Vladi", Score: 83, Quality: 4} ],
});
