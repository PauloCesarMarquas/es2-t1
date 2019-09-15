from lib.util import toObjArray

class DAOAvaliacao:

	def add(self, conn, avaliacao):
		nome = avaliacao['nome']
		nota = avaliacao['nota']
		idTurma = avaliacao['idTurma']
		conn.run('INSERT INTO Avaliacao (nome, nota, idTurma)\
			VALUES (%s, %s, %s);', (nome, float(nota), int(idTurma)))
		return conn.id()
