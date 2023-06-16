# Backend for IBM Career Tracker
The Backend for IBM Career Tracker is a Ruby on Rails application that provides the API for the frontend.

To run the backend, you need to have Ruby 3.2.1 installed. You can install it from [here](https://www.ruby-lang.org/en/downloads/).
And then, you need to install PostgreSQL, which is the database used by the application. You can install it from [here](https://www.postgresql.org/download/). When installing the database, let the host be “localhost”, the port “5432”, and the username “postgres”. 

Then you need, in the root directory of the Backend “IBM-CareerTracker/ibmCT”, to create an “.env” file in which needs to include the following information (edit the info between < >):
```
JWT_KEY = <created with the command "openssl rand -base64 32", to download OpenSSL use https://www.openssl.org/source/> 
IBMCT_DATABASE_PASSWORD = <your PostgreSQL password>
RAILS_MAX_THREADS = 5
IBMCT_DATABASE_NAME = <your production database name>
IBMCT_DATABASE_HOST = <your production database host>
IBMCT_DATABASE_USERNAME_PRODUCTION = <your production database username>
IBMCT_DATABASE_PASSWORD_PRODUCTION = <your production database password> 
IBMCT_DATABASE_PORT = <your production database port>
DEFAULT_PASSWORD = "$2a$10$CwTycUXWue0Thq9StjUM0uQSulp4g5wBG3pzQhMM6ewBIwRishH/i"
```

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
