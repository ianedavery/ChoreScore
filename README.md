# [ChoreScore](http://www.chorescore.website/)

## API Documentation

### Get Family Members

Returns json data about all user's family members.

  * **URL**
    /family

  * **Method:**
    `GET`

  * **Success Response:**
    * **Code:** 200 OK <br />
      **Content:** `{id: 123, name: 'joe', pointsAccrued: 0}`

  * **Error Response:**
    * **Code:** 500 <br />
      **Content:** `{message: 'Internal Server Error'}`

    OR

    * **Code:** 404 Not Found

    OR

    * **Code:** 401 Unauthorize

  * **Sample Call:**

    ```javascript
      $.ajax({
        url: '/family',
        datatype: 'json',
        type: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function(r) {
          console.log(r);
        }
      });
    ```

###Create new family member

Add a new family member to the user's account.

  * **URL**
    /family

  * **Method:**
    `POST`

  * **Success Response:**
    * **Code:** 201 Created <br />
      **Content:** `{id: 123, name: 'joe', pointsAccrued: 0}`

  * **Error Response:**
    * **Code:** 500 <br />
      **Content:** `{message: 'Internal Server Error'}`

    OR

    * **Code:** 404 Not Found

    OR

    * **Code:** 401 Unauthorize

    OR

    * **Code:** 422 Unprocessable Entity <br />
      **Content:** `{"message":"name is missing from your request."}` <br />
      **Content:** `{"message":"name is not a string."}` <br />
      **Content:** `{"message":"name is not long enough."}`


  * **Sample Call:**

    ```javascript
      $.ajax({
        url: '/family',
        datatype: 'json',
        type: 'POST',
        data: JSON.stringify(
          {
            'name': 'joe'
          }
        ),
        headers: {
          'Authorization': 'Bearer ' + token
        },
        contentType: 'application/json',
        success: function(r) {
          console.log(r);
        }
      });
    ```

### Edit a Family Member

Edits a user's family member.

  * **URL**
    /family/:id

  * **Method:**
    `PUT`

  * **Success Response:**
    * **Code:** 204 No Content

  * **Error Response:**
    * **Code:** 500 <br />
      **Content:** `{error: 'Something went wrong'}`

    OR

    * **Code:** 400 Bad Request <br />
      **Content:** `{error: 'Request path id and request body id values must match'}`

    OR

    * **Code:** 404 Not Found

    OR

    * **Code:** 401 Unauthorized

  * **Sample Call:**

    ```javascript
      $.ajax({
        url: '/family/' + id,
        datatype: 'json',
        type: 'PUT',
        data: JSON.stringify(
          {
            'id': '1234567890',
            'name': 'joe'
          }
        ),
        headers: {
          'Authorization': 'Bearer ' + token
        },
        contentType: 'application/json',
        success: function(r) {
          console.log(r);
        }
      });
    ```


Screenshots:

![Alt text](https://github.com/ianedavery/ChoreScore/blob/master/screenshots/splashpage.png)
![Alt text](https://github.com/ianedavery/ChoreScore/blob/master/screenshots/signup.png)
![Alt text](https://github.com/ianedavery/ChoreScore/blob/master/screenshots/dashboard.png)
![Alt text](https://github.com/ianedavery/ChoreScore/blob/master/screenshots/prizedashboard.png)

## Get your kids excited about doing their chores.

With ChoreScore, you can add chores with associated point values. When a chore is compeleted ChoreScore will assign those points to whoever completed the chore. 

Those points can be redeemed for prizes of your choosing.

## Technical

This app was built with HTML, CSS, JavaScript, MongoDB, and Node.js.