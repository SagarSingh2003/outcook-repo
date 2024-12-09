# OutCook

OutCook is a real-time messaging application that allows users to send, receive, and manage messages with file attachments, email-like features, and dynamic filtering. The app is built using a modern tech stack and offers a highly interactive and responsive experience.

# Frontend :

### / endpoint : 

![image](https://github.com/user-attachments/assets/af35ccd8-175b-41f0-9794-18c22fefc085)

### /messages endpoint for rendering the mock email api

![image](https://github.com/user-attachments/assets/bb11b6c8-9033-48c5-a08a-c9b59a9e2451)

### auth endpoints (/signin /signup , required only for sending messages , without auth you can still visit the /messages endpoint):

![image](https://github.com/user-attachments/assets/728a1374-d1ce-436b-87b8-5780c0c287ef)



## System Design : 

![image](https://github.com/user-attachments/assets/abcfa657-f889-4205-b049-8c5f2df9ee66)


## Tech Stack

- **Backend**: Node.js
- **Database**: MongoDB
- **Message Broker**: Self-hosted Kafka
- **Real-Time Communication**: WebSockets
- **Cache**: Self-hosted Redis (Publisher-Subscriber Model)
- **Object Storage**: AWS S3 (with presigned URLs for file uploads)
- **Deployment**: AWS EC2 instance
- **Reverse Proxy**: NGINX
- **SSL**: Certbot (HTTPS connection)
- **Frontend**: React.js

## Features

- Send and receive messages with attachments (images, videos, and other files).
- Cookie-based authentication (written from scratch).
- Real-time notifications using WebSockets, Redis, Kafka, and AWS.
- Message filtering: Filter messages by "read", "unread", and "favorites".
- Persistent filtering state via browser storage (localStorage).
- Mark messages as "favorite".
- Pagination for messages.
- Responsive design for various screen sizes.
- Render attachments (images, videos) directly in message body.
- Differentiates between "read" and "unread" messages.

## Backend Routes

- **POST** `/signup`: Register a new user (authController.signUp).
- **POST** `/signin`: Sign in an existing user (authController.signIn).
- **POST** `/signout`: Sign out the current user (authController.signOut).
- **GET** `/get_presigned_url/:key`: Get a presigned URL for file uploads (awsController.getPreSignedUrl).
- **POST** `/send_message`: Send a message (userController.sendMessage).
- **GET** `/get_all_sent_messages`: Get all sent messages (userController.getSentMessages).
- **GET** `/get_all_recieved_messages`: Get all received messages (userController.getRecievedMessages).
- **PUT** `/mark_as_done/:id`: Mark a message as done (userController.markAsDone).

## Database Models

### Cookie Data Schema

```js
import mongoose from "mongoose";

const cookieDataSchema = new mongoose.Schema({
  email: { type: String, required: true },
  access_token: { type: String, required: true },
});

const CookieData = mongoose.model("CookieData", cookieDataSchema);
export default CookieData;
```

### Message Schema

```js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  from: {
    email: { type: String, required: true },
    name: { type: String, required: true },
  },
  to: { email: { type: String, required: true } },
  subject: { type: String, required: true },
  short_description: { type: String, required: true },
  date: { type: Date, required: true },
  body: { type: String, required: true },
  attachments: [{ type: [String] }],
  isFavorite: { type: Boolean, default: false },
  isRead: { type: Boolean, default: false },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
```

### User Data Schema
```js
import mongoose from "mongoose";
import Message from "./MessageSchema.js";

const userDataSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  sentMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message", required: false, default: [] }],
  recievedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message", required: false, default: [] }],
});

const UserData = mongoose.model("UserData", userDataSchema);
export default UserData;
```

###
