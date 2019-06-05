// #1
const ApplicationPolicy = require("./application");

module.exports = class TopicPolicy extends ApplicationPolicy {


new() {
  return this._isAdmin();
  }

  create() {
    return this.new();
  }

 // #3
  edit() {
    return this._isAdmin();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}
