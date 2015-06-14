export default Ember.Route.extend({
    model: function () { return []; },
    actions: {
        goToSession: function(sessionInfo){
            var sessionId = sessionInfo.SessionId;

            this.transitionTo('session', sessionId, 1);
        }
    }
});
