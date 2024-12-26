import ko from "knockout";
function UserViewModel() {
  this.firstName = ko.observable("John");
  this.lastName = ko.observable("Doe");
  this.fullName = ko.computed(() => {
    return this.firstName() + " " + this.lastName();
  }, this);
}

ko.applyBindings(new UserViewModel());
