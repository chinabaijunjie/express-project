function UpdatePosition(container) {
  this.container = container;
  this.id = '';
  this.init();
}

UpdatePosition.ModelTemp = `
  <div class="modal fade js-updatepos-modal" role="dialog" aria-labelledby="UpdatePositionLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="UpdatePositionLabel">修改职位</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="updatepos-company">公司名称</label>
            <input type="email" class="form-control js-company" id="updatepos-company" placeholder="请输入公司名称">
          </div>
          <div class="form-group">
            <label for="updatepos-position">职位名称</label>
            <input type="email" class="form-control js-position" id="updatepos-position" placeholder="请输入职位">
          </div>
          <div class="form-group">
            <label for="updatepos-salary">薪资范围(K)</label>
            <select class="form-control js-salary" id="addpos-salary">
              <option>5-10</option>
              <option>10-15</option>
              <option>15-20</option>
              <option>20-25</option>
              <option>25-30</option>
              <option>30+</option>
            </select>
          </div>
          <div class="form-group">
            <label for="updatepos-address">办公地点</label>
            <input type="email" class="form-control js-address" id="updatepos-address" placeholder="请输入办公地点">
          </div>
          <div class="form-group">
            <label for="updatepos-logo">公司logo</label>
            <input type="file" class="form-control js-logo" id="updatepos-logo" placeholder="选择公司logo">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary js-submit">提交</button>
        </div>
        <div class="alert alert-success hide js-succ-notice" style="margin: 20px;" role="alert">
          恭喜您，修改成功！
        </div>
        <div class="alert alert-danger hide js-error-notice" style="margin: 20px;" role="alert">
          对不起，修改失败！
        </div>
      </div>
    </div>
  </div>
`;

$.extend(UpdatePosition.prototype, {
  init: function() {
    this.createDom();
    this.bindEvents();
  },
  createDom: function() {
    this.element = $(UpdatePosition.ModelTemp);
    this.companyElem = this.element.find(".js-company");
    this.positionElem = this.element.find(".js-position");
    this.salaryElem = this.element.find(".js-salary");
    this.addressElem = this.element.find(".js-address");
    this.logoElem = this.element.find(".js-logo");
    this.succNoticeElem = this.element.find('.js-succ-notice');
    this.errorNoticeElem = this.element.find('.js-error-notice');
    this.container.append(this.element);
  },
  bindEvents: function() {
    var submitBtn = this.element.find('.js-submit');
    submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this))
  },
  showItem: function(id) {
    this.getPositionInfo(id);
  },
  getPositionInfo: function(id) {
    $.ajax({
      url: "/api/getPosition",
      data: {
        id: id,
      },
      success: $.proxy(this.handleGetPositionInfoSucc, this)
    })
  },
  handleGetPositionInfoSucc: function(res) {
    if (res && res.data && res.data.info) {
      var info = res.data.info;
      this.companyElem.val(info.company);
      this.positionElem.val(info.position);
      this.salaryElem.val(info.salary);
      this.addressElem.val(info.address);
      this.id = info._id;
      this.element.modal("show");
    }
  },
  handleSubmitBtnClick: function() {
    var company = this.companyElem.val(),
        position = this.positionElem.val(),
        salary = this.salaryElem.val(),
        address = this.addressElem.val(),
        logo = this.logoElem[0].files[0];

    var formData = new FormData();
    formData.append("company", company);
    formData.append("position", position);
    formData.append("salary", salary);
    formData.append("address", address);
    formData.append("id", this.id);
    formData.append("logo", logo);

    $.ajax({
      cache: false, // ajax是否有缓存
      type: 'POST',
      url: '/api/updatePosition',
      processData: false,
      contentType: false,
      data: formData,
      success: $.proxy(this.handleUpdatePositionSucc, this)
    })
  },
  handleUpdatePositionSucc: function(res) {
    if (res && res.data && res.data.update ) {
      this.succNoticeElem.removeClass("hide");
      setTimeout($.proxy(this.handleDelay, this), 2000);
    } else {
      this.errorNoticeElem.removeClass("hide");
    }
  },
  handleDelay: function() {
    this.succNoticeElem.addClass("hide");
    this.element.modal("hide")
    $(this).trigger(new $.Event("updatePostionSucc"))
  }
})