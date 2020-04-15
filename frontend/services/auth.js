// the Auth class should know about keeping track of the current user
// it will also know how to create dom elements associated with logging in and out
class Auth {
  static currentUser = {}

  static setCurrentUser(user) {
    this.currentUser = user
    console.log("current user is ", user)
  }

  static getCurrentUser() {
    API.get("/get_current_user")
      .then(response => {
        if (response.logged_in) {
          this.setCurrentUser(response.current_user)
          Navbar.resetNav()
        } else {
          alert(response.message)
        }
      })
  }

  static get isSignedIn() {
    return !!this.currentUser.email
  }

  static get renderLoginForm() {
    return `
      <form class="auth-form" id="login-form" action="#" method="post">
        <input id="login-form-email-input" type="text" name="email" value="" placeholder="email">
        <input id="login-form-password-input" type="password" name="password" value="" placeholder="password">
        <input class="auth-form" id="login-form-submit" type="submit" value="Log In">
      </form>
    `
  }

  static handleLogin() {
    const email = document.getElementById("login-form-email-input").value
    const password = document.getElementById("login-form-password-input").value

    const userInfo = {
      user: {
        email,
        password,
      }
    }
    if (email && password) {
      API.post("/login", userInfo)
      .then(response => {
        if (response.error) {
          alert(response.error)
        } else {
          this.setCurrentUser(response.current_user)
          Navbar.resetNav()
        }
      })
    } else {
      alert("You must provide both email and password")
    }
  }
}
