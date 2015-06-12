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

            // $("#" + component.get('htmlElementId'))
            //     .bootgrid(component.get('bootgridConf'))
            //     .on("click.rs.jquery.bootgrid", function(e,c,row){
            //         component.sendAction('action', row);
            //     })
            //     .on("loaded.rs.jquery.bootgrid", function(e){
            //         // Prevent <a> tags in the grid from redirecting the page
            //         $("#" + component.get('htmlElementId') + "-footer")
            //             .find('a').click(function(e){
            //                 e.preventDefault();
            //             });
            //     });
        });
    }
});
