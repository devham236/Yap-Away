# Chat Away

Welcome to Chat Away! A real-time messaging application using the popular MERN tech stack.



## Features
* **Real-time Messaging:** Enjoy instant and seamless messaging with your contacts.
* **User Authentication:** Securely log in and authenticate users.
* **User Profiles:** Customize your profile with a profile picture and status.
* **Message History:** Access your chat history for easy reference.
* **Responsive Design:** Use the application on various devices - desktop, tablet, or mobile.



## Technologies Used
* **React JS:** A JavaScript library for building user interfaces.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Framer Motion:** A animation library for React for smooth and beautiful animations.
* **Node.js:** A JavaScript runtime enviroment for building server-side applications.
* **Express.js:** A web application framework for Node.js.
* **MongoDB:** A NoSQL database for storing user data and preferences.
* **JSON Web Tokens(JWT):** Used for secure user authentication and authorization.
* **Socket.IO:** Enables real-time, bidirectional communication between web clients and servers over a single WebSocket connection.



## What I Learned
In the process of building this chat application, I gained valuable experience in several areas:
* **WebSocket Implementation:** I learned how to implement WebSocket connections for the first time, enabling real-time, bidirectional communication between clients and the server. This allowed users to exchange messages instantly, enriching the user experience.
* **Database Management:** I honed my skills in handling multiple collections in a NoSQL database (MongoDB). Managing user profiles, message history, and other data became more efficient and organized, contributing to the application's reliability and scalability.



 ## Getting Started
 Before you begin, ensure you have met follwoing requirements:
 * **Node.js** is installed on your local machine.
 * **Mongo DB** database is set up. There are multiple services for implementing MongoDB into your project, I used the "Atlas" service for this application (you can use a local or cloud-based instance)

### Installation
1. **Clone the repository:**
```bash
git clone https://github.com/devham236/chat-app.git
```

2. **Install the server dependencies:**
```bash
cd ./server
npm install
```

3. **Set up environment variables:**
Create a **.env** file in the **server** directory and add following variables:
```makefile
MONGO_URL=<Your mongodb connection sring/uri>
PORT=<Port Number>
JWT_KEY=<Your secret key for JWT>
```

4. **Start the server:**
```bash
npm start
```

5. **In a seperate Terminal, navigate to the client directory:**
```bash
cd ./client
```

6. **Install the frontend dependencies**
```bash
npm install
```

7. **Start the application:**
```bash
npm run dev
```



## Demo/Preview

https://github.com/devham236/chat-app/assets/90037750/608d7d62-aa95-4cba-9029-d94e85405cc1



## Improvement/Feedback

The application is not completely finished, there are still some features and bug fixes to add.
Your feedback and suggestions to improve this Netflix Clone project is more than welcome. Here are some ways you can contribute:

* **Enhance UI/UX:** Provide feeback on the user interfaces and suggest improvements for a better user experience.
* **Bug Reports:** If you encounter any issues or bugs, please report them in the Github issues section.
* **Feature Requests:** Share your ideas for new features or enhancements.
* **Security:** Report security vulnerabilities or concerns.

Feel free to open Github issues or reach out with your feedback and contributions. I appreciate your support in making this project even better.

Happy Coding!



## License
This project is licensed under the MIT License - see https://www.mit.edu/~amini/LICENSE.md for details.


