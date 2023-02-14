# Task class file
from datetime import date, datetime

class Task:
    name = ""
    dateTask = date(1, 1, 1)
    prio = 0
    def __init__(self, name, dateTask, prio):
        self.name = name
        self.dateTask = dateTask
        self.prio = prio

    def printTaskInfo(self):
        print("Your task is:", self.name)
        print("It must be completed by:", self.dateTask)
        print("It has a priority level of:", self.prio)

    def updateName(self, newName):
        self.name = newName

    def updateDate(self, newDate):
        self.dateTask = newDate

    def updatePrio(self, newPrio):
        self.prio = newPrio

    def returnName(self):
        return self.name

    def returnDate(self):
        return self.dateTask

    def returnPrio(self):
        return self.prio