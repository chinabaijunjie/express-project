function Register(container, modelContainer) {
  this.container = container;
  this.modelContainer = modelContainer;
  this.init();
}

Register.BtnTemp = `
  <li>
    <a href='#' data-toggle='modal' data-target='.js-register-modal'>
      注册
    </a>
  </li>`;

Register.ModelTemp = `
  <div class="modal fade js-register-modal" role="dialog" aria-labelledby="RegisterLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="RegisterLabel">注册</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="reg-username">用户名</label>
            <input type="email" class="form-control js-user" id="reg-username" placeholder="请输入用户名">
          </div>
          <div class="form-group">
            <label for="reg-password">密码</label>
            <input type="password" class="form-control js-pass" id="reg-password" placeholder="请输入密码">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary js-submit">提交</button>
        </div>
        <div class="alert alert-success hide js-succ-notice" style="margin: 20px;" role="alert">
          恭喜您，注册成功！
        </div>
        <div class="alert alert-danger hide js-error-notice" style="margin: 20px;" role="alert">
          对不起，您所注册的用户名已存在！
        </div>
      </div>
    </div>
  </div>
`;

$.extend(Register.prototype, {
  init: function () {
    this.createBtn();
    this.createModel();
    this.bindEvents();
  },

  createBtn: function() {
    this.btn = $(Register.BtnTemp);
    this.container.append(this.btn);
  },
  
  createModel: function() {
    this.model = $(Register.ModelTemp);
    this.succNoticeElem = this.model.find(".js-succ-notice");
    this.errNoticeElem = this.model.find(".js-error-notice");
    this.modelContainer.append(this.model)
  },

  bindEvents: function() {
    this.sumitBtn = this.model.find(".js-submit");
    this.sumitBtn.on("click", $.proxy(this.handleSumitBtnClick, this));
  },

  handleSumitBtnClick: function() {
    var username = this.model.find(".js-user").val(),
        password = this.model.find(".js-pass").val();

    $.ajax({
      url: 'api/register',
      type: 'POST',
      data: {
        username,
        password
      },
      success: $.proxy(this.handleRegisterSucc, this),
    })
  },

  handleRegisterSucc: function(res) {
    this.sumitBtn.addClass("hide");
    if ( res.ret && res.data && res.data.register ) {
      this.succNoticeElem.removeClass("hide");
      setTimeout($.proxy(this.handleModelFade, this), 3000);
    } else {
      this.errNoticeElem.removeClass("hide");
      setTimeout($.proxy(this.handleErrorFade, this), 3000);
    }
  },

  handleModelFade: function() {
    this.succNoticeElem.addClass("hide");
    this.model.modal('hide');
    this.sumitBtn.removeClass("hide");
  },

  handleErrorFade: function() {
    this.errNoticeElem.addClass("hide");
    this.sumitBtn.removeClass("hide");
  }
})