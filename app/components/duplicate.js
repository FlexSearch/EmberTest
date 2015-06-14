export default Ember.Component.extend({
    didInsertElement: function() {
        var component = this;

        $(document).ready(function() {
            // Enable the ratings
            $('.ui.rating').rating({maxRating: 5});

            // Prevent page reload on URL click
            $('.ui.cards a').click(function(e){
                e.preventDefault();
            });

            // Enable the dropdowns and set them to their initial values
            $('.ui.dropdown').each(function (idx, item){
                var $item = $(item);
                var active = $item.attr('initial');
                $item.dropdown('set selected', active);
                $item.dropdown({
                    onChange: function(value, text, $selectedItem){
                        // Update the status of the source record
                        var sourceRecordId = $item.attr('sourceId');
                        // TODO
                        console.log("Updating ", sourceRecordId, ' - ', value);
                    }
                });
            })
        });
    },
    tagName: ''
});
