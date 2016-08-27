function sendData(e) {
    var self = this;
    console.log(self.binText);
    this.f_user.set({
        binText: self.binText
    });
}
