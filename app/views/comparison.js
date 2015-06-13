export default Ember.View.extend({
    templateName: "comparison",
    afterRenderEvent: function() {
        $('.column.comparison img').hide();
    }
});
