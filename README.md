# CS361Project


• Communication contract

  • How to request data
    - First, set up an rpyc connection using the 'localhost' and the server's port number which in this case is 18861.
    - Then make connection with root.
    - Create an instance of Task's class and initiate it with a task. The parameters should have name, year, month, day, and priority.
    - To test all the functionality of the mongodb server code, create multiple tasks (since we will later ask the server to sort these tasks in order)
    - Lastly, call the addTask() and on the connection made with root and add each of the task created before.
    - To print out all the tasks the server has received, we make .getAllTasks() call on the connection.
    - To sort the tasks in order of date created, priority and name, we make .sortTasks() call on the connection.
    - Close the connection at the end
  
  • How to receive data
    - Each function from server side has a json object as its return.
    - So, to receive, for example, the sorted tasks, we make sure to assign a variable to the .sortTasks() that we make.
    - After this, we can simply print out the tasks from client side to see it evidently that we have received the sorted tasks.
   
  • UML Sequence Diagram
    ![image](https://user-images.githubusercontent.com/72935373/218612871-01194bec-3d1c-49aa-818d-e79a30267233.png)

    
