function Pagination(container) {
  this.container = container;
  this.init();
}

$.extend(Pagination.prototype, {
  init: function() {
    this.bindEvents();
  },
  setTotal: function(total, pageNumber) {
    this.createDom(total, pageNumber);
  },
  createDom: function(total, pageNumber) {
    var str = "";
    for (var i = 1; i <= total; i ++ ) {
      str += `<li class=${Number(pageNumber) === i ? "active" : null}><a href="javascript:;">${i}</a></li>`
    }
    this.container.html(str);
  },
  bindEvents: function() {
    this.container.on('click', $.proxy(this.handleClick, this));
  },
  handleClick: function(e) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    var target = e.target,
        page = parseInt(target.text, 10);
    $(this).trigger(new $.Event("changePage", {
      page: page,
    }))
  },
})

