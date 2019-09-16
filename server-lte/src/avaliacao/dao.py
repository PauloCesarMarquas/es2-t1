from lib.util import toObjArray

class DAOAvaliacao:

	def add(self, conn, avaliacao):
		nome = avaliacao['nome']
		nota = avaliacao['nota']
		idTurma = avaliacao['idTurma']
		conn.run('INSERT INTO Avaliacao (nome, nota, idTurma)\
			VALUES (%s, %s, %s);', (nome, float(nota), int(idTurma)))
		return conn.id()

	def list(self, conn):
		conn.run('SELECT id, nome, nota, idTurma\
			FROM Avaliacao;')
		return toObjArray(conn.res(), [
			'id',
			'nome',
			'nota',
			'idTurma'
		])

	def listByTurma(self, conn, idTurma):
		conn.run('SELECT id, nome, nota, idTurma\
			FROM Avaliacao WHERE idTurma = %s;', (int(idTurma),))
		return toObjArray(conn.res(), [
			'id',
			'nome',
			'nota',
			'idTurma'
		])