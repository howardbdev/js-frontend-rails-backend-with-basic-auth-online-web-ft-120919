# JS Frontend/Rails API backend with Basic Auth

This is a repo showing a *very* basic auth setup, but it should look familiar.  We're using bcrypt and Rails's session to make it happen.  The problem is Rails in API mode omits middleware that controls sessions and cookies.  So we have to add that back in.  The next problem is we need to tell both Rails and JS to include those cookies with every request.  Here's the gist:

1.  Run `rails new our-app --api`
2.  In the `Gemfile`, comment in `rack-cors` and `bcrypt` and `bundle install`
3.  Scaffold out our user model and make sure you include a `password_digest` column and a unique login attribute like username or email
4.  If you use a scaffold generator, make sure to change `password_digest` to `password` in  `UsersController`'s strong params method
5.  Add `has_secure_password` and any attribute validations in our `User` class
6.  Head to `our-app/config/application.rb`.  We need to turn on the middleware that allows Rails's session to work:
```ruby
config.middleware.use ActionDispatch::Cookies
config.middleware.use ActionDispatch::Session::CookieStore, key: '_cookie_name', expire_after: 14.days, httponly: true
```
7.  Let our `ApplicationController` [in on the action]:
```ruby
class ApplicationController < ActionController::API
  include ActionController::Cookies
  # ...
```
8.  Rails requires us to explicitly define our origins if we're going to use session cookies.  Head to `/our-app/config/initializers/cors.rb` and add our frontend origin (our frontend will now need to be hosted, such as `localhost:8000`) and add `credentials: true` to the `resource` call:
```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:8000'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
```
9.  Add controller actions and routes (maybe a `SessionsController`?), as well as any helper methods you want to use (`current_user`, `logged_in?`, etc.) -- these will work the way they have before, except they will always end with a `render json: something_or_another`
10.  We will also want to add a route that simply checks if a user is logged in, and if so, returns whatever info the front end needs for a logged in user.  If not, the response should indicate no one is logged in.  
11.  On the JS side, this is the 'biggie':  with every AJAX call, we add `credentials: "include"`.  For example:
```javascript
fetch('http://localhost:3000/api/v1/login', {
  credential: "include",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(body)
})
  .then(response => response.json())
  .then(processLoginResponse)
```
12.  Our front end should hit the "get current user" route when the app loads, and again with any reload, login, signup, or logout action.  The DOM should update appropriately in each scenario.

Beyond that, we need to make sure to build our login and signup forms with appropriate inputs and more importantly, build our `fetch` requests with the correctly structured body so that that `params` match what we're expecting in our Rails controller.

[API mode]: https://guides.rubyonrails.org/api_app.html
[in on the action]: https://api.rubyonrails.org/v2.3.8/classes/ActionController/Cookies.html  
