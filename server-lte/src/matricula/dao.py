from lib.util import toObjArray

class DAOMatricula():

	def add(self, conn, matricula):
		idAluno = matricula['idAluno']
		idDisciplina = matricula['idDisciplina']
		conn.run('INSERT INTO Matricula (\
				idAluno, idDisciplina\
			) VALUES (%s, %s);', (int(idAluno), int(idDisciplina)))
		return True

	def list(self, conn):
		conn.run('SELECT\
			Matricula.id,\
			Aluno.nome AS nomeAluno,\
			Disciplina.nome AS nomeDisciplina\
		FROM Matricula\
		INNER JOIN Aluno ON Aluno.id = Matricula.idAluno\
		INNER JOIN Disciplina ON Disciplina.id = Matricula.idDisciplina;')
		return toObjArray(conn.res(), ['id', 'nomeAluno', 'nomeDisciplina'])

	def remove(self, conn, id):
		conn.run('DELETE FROM Matricula WHERE id = %s;', (int(id),))
		return True