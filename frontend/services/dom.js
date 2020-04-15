class DOM {
  static resetNav() {
    const navDiv = document.getElementById("nav")
    navDiv.innerHTML = Navbar.render()
  }

  static loadLoginForm() {
    const main = document.getElementById("main")
    main.innerHTML = Auth.renderLoginForm
  }

  static loadMainContainer() {
    this.resetNav()
    if (Auth.isSignedIn) {
      this.loadUserDashboard()
    } else {
      this.loadLoginForm()
    }
  }

  static loadUserDashboard() {
    
  }
}
