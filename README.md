
# Routes:

## Endpoints

### 2. **Create User**

- **Endpoint**: `/api/create_user`
- **Method**: `POST`
- **Description**: Creates a new user with the specified username, full name, and interest. The user's location is initialized with latitude and longitude set to `0`, and `ttl` set to `0`.
- **Request Body**:
  - `username` (string): The username of the new user.
  - `fullname` (string): The full name of the new user.
  - `interest` (string): The interest of the new user.
- **Responses**:
  - `201 Created`: Returns a success message if the user is successfully created.
  - `400 Bad Request`: Returns an error message if any required field is missing or if the user already exists.

### 3. **Update User Location**

- **Endpoint**: `/api/update_location`
- **Method**: `POST`
- **Description**: Updates the location (latitude, longitude) of the specified user and sets the `ttl` (Time-To-Live) value. The TTL value is converted into an `end_time` stored in the user's data.
- **Request Body**:
  - `username` (string): The username of the user whose location is being updated.
  - `latitude` (float): The new latitude value.
  - `longitude` (float): The new longitude value.
  - `ttl` (integer, optional): The Time-To-Live value in minutes (default is 60).
- **Responses**:
  - `200 OK`: Returns a success message if the location is successfully updated.
  - `400 Bad Request`: Returns an error message if any required field is missing or if the user does not exist.

### 4. **Get Nearby Users**

- **Endpoint**: `/api/getnearby`
- **Method**: `GET`
- **Description**: Retrieves a list of users who are within a specified distance (in kilometers) from the requesting user.
- **Query Parameters**:
  - `username` (string): The username of the user requesting nearby users.
  - `distance_km` (float, optional): The distance in kilometers to search for nearby users (default is 1.0 km).
- **Responses**:
  - `200 OK`: Returns a list of nearby users and a success message.
  - `400 Bad Request`: Returns an error message if the required `username` parameter is missing.

### 5. **Get All Users**

- **Endpoint**: `/api/get_all_users`
- **Method**: `GET`
- **Description**: Retrieves the data of all users stored in the system.
- **Response**:
  - `200 OK`: Returns a JSON array of all users' data.


# Installing
 - run `python3 -m venv venv`
 - run `source venv/bin/activate`
 - run `pip install -r requirements`
 - run `python3 -m spacy download en_core_web_md` 