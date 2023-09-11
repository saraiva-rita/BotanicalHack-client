# BotanicalHack
3rd Project

<br>


## Description

A Plant web application, where the user can create, update and delete plants, add favorites and reviews and access information about them.


<br>

## User Stories

**Errors**
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn't exist so that I know it was my fault
- **500** - As a user I want to see an error message when the user is not found, the password is incorrect and the password does not match the requirements. 

**User Authentication**

- **sign up** - As a user I want to sign up on the web page so that I can create, update and delete my own list of plants.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account

**Web Page Structure**
- **homepage** - As a user I want to be able to access the homepage and access the list of plants and log in and sign up, see the highlights and newly added. 
- **category listing** - As a user I want to see the list of plants categories
- **plants listing** - As a user I want to see the list of all plants within the category I selected, select one plant and see the details of that plant.
- **profile** - As a user I can visit my profile page so that I can access the list of favorite plants and reviews.

<br>


## Server Routes (Back-end):


| **Method** | **Route**                          | **Description**                                              | Request  - Body                                                       |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                                       |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                                       |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                                   |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                                       |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  username, email, password  }                                                 |
| `POST`     | `/logout`                          | Sends Logout form data to the server.                        |                                                                       |
| `GET`      | `/api/categories`                       | Route to display all the categories in the database           |                                                                       |
| `GET`      | `/api/plants`                          | Route to display all the plants in the database              |                                                                       |
| `GET`      | `/api/plants/create`          | Route to display a form where the user fills in information about plants that are going to be created |                    |
| `POST`     | `/api/plants`          | Route to submit info about plants created          | { name, image, description, care, tips, {favorites}, {reviews }                                |
| `PUT`     | `/api/plants/:plantId` | Route to submit the updates of a specific plant    | { name, description, care, tips }                                |
| `DELETE`     | `/api/plants/:plantId`| Route to delete a specific plant                  | { name, image, description, care, tips, {favorites}, {reviews } }                                |


<br>

# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/about`              | AboutPage          | public `<Route>` | About page.      |
| `/contacts`              | ContactsPage          | public `<Route>` | Contact page.    |  
| `/categories`               | CategoriesListPage   | user only `<PrivateRoute>` | Plants Categories list.   
| `/plants/add`           | CreatePlantPage | user only `<PrivateRoute>` | Create new Plant form.                               |
| `/plants`               | PlantListPage   | user only `<PrivateRoute>` | Plants list.                                         |
| `/plants/:plantId` | PlantDetailPage | user only `<PrivateRoute>` | Plant details. Shows plants list and other details. |
| `/callForHelpPage`               | CallForHelpPage   | user only `<PrivateRoute>` | List of plants that need Help.    



## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- AboutPage

- ContactsPage

- CategoriesListPage

- AddPlantsPage

- EditPlantsPage

- PlantsListPage

- PlantsDetailsPage

- CallForHelpPage



Components:

- Navbar
- Search Bar
- Auth



## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Category Service**

  - `categoryService` :   
    - `.getCategories()`

- **Plants Service**

  - `plantService` :
    - `.createPlant(id)`
    - `.getPlantDetails(id)`
    - `.deletePlant(id)`

  

## Models

User model

```javascript
{
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
      },
    ],
    
  }

```


Category model

```javascript
{
    name: String,
    image: {
      type: String,
      default: '',
    },
    plants: {
      type: Schema.Types.ObjectId,
      ref: 'Plant'
    },
  }

```

Plant Model

```javascript

{
  name: String,
  image: {
      type: String,
      default: '',
    },
  description: String,
  care: {
  	light: String,
  	watering: String,
 	temperature: String,
	soil: String,
	seasonal care: String,
	fertilizing: String
  }
  tips: String,
  reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ]
}

```

Review Model

```javascript

{
  Author: String
  Content: String,
  User: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
}

```



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link]()

### Contributors
Filipa Flora - [`filipaflora`](https://github.com/filipaflora) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/ana-filipa-flora-ribeiro)

Rita Saraiva



