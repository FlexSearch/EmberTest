export default Ember.Route.extend({
    model: function(params) {
        console.log("Comparison params: ", params);
        return params;
    },
    serialize: function(model){
        return {source_id:model.srId, target_id:model.trId};
    }
});
