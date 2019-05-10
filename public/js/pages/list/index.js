function Page() {

}

$.extend(Page.prototype, {
  init: function() {
    this.createHeader();
    this.createAddPosition();
    this.createPositionList();
    this.createPagination();
  },
  createHeader: function() {
    var headerContainer = $(".js-header");
    this.header = new Header(headerContainer, 1);
  },
  createAddPosition: function() {
    var positionContainer = $(".js-container");
    this.addPosition = new AddPosition(positionContainer);
    $(this.addPosition).on("addPostionSucc", $.proxy(this.handleaddPostionChange, this))
  },
  createPositionList: function() {
    var positionContainer = $(".js-container");
    this.positionList = new PositionList(positionContainer);
    $(this.positionList).on("getTotal", $.proxy(this.handleListChange, this))
  },
  createPagination: function() {
    var paginationContainer = $(".js-pagination");
    this.pagination = new Pagination(paginationContainer);
    $(this.pagination).on("changePage", $.proxy(this.handlePaginationChange, this))
  },
  handleListChange: function(e) {
    this.pagination.setTotal(e.total, e.pageNumber);
  },
  handlePaginationChange: function(e) {
    this.positionList.changePage(e.page);
  },
  handleaddPostionChange: function() {
    this.positionList.changeList();
  },
})