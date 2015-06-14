export default Ember.Controller.extend({
    sessionProperties: function(){
        return JSON.parse(this.get('model').session.Data.Fields.sessionproperties);
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
    duplicates: function(){
        var ds = [
        {
            Source: {Name: "Vladimir Negacevschi", Status: "Processed", Quality: 2 },
            Targets: [
                {Name: "Vladimir", Score: 88, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"},
                {Name: "Vlad", Score: 65, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"},
                {Name: "Vladi", Score: 83, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"} ]
        },
        {
            Source: {Name: "Seemant Rajvanshi", Status: "Processed", Quality: 3},
            Targets: [
                {Name: "See", Score: 88, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"},
                {Name: "Raj", Score: 65, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"},
                {Name: "Ant", Score: 83, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"} ]
        },
        {
            Source: {Name: "Scott Hanselman", Status: "Processed", Quality: 4},
            Targets: [
                {Name: "Hansel", Score: 88, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"},
                {Name: "Man", Score: 65, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"},
                {Name: "Scooby", Score: 83, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"} ]
        },
        {
            Source: {Name: "Elliot Fu", Status: "Processed", Quality: 5},
            Targets: [
                {Name: "Fu", Score: 88, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"},
                {Name: "Elliot", Score: 100, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"}]
        },
        {
            Source: {Name: "Helen Troy", Status: "Processed", Quality: 1},
            Targets: [
                {Name: "Helen", Score: 95, trId: "020d2294-c4ee-e011-a3a1-00237dec467a", srId: "47673f68-b677-df11-949d-00237dec9650"}]
        }];

        return ds.concat(ds, ds, ds, ds, ds, ds, ds);
        }.property(),
    duplicatesCount: function(){
        return this.get('duplicates').length;
    }.property('duplicates'),
    actions: {
        getNextDuplicates: function(pageIndex, pageSize){
            // Get the duplicates from FlexSearch
            // TODO: Ajax call...
            // For now use the samples
            var dups = this.get('duplicates').slice(0, pageSize);

            // Set the duplicates that will be displayed on page.
            this.set('duplicates', dups);

            // Set the pager control to the current page


        }
    }
});
