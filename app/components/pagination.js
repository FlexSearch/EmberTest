export default Ember.Component.extend({
    // The list of page controls that will be displayed on the menu
    pages: function(){
        var actPage = parseInt(this.get('activePage')),
            pageCnt = this.get('pageCount'),
            pages = [];

        switch(actPage){
            case(1): pages = [
                { body: '<i class="angle left icon"></i>', idx: actPage },
                { body: actPage, idx: actPage } ,
                { body: '<i class="angle right icon"></i>', idx: actPage + 1} ];
                break;
            case(pageCnt): pages = [
                { body: '<i class="angle left icon"></i>', idx: actPage - 1 },
                { body: actPage, idx: actPage } ,
                { body: '<i class="angle right icon"></i>', idx: actPage} ];
                break;
            default: pages = [
                { body: '<i class="angle left icon"></i>', idx: actPage - 1 },
                { body: actPage, idx: actPage } ,
                { body: '<i class="angle right icon"></i>', idx: actPage + 1} ];
                break;
        }

        return pages;
    }.property('activePage', 'pageCount'),
    pageCount: function(){
        return Math.ceil(this.get('itemsCount') / this.get('pageSize'));
    }.property('itemsCount', 'pageSize'),
    tagName: ''
});
