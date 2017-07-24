# README

A social connections single page app with rails APIs

## Pre-requisites
- Ensure postgres sql is installed locally
- Ensure ruby is installed

## Installation

```bash

  gem install bundle
  bundle install
  export RAILS_ENV=developoment
  rails db:create
  rails db:migrate
  rails db:seed
  rails s

```

Once installation is done, visit http://localhost:3000/

## Testing

```bash

  export RAILS_ENV=test
  rails db:create
  rails db:migrate
  rails db:seed
  rails test

```


## Key files

[javascript](https://github.com/dharinim/social-connections/blob/master/app/assets/javascripts/userdetails.js)
[Controller](https://github.com/dharinim/social-connections/blob/master/app/controllers/users_controller.rb)
[Helper](https://github.com/dharinim/social-connections/blob/master/app/helpers/users_helper.rb)
[Test](https://github.com/dharinim/social-connections/blob/master/test/controllers/users_controller_test.rb)
[Layouts](https://github.com/dharinim/social-connections/tree/master/app/views/users)

## Key Features Implemented
  - Shows list of all users in the database with social connection scores
  - Ability to sort results based on the the following criteria
      - Linked in connections
      - facebook connections
      - twitter followers
      - social connection index score
      - name of the user
      - id of the user
  - Ability to search by name (and preserve sorting and filtering).
  - Addition of a new user.
  - Data validation both in backend and frontend.

## The following are the screenshots of the application

### Workflow 

![Main Page](show.gif)

### Lists all users

![Main Page](main-page.png)

### Paginate

![Main Page](paginate.png)

### Search

![Main Page](search.png)

### Sort

![Main Page](sort.png)

### Add

![Main Page](add.png)

### Edit

![Main Page](edit.png)