export default Ember.Controller.extend({
    didInsertElement: function() {
        var component = this;

        $(document).ready(function() {
            // Enable the ratings
            $('.ui.rating').rating({maxRating: 5});

            // Prevent page reload on URL click
            $('.ui.cards a').click(function(e){
                e.preventDefault();
            });
        });
    },
});
