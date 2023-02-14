import rpyc

from Task import *

from datetime import date, datetime

conn = rpyc.connect("localhost", 18861)
service = conn.root

year = 2023
month = 2
day = 6

newDate = date(year, month, day)

newTask = Task("Clean", newDate, 3)
id = service.addTask(newTask.returnName(), newTask.returnDate().year, newTask.returnDate().month, newTask.returnDate().day, newTask.returnPrio())

newDate2 = date(2023, 2, 25)
newTask2 = Task("HW", newDate2, 2)
id2 = service.addTask(newTask2.returnName(), newTask2.returnDate().year, newTask2.returnDate().month, newTask2.returnDate().day, newTask2.returnPrio())

newDate3 = date(2023, 3, 17)
newTask3 = Task("Final", newDate3, 5)
id3 = service.addTask(newTask3.returnName(), newTask3.returnDate().year, newTask3.returnDate().month, newTask3.returnDate().day, newTask3.returnPrio())

print(service.getAllTasks())

conn.close()
