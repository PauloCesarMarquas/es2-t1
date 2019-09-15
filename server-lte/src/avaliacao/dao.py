from lib.util import toObjArray

class DAOAvaliacao:

	def add(self, conn, avaliacao):
		nome = avaliacao['nome']
		nota = avaliacao['nota']
		idTurma = avaliacao['idTurma']
		conn.run('INSERT INTO Avaliacao (nome, nota, idTurma)\
			VALUES (%s, %s, %s);', (nome, float(nota), int(idTurma)))
		return conn.id()

	
	def update(self, conn, avaliacao):
		id = avaliacao['id']
		nome = avaliacao['nome']
		idTurma = avaliacao['idTurma']
		query = 'UPDATE Avaliacao\
			SET nome = %s, idTurma = %s\
			WHERE id = %s;'
		conn.run(query, (nome, int(idTurma), int(id)))

	def list(self, conn):
		conn.run('SELECT\
				Avaliacao.id,\
				Avaliacao.nome,\
				Avaliacao.idTurma,\
				Turma.nome AS nomeTurma\
			FROM Avaliacao\
			INNER JOIN Turma ON Turma.id = Avaliacao.idTurma;');
		return toObjArray(conn.res(), ['id', 'nome', 'idTurma', 'nomeTurma'])

	def get(self, conn, id):
		conn.run('SELECT\
				Avaliacao.id,\
				Avaliacao.nome,\
				Avaliacao.idTurma,\
				Turma.nome AS nomeTurma\
			FROM Avaliacao\
			INNER JOIN Turma ON Turma.id = Avaliacao.idTurma\
			WHERE Avaliacao.id = %s;', (int(id),));
		return toObjArray(conn.res(), ['id', 'nome', 'idTurma', 'nomeTurma'])[0]

	def remove(self, conn, id):
		conn.run('DELETE FROM Avaliacao WHERE id = %s;', (int(id),));

	def listByTurma(self, conn, idTurma):
		conn.run('SELECT id, nome FROM Avaliacao WHERE idTurma = %s;', (int(idTurma),))
		return toObjArray(conn.res(), ['id', 'nome'])	
