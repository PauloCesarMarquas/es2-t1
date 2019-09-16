from lib.util import toObjArray

class DAONota():

	def add(self, conn, nota):
		idAluno = nota['idAluno']
		idAvaliacao = nota['idAvaliacao']
		valor = nota['nota']
		query = 'INSERT INTO Nota ( valor, idAluno, idAvaliacao )'
		query += '  VALUES (%s, %s, %s);'
		conn.run(query ,(float(valor), int(idAluno), int(idAvaliacao)))
		return True

	def list(self, conn):
		conn.run('SELECT\
			Nota.id,\
			Nota.valor AS notaValor,\
			Aluno.nome AS nomeAluno,\
			Avaliacao.nome AS nomeAvaliacao,\
			Turma.nome AS nomeTurma,\
			Disciplina.nome AS nomeDisciplina\
		FROM Nota\
		INNER JOIN Aluno ON Aluno.id = Nota.idAluno\
		INNER JOIN Avaliacao ON Avaliacao.id = Nota.idAvaliacao\
		INNER JOIN Turma ON Turma.id = Avaliacao.idTurma\
		INNER JOIN Disciplina ON Disciplina.id = Turma.idDisciplina;')
		return toObjArray(conn.res(), [
			'id',
			'notaValor',
			'nomeAluno',
			'nomeAvaliacao',
			'nomeTurma',
			'nomeDisciplina'
		])

	def listByTurma(self, conn, idTurma):		
		conn.run('SELECT\
			Nota.id,\
			Nota.valor AS valor,\
			Aluno.nome AS nomeAluno,\
			Turma.nome AS nomeTurma,\
		FROM Nota\
		INNER JOIN Aluno ON Aluno.id = Nota.idAluno\
		INNER JOIN Turma ON Turma.id = Nota.idTurma\
		WHERE Turma.id = %s;', int(idTurma))

		return toObjArray(conn.res(), [
			'id',
			'nomeAluno',
			'nomeTurma',
			'valor'			
		])

	def listByAluno(self, conn, idAluno):		
		conn.run('SELECT\
			Nota.id,\
			Nota.valor AS valor,\
			Aluno.nome AS nomeAluno,\
			Turma.nome AS nomeTurma,\
		FROM Nota\
		INNER JOIN Aluno ON Aluno.id = Nota.idAluno\
		INNER JOIN Turma ON Turma.id = Nota.idTurma\
		WHERE Aluno.id = %s;', int(idAluno))

		return toObjArray(conn.res(), [
			'id',
			'nomeAluno',
			'nomeTurma',
			'valor'			
		])

	def remove(self, conn, id):
		conn.run('DELETE FROM Nota WHERE id = %s;', (int(id),))
		return True