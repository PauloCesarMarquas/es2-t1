from lib.util import toObjArray

class DAOFrequencia():

	def add(self, conn, nota):
		idAluno = nota['idAluno']
		idTurma = nota['idTurma']
		presenca = nota['nota']
		query = 'INSERT INTO Frequencia ( presenca, idAluno, idTurma )'
		query += '  VALUES (%s, %s, %s);'
		conn.run(query ,(float(presenca), int(idAluno), int(idTurma)))
		return True

	def list(self, conn):
		conn.run('SELECT\
			Frequencia.id,\
			Frequencia.presente AS presencaAluno,\
			Aluno.nome AS nomeAluno,\
			Turma.nome AS nomeTurma,\
		FROM Frequencia\
		INNER JOIN Aluno ON Aluno.id = Frequencia.idAluno\
		INNER JOIN Turma ON Turma.id = Frequencia.idTurma')
		return toObjArray(conn.res(), [
			'id',\
			'presencaAluno',
			'nomeAluno',
			'nomeTurma'
		])

	def listByTurma(self, conn, idTurma):		
		conn.run('SELECT\
			Frequencia.id,\
			Frequencia.presenca AS presenca,\
			Aluno.nome AS nomeAluno,\
			Turma.nome AS nomeTurma,\
		FROM Frequencia\
		INNER JOIN Aluno ON Aluno.id = Frequencia.idAluno\
		INNER JOIN Turma ON Turma.id = Frequencia.idTurma\
		WHERE Turma.id = %s;', int(idTurma))

		return toObjArray(conn.res(), [
			'id',
			'nomeAluno',
			'nomeTurma',
			'presenca'			
		])

	def listByAluno(self, conn, idAluno):		
		conn.run('SELECT\
			Frequencia.id,\
			Frequencia.presenca AS presenca,\
			Aluno.nome AS nomeAluno,\
			Turma.nome AS nomeTurma,\
		FROM Frequencia\
		INNER JOIN Aluno ON Aluno.id = Frequencia.idAluno\
		INNER JOIN Turma ON Turma.id = Frequencia.idTurma\
		WHERE Aluno.id = %s;', int(idAluno))

		return toObjArray(conn.res(), [
			'id',
			'nomeAluno',
			'nomeTurma',
			'presenca'			
		])

	def remove(self, conn, id):
		conn.run('DELETE FROM Frequencia WHERE id = %s;', (int(id),))
		return True