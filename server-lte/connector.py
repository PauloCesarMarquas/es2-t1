import mysql.connector

class Connector:
	def __init__(self):
		db = mysql.connector.connect(
			host = "localhost",
			user = "root",
			password = "admin123",
			db = "mydb"
		)
		self.db = db
		self.cursor = db.cursor()
		self.open = True

	def run(self, query, data=tuple()):
		self.cursor.execute(query, data)
		return self

	def runMany(self, query, array=[]):
		self.cursor.executemany(query, array)
		return self

	def res(self):
		return self.cursor.fetchall()

	def id(self):
		return self.cursor.lastrowid

	def flush(self):
		self.db.commit()

	def close(self):
		if (self.open == True):
			self.flush()
			self.db.close()
			self.open = False
		return self

	def __del__(self):
		self.close()