1. REST Introduction
What is REST?
The REST stands for  REpresentational State Transfer.

Let's understand the meaning of each word in the REST acronym.

 State means data
 REpresentational means formats (such as XML, JSON, YAML, HTML, etc)
 Transfer means carrying data between consumer and provider using the HTTP protocol
REpresentational State Transfer
REST was originally coined by Roy Fielding, who was also the inventor of the HTTP protocol.
A REST API is an intermediary Application Programming Interface that enables two applications to communicate with each other over HTTP, much like how servers communicate to browsers.
The REST architectural style has quickly become very popular over the world for designing and architecting applications that can communicate. 
The need for REST APIs increased a lot with the drastic increase of mobile devices. It became logical to build REST APIs and let the web and mobile clients consume the API instead of developing separate applications.
2. REST Architecture
The below diagram shows the typical REST architecture:


Let's understand a few web service term's by looking into the above architecture:
Request and Response: Request is the input to a web service, and the response is the output from a web service.

Message Exchange Format: It is the format of the request and response. There are two popular message exchange formats: XML and JSON.

Service Provider or Server: The service provider is one that hosts the web service.

Service Consumer or Client: A service consumer is one who is using a web service.

It is the responsibility of the consumer means client application to prepare and send HTTP request message

It is the responsibility of the business component (developed by a service provider) to prepare and send the HTTP response message
3. REST Architectural Constraints
An API that has the following constraints is known as RESTful API:

Client-server architecture: The client is the front-end and the server is the back-end of the service. It is important to note that both of these entities are independent of each other.

Stateless: No data should be stored on the server during the processing of the request transfer. The state of the session should be saved at the client’s end.

Cacheable: The client should have the ability to store responses in a cache. This greatly improves the performance of the API.

Uniform Interface: This constraint indicates a generic interface to manage all the interactions between the client and server in a unified way, which simplifies and decouples the architecture. 

Layered System: The server can have multiple layers for implementation. This layered architecture helps to improve scalability by enabling load balancing.

Code on Demand: This constraint is optional. This constraint indicates that the functionality of the client applications can be extended at runtime by allowing a code download from the server and executing the code.

Read more about constraints at https://www.javaguides.net/2018/06/rest-architectural-constraints.html
4. REST Key Concepts
Resource
The fundamental concept of a REST-based system is the resource. A resource is anything you want to expose to the outside world, through your  application.

Example 1: Resources for Employee Management System:

- Employee

- Department

- Projects

- Task

- Address

Example 2: Resources for Student Management System:

- Student

- Teacher

- School

- Class

- Subject