export default Ember.Component.extend({
    source: {Name: "name", Status: "Processed"},
    targets: [
        {Name: "name1", Score: 88, Quality: 3},
        {Name: "name2", Score: 65, Quality: 2},
        {Name: "name3", Score: 83, Quality: 4} ],
    didInsertElement: function() {
        var component = this;

        $(document).ready(function() {
            // Enable the ratings
            $('.ui.rating').rating({maxRating: 5});
        });
    },
    tagName: ''
});
