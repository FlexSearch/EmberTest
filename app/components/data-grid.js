export default Ember.Component.extend({
    htmlElementId: 'grid',
    bootgridConf: {},
    didInsertElement: function() {
        var component = this;

        $(document).ready(function() {
            $("#" + component.get('htmlElementId'))
                .bootgrid(component.get('bootgridConf'))
                .on("click.rs.jquery.bootgrid", function(e,c,row){
                    component.sendAction('action', row);
                })
                .on("loaded.rs.jquery.bootgrid", function(e){
                    // Prevent <a> tags in the grid from redirecting the page
                    $("#" + component.get('htmlElementId') + "-footer")
                        .find('a').click(function(e){
                            e.preventDefault();
                        });
                });
        });
    }
});
