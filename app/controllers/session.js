export default Ember.Controller.extend({
    sessionProperties: function(){
        return JSON.parse(this.get('model').Data.Fields.sessionproperties);
    }.property('model'),
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
    sampleDuplicates: [
        {
            Source: {Name: "Vladimir Negacevschi", Status: "Processed", Quality: 2},
            Targets: [
                {Name: "Vladimir", Score: 88},
                {Name: "Vlad", Score: 65},
                {Name: "Vladi", Score: 83} ]
        },
        {
            Source: {Name: "Seemant Rajvanshi", Status: "Processed", Quality: 3},
            Targets: [
                {Name: "See", Score: 88},
                {Name: "Raj", Score: 65},
                {Name: "Ant", Score: 83} ]
        },
        {
            Source: {Name: "Scott Hanselman", Status: "Processed", Quality: 4},
            Targets: [
                {Name: "Hansel", Score: 88},
                {Name: "Man", Score: 65},
                {Name: "Scooby", Score: 83} ]
        },
        {
            Source: {Name: "Elliot Fu", Status: "Processed", Quality: 5},
            Targets: [
                {Name: "Fu", Score: 88},
                {Name: "Elliot", Score: 100}]
        },
        {
            Source: {Name: "Helen Troy", Status: "Processed", Quality: 1},
            Targets: [
                {Name: "Helen", Score: 95}]
        }
    ]
});
