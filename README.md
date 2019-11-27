### Name: 
briefPal Client

### App url: 
https://briefpal-client.now.sh/userpage

### github repo: 
https://github.com/rbannal86/briefpal

### server github repo: 
https://github.com/rbannal86/briefpal-api

### API documentation:
  ### Endpoints:


    /api/auth:
      /login: { user_name, password } POST
        returns { user_id: id }

    /api/letters:
      /newletter: { user_id, content } POST
        returns { recipent: id }
      /getletters/:letter_id: {} GET
        returns { id: id, content: "content", sender: id, recipient: id}

    /api/register:
      /: { user_name, password } POST
        returns JWT

    /api/conversations:
      /:conversation_id {} GET
        returns { id: id, user_one: id, user_two: id, letter_one: id, letter_two: id, letter_three: id, letter_count: num }
      /:conversation_id/reply { user_id, content } POST
        returns { id: id, user_one: id, user_two: id, letter_one: id, letter_two: id, letter_three: id, letter_count: num }
      /:conversation_id/:letter_id {} GET
        returns { id: id, content: "content", sender: id, recipient: id }

    /api/users:
      /:user_name {} GET
        returns { id: id }
      /:user_name/conversations {} GET
        returns { conversations: [id...] }

### screenshots: 

### Main page before login or register
![bp1](public\img\bp1.png)

### About page with link to register
![bp2](public\img\bp2.png)

### Register Page
![bp3](public\img\bp3.png)

### Main page after first time registering with button to write first letter
![bp4](public\img\bp4.png)

### First letter page
![bp5](public\img\bp5.png)

### First letter sent page with a link to user page
![bp6](public\img\bp6.png)

### User page with a list of conversations
![bp7](public\img\bp7.png)

### Conversation details page with a list of letters
![bp8](public\img\bp8.png)

### Conversation details page with a letter open
![bp9](public\img\bp9.png)

### Details page on a letter sent by the user
![bp10](public\img\bp10.png)

### Details page on a letter sent to the user
![bp11](public\img\bp11.png)

### Reply screen with the previous letter and a form to write a new letter
![bp12](public\img\bp12.png)


### Summary
The briefPal app is an anonymous pen pal app that limits the number of letters in one conversation to three. A user may initiate a conversation with a random user by writing a letter. That letter may be responded to by the selected random user, after which the original sender may respond to it one more time. A collection of the conversations that a user has had comprises their user page. A user may have as many conversations as desired.

### Tech Stack
#### backend: JS, PostgreSQL, Express, Knex
#### frontend: JS, React, CSS, HTML