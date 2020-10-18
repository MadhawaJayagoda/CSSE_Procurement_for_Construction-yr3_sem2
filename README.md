# CSSE : Procurement for Construction - Year 3 Semester 2
This is my individual part of the Case Study implementation of 3rd Year 2nd Semester - Case Studies in Software Engineering(CSSE) module.
Here  we try to solve the difficulties faced in the procurement procedures in the construction industry.  As a solution we have created a Web application and a mobile application, whereas this is a part of the Web application, implemented with ReactJS, NodeJS, Express and MongoDB. 
* procurement_frontend : Developed with ReactJS
* procurement_backend : Developed with NodeJS and Express with the connection to MongoDB local database.

Here I have implemented the part: Once a site manager add a purchase order above Rs. 100,000.00, the order should be sent for **approval from the Project Managing Director staff** for approval. There, Project Managing Director **can see all the purchase requisition orders**, and **add a status such as Approved, Diclined and Hold (pending)**. Only if the purchase order is approved, it is sent for the third party Procurement department for the assignmnet of Suppliers with pre-agreed negotiated prices for each item. And also, I have created **a unique order referencial Id for all the Approved order requisitions** and also **a Priority level** for each order requisition to **distinguish High priority once** from others, because failure to receive materials can be costly since labor is underutilized and progress impeded.

## Technology
- NodeJS
- Express
- ReactJS
- MongoDB

## Unit testing React components &nbsp; :warning: 
Main components of the ReactJS have been tested with Jest test runnner and Enzyme testing utility;

<img src="screenshots/unit testing with jest and enzyme.PNG" width=500>

## Screenshots of the Working Application
<img src="screenshots/Order details display.PNG" width=400> &nbsp;&nbsp;&nbsp; <img src="screenshots/request permission orders.PNG" width=400> &nbsp;&nbsp;&nbsp; <img src="screenshots/update order details.PNG" width=400> &nbsp;&nbsp;&nbsp; <img src="screenshots/table structure 2.PNG" width=400>

## MongoDB Database Collections and Documents
<img src="screenshots/mongoDB databse orders.PNG" width=400> &nbsp;&nbsp;&nbsp; <img src="screenshots/mongoDB databse request permission orders.PNG" width=400>
