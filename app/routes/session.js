export default Ember.Route.extend({
    // Sample dataset
    ds: [
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
    }],

    model: function(params) {
        var pageSize = 12;
        var searchUrl = "http://localhost:9800/indices/duplicates/search";
        var dupData = {
            c: "*",
            q: "type = 'source' and sessionid = '" + params.session_id + "'",
            skip: (parseInt(params.page_index) - 1) * pageSize,
            count: pageSize
        };
        var sesData = {
            c: "*",
            q: "type = 'session' and sessionid = '" + params.session_id + "'"
        }

        var formatDups = function(result) {
            var dups = result.Data.Documents;
            var out = [];

            for (let dup of dups) {
                var item = {
                    Source : {
                        Name: dup.Fields.sourcedisplayname,
                        Status: dup.Fields.sourcestatus,
                        Quality: dup.Fields.totaldupesfound },
                    Targets: [] };
                for (var i = 1; i <= dup.Fields.totaldupesfound; i++)
                    item.Targets.push({
                        Name: "Target " + i,
                        Score: i,
                        trId: "020d2294-c4ee-e011-a3a1-00237dec467a",
                        srId: dup.Fields.sourcerecordid
                    });

                out.push(item);
            }

            return out;
        };

        var ds = this.ds.concat[this.ds,this.ds,this.ds,this.ds,this.ds];

        return Ember.RSVP.hash({
            session: Ember.$.getJSON(searchUrl, sesData)
                    .then(function(s) { return s.Data.Documents[0]; }),
            pageIndex: Ember.RSVP.Promise.resolve(params.page_index),
            duplicates: Ember.$.getJSON(searchUrl, dupData)
                    .then(formatDups), //Ember.RSVP.Promise.resolve(ds),
            pageSize: pageSize
        });
    }
});
