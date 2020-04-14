document.addEventListener("DOMContentLoaded", init)

function init() {
  console.log("hello")
  Auth.getCurrentUser()
  loadMainContainer()
  attachListeners()
}

function loadMainContainer() {
  const main = document.getElementById("main")
  Navbar.resetNav()
  main.innerHTML = Auth.renderLoginForm
}

function attachListeners() {
  const body = document.getElementById("body")
  body.addEventListener("click", handleBodyClick)
}

function handleBodyClick(event) {
  console.log("hello")
  event.preventDefault()
  switch (event.target.className) {
    case "auth-form":
      handleAuthFormClick(event)
      break
    default:
      console.log("clicked on", event.target)
  }
}

function handleAuthFormClick(event) {
  switch (event.target.id) {
    case "login-form-submit":
      Auth.handleLogin()
      break
    default:
      console.log("clicked on", event.target)
  }
}
