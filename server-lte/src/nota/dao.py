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

	def remove(self, conn, id):
		conn.run('DELETE FROM Nota WHERE id = %s;', (int(id),))
		return True