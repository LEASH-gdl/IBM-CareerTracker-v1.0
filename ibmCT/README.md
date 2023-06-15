# Backend for IBM Career Tracker
The Backend for IBM Career Tracker is a Ruby on Rails application that provides the API for the frontend.

To run the backend, you need to have Ruby 2.6.3 installed. You can install it from [here](https://www.ruby-lang.org/en/downloads/).
And then, you need to install PostgreSQL, which is the database used by the application. You can install it from [here](https://www.postgresql.org/download/).

Then you need to install rails, which is the framework used by the application. You can install it by running:
```
gem install rails
```

Once you have Ruby installed, you need to install the bundler gem, which is used to install the dependencies of the application. You can install it by running:
```
gem install bundler
```

Then, you need to install the dependencies of the application. You can do it by running:
```
bundle install
```

Then, you need to create the database. You can do it by running:
```
rails db:create
```

Then, you need to run the migrations. You can do it by running:
```
rails db:migrate
```

Then, you need to run the seeds. You can do it by running:
```
rails db:seed
```

Then, you need to run the server. You can do it by running:
```
rails s -p 3001
```

The server will be running on port 3001. You can access it by going to http://localhost:3001.

The API documentation can be found [here](https://docs.google.com/document/d/1vq6cKexUM6sywFbUqIJDF5Km-bKb-tjsXc95gbeUj6A/edit?usp=sharing).
