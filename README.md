# Abacus Parts Server

## Live Server : [https://mwss-server.herokuapp.com/](https://mwss-server.herokuapp.com/)

- This project has 5 Controllers. Each Controllers fetch data from Different Collection of the Database.

  - PartsController
  - UsersController
  - OrderController
  - PaymentController
  - ReviewController

- It also has 2 Middleware's Function

  - VerifyJWT : for Verifying JWT token.
  - VerifyAdmin : for verifying if user is an admin or not.

- This Project has 22 Routes.
  - 6 are user and admin route
  - 5 are Part related route
  - 7 are Order Related route
  - 3 are Review related route
  - 1 is Payment intent route
