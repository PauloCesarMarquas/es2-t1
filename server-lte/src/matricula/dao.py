from lib.util import toObjArray

class DAOMatricula():

	def add(self, conn, matricula):
		idAluno = matricula['idAluno']
		idTurma = matricula['idTurma']
		conn.run('INSERT INTO Matricula (\
				idAluno, idTurma\
			) VALUES (%s, %s);', (int(idAluno), int(idTurma)))
		return True

	def list(self, conn):
		conn.run('SELECT\
			Matricula.id,\
			Aluno.nome AS nomeAluno,\
			Turma.nome AS nomeTurma,\
			Disciplina.nome AS nomeDisciplina\
		FROM Matricula\
		INNER JOIN Aluno ON Aluno.id = Matricula.idAluno\
		INNER JOIN Turma ON Turma.id = Matricula.idTurma\
		INNER JOIN Disciplina ON Disciplina.id = Turma.idDisciplina;')
		return toObjArray(conn.res(), [
			'id',
			'nomeAluno',
			'nomeTurma',
			'nomeDisciplina'
		])

	def listByTurma(self, conn, idTurma):		
		conn.run('SELECT\
			Matricula.id,\
			Aluno.nome AS nomeAluno,\
			Turma.nome AS nomeTurma,\
			Disciplina.nome AS nomeDisciplina\
		FROM Matricula\
		INNER JOIN Aluno ON Aluno.id = Matricula.idAluno\
		INNER JOIN Turma ON Turma.id = Matricula.idTurma\
		INNER JOIN Disciplina ON Disciplina.id = Turma.idDisciplina\
		WHERE Turma.id = %s;', int(idTurma))

		return toObjArray(conn.res(), [
			'id',
			'nomeAluno',
			'nomeTurma',			
		])

	def remove(self, conn, id):
		conn.run('DELETE FROM Matricula WHERE id = %s;', (int(id),))
		return True