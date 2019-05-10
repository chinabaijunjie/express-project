function PositionList (container) {
  this.container = container;
  this.page = 1;
  this.size = 10;
  this.init();
}

PositionList.Temp = `
  <table class="table" style="margin-top: 20px;">
    <thead>
      <tr>
        <th>序号</th>
        <th>公司</th>
        <th>职位</th>
        <th>薪资(K)</th>
        <th>地址</th>
        <th>logo</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody class="js-tbody"><tbody>
  </table>
`

$.extend(PositionList.prototype, {
  init: function() {
    this.createDom();
    this.createUpdatePosition();
    this.bindEvents();
    this.getListInfo();
  },
  createDom: function() {
    this.element = $(PositionList.Temp);
    this.container.append(this.element)
  },
  createUpdatePosition: function() {
    this.updatePosition = new UpdatePosition(this.container);
    $(this.updatePosition).on("updatePostionSucc", $.proxy(this.getListInfo, this))
  },
  bindEvents: function() {
    this.container.on('click', $.proxy(this.handleTableClick, this))
  },
  handleTableClick: function(e) {
    var target = $(e.target),
        isDeleteClick = target.hasClass("js-delete"),
        isUpdateClick = target.hasClass("js-update");
    if ( isDeleteClick ) {
      this.deleteItem(target.attr("data-id"));
    }
    if ( isUpdateClick ) {
      const id = target.attr("data-id");
      this.updatePosition.showItem(id);
    }
  },
  deleteItem: function(id) {
    $.ajax({
      url: "/api/removePosition",
      type: "GET",
      data: {
        id: id,
      },
      success: $.proxy(this.handleItemDeleteSucc, this)
    })
  },
  handleItemDeleteSucc: function(res) {
    if (res && res.ret && res.data && res.data.delete) {
      this.getListInfo();
    }
  },
  getListInfo: function() {
    $.ajax({
      type: "GET",
      url: "/api/getPositionList",
      data: {
        page: this.page,
        size: this.size,
      },
      success: $.proxy(this.handleGetListInfoSucc, this)
    })
  },
  handleGetListInfoSucc: function(res) {
    if (res && res.data && res.data.list) {
      this.createItems(res.data.list);
      if ( this.page > res.data.totalPage ) {
        this.page = res.data.totalPage;
        this.getListInfo();
        return;
      }
      $(this).trigger(new $.Event("getTotal", {
        total: res.data.totalPage,
        pageNumber: this.page,
      }))
    } else {
      alert('数据错误');
    }
  },
  createItems: function(list) {
    var itemContainer = this.element.find('.js-tbody'),
        str = "";
    for (let i = 0; i < list.length; i ++) {
      var item = list[i];
      var filename = item.filename ? item.filename : "1556447883973001.jpg";
      str += `<tr>
        <td>${i + 1}</td>
        <td>${item.company}</td>
        <td>${item.position}</td>
        <td>${item.salary}</td>
        <td>${item.address}</td>
        <td><img style="width: 30px; height: 30px;" src="/uploads/${filename}"></td>
        <td>
          <span class="js-update" data-id=${item._id} style="cursor: pointer;">修改</span>
          <span class="js-delete" data-id=${item._id} style="cursor: pointer;">删除</span>
        </td>
      </tr>`
    }
    itemContainer.html(str)
  },
  changePage: function(page) {
    this.page = page;
    this.getListInfo();
  },
  changeList: function() {
    this.getListInfo();
  }
})