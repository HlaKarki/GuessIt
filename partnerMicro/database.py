# Microservice that connects to a mongodb database and performs various CRUD operations
import rpyc
import pymongo
from datetime import date, datetime

from pymongo import MongoClient


class dbService(rpyc.Service):

    def on_connect(self, conn):
        # Method when clients connects to the server
        print("Client connected")
        # Connecting to the mongodb
        try:
            global client
            conn_str = "mongodb://kshap:kshapkarki@ac-sdctxg9-shard-00-00.gg1wgme.mongodb.net:27017,ac-sdctxg9-shard-00-01.gg1wgme.mongodb.net:27017,ac-sdctxg9-shard-00-02.gg1wgme.mongodb.net:27017/?ssl=true&replicaSet=atlas-b309it-shard-0&authSource=admin&retryWrites=true&w=majority"
            client = MongoClient(conn_str)
            print("Successfully connected to database.")
        except Exception:
            print("Error:" + Exception)

    def on_disconnect(self, conn):
        # Method when client disconnects
        print("Client disconnected")

    def exposed_addTask(self, nameToAdd, yearToAdd, monthToAdd, dayToAdd, prioToAdd):
        # Method that can be used by the client
        # Adds the given task to the database
        # Connecting to the collection
        myDb = client["taskDb"]
        myCollection = myDb["tasks"]

        # Create a JSON object of task
        newTask = {"name": nameToAdd,
                   "year": yearToAdd,
                   "month": monthToAdd,
                   "day": dayToAdd,
                   "prio": prioToAdd}

        id = myCollection.insert_one(newTask)

        print("Task added.")
        return id

    def exposed_getAllTasks(self):
        # Method that can be used by the client
        # Returns a sorted list of all of the tasks in the database
        # This will call the sortTasks method

        myDb = client["taskDb"]
        myCollection = myDb["tasks"]

        listOfTasks = myCollection.find()

        listOfTasks2 = [
            {"name": "Task 1", "year": 2023, "month": 5, "day": 15, "prio": 1},
            {"name": "Aon", "year": 2022, "month": 4, "day": 5, "prio": 4},
            {"name": "Break", "year": 2022, "month": 4, "day": 1, "prio": 4}
        ]

        sortedList = sorted(listOfTasks, key=lambda x: (x["year"], x["month"], x["day"], x["prio"], x["name"]))
        print("sorted json object:", sortedList)

        return sortedList


if __name__ == "__main__":
    from rpyc.utils.server import ThreadedServer

    server = ThreadedServer(dbService, port=18861)
    server.start()


def sortTasks(self, listToSort):
    sortedList = sorted(listToSort, key=lambda x: (x["year"], x["month"], x["day"], x["prio"], x["name"]))

    return sortedList
