class Navbar {
  static render() {
    return Auth.currentUser.email ? `Welcome ${Auth.currentUser.email}` : "No one logged in."
  }

  static resetNav() {
    const navDiv = document.getElementById("nav")
    navDiv.innerHTML = this.render()
  }
}
