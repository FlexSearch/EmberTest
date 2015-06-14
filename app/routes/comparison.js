export default Ember.Route.extend({
    model: function(params) {
        var session = JSON.parse(this.modelFor('session').session.Fields.sessionproperties);
        var flexSearchUrl = "http://localhost:9800";

        var getRecordById = function (indexName, id) {
            var url = flexSearchUrl + "/indices/" + indexName + "/documents/" + id + "?c=*";
            return Ember.$.getJSON(url);
        };

        // First get the source record
        return getRecordById(session.IndexName, params.source_id)
            .then(function (sData) {
                var source = sData.Data.Fields;

                // Then get the target record
                return getRecordById(session.IndexName, params.target_id)
                    .then(function(tData){
                        // In the end return both the retrieved source and target
                        // formatted ready to be rendered
                        var items = [], target = tData.Data.Fields;
                        var fields = Object.keys(source);
                        for(let i of fields)
                            items.push({
                                fieldName: i,
                                sourceValue: source[i],
                                targetValue: target[i],
                                areEqual: source[i] === target[i]})
                        return {
                            srId: params.source_id,
                            trId: params.target_id,
                            fields: items };
                    });
            });
    }
});
