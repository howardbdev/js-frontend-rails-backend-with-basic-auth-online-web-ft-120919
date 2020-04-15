class DOM {
  static resetNav() {
    const navDiv = document.getElementById("nav")
    navDiv.innerHTML = Navbar.render()
  }
}
