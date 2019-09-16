from lib.util import toObjArray

class DAOFrequencia:
	
	def add(self, conn, frequencias):
		array = []
		for frequencia in frequencias:
			data = frequencia['data']
			presente = frequencia['presente']
			idAluno = frequencia['idAluno']
			idTurma = frequencia['idTurma']
			array.append((data, int(presente), int(idAluno), int(idTurma)))
		conn.runMany('INSERT INTO Frequencia (\
			data, presente, idAluno, idTurma\
		) VALUES (%s, %s, %s, %s);', array)
		return True
	
	def listByTurmaData(self, conn, idTurma, data):
		conn.run('SELECT\
			Frequencia.id,\
			Frequencia.data,\
			Frequencia.presente,\
			Frequencia.idAluno,\
			Frequencia.idTurma,\
			Aluno.nome AS nomeAluno,\
			Turma.nome AS nomeTurma\
			FROM Frequencia\
			INNER JOIN Aluno ON Aluno.id = Frequencia.idAluno\
			INNER JOIN Turma ON Turma.id = Frequencia.idTurma\
			WHERE Frequencia.idTurma = %s AND data = %s;', (int(idTurma), data))
		return toObjArray(conn.res(), [
			'id',
			'data',
			'presente',
			'idAluno',
			'idTurma',
			'nomeAluno',
			'nomeTurma'
		])
