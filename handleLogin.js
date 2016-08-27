function login(e) {

    var self = this;
    var username = this.form.username;
    var password = this.form.password;

    if(!username || !password) {
        self.loaded = true;
        return Promise.reject('No Login information');
    }

    return firebase.auth().signInWithEmailAndPassword(username, password)
    .then(function(resp) {
        self.firebase_user = resp;
        self.isLoggedIn = true;
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        self.f_user = firebase.database().ref('/users/' + resp.uid);
        self.f_user.on('value', function(snapshot) {
            self.binText = snapshot.val().binText;
        });

        self.loaded = true;
    })
    .catch(function(error) {
        self.form.error = error;

        if(error.code === 'auth/user-not-found') {
            return firebase.auth().createUserWithEmailAndPassword(username, password)
            .then(function() {
                self.isLoggedIn = true;
                self.loaded = true;
            })
            .catch(function(error) {
                self.form.error = error;
                self.loaded = true;
            });
        } else {
            return Promise.reject('User Not found');
        }

    });
}

function logout() {
    var self = this;
    firebase.auth().signOut().then(function() {
        self.isLoggedIn = false;
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }, function(error) {
    });
}
