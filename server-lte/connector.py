import mysql.connector

class Connector:
	def __init__(self):
		db = mysql.connector.connect(
			host = "localhost",
			user = "root",
			password = "admin123",
			db = "mydb"
		)
		cursor = db.cursor()
		self.db = db
		self.cursor = cursor

	def run(self, query, data=tuple()):
		self.cursor.execute(query, data)

	def res(self):
		return self.cursor.fetchall()

	def id(self):
		return self.cursor.lastrowid
	
	def done(self):
		self.db.commit()
		self.db.close()
		return self

	def __del__(self):
		self.done()