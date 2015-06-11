export default Ember.Route.extend({
    model: function(params) {
        return Ember.$.getJSON(
            "http://localhost:9800/indices/duplicates/documents/" + params.session_id);
    }
});
