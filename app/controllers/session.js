export default Ember.Controller.extend({
    sessionProperties: function(){
        return JSON.parse(this.get('model').session.Fields.sessionproperties);
    }.property('model'),
    duplicatesCount: function(){
        return this.get('model').duplicates.length;
    }.property('duplicates')
});
