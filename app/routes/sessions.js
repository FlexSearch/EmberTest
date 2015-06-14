export default Ember.Route.extend({
    model: function () { return []; },
    actions: {
        goToSession: function(sessionInfo){
            var sessionId = sessionInfo.Id;

            this.transitionTo('session', sessionId, 1);
        }
    }
});
