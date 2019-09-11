from lib.util import toObjArray

class DAOFrequencia:

	def add(self, conn, frequencia):
		nomeAluno	= frequencia['nomeAluno']
		data		= frequencia['data']
		presenca	= frequencia['presenca']
		idAluno		= frequencia['idAluno']
		query = 'INSERT INTO Frequencia (data) VALUES (%s);'
		conn.run(query, (aluno, data, presenca, int(idAluno)))
		conn.done()
		return conn.id()

	def list(self, conn):
		conn.run('\
			SELECT\
				Frequencia.id,\
				Frequencia.data,\
				Frequencia.presenca,\
				aluno.nome AS nomeAluno\
				aluno.id AS idAluno\
			FROM Frequencia\
			INNER JOIN Aluno ON Aluno.id = Frequencia.idAluno;');
		return toObjArray(conn.res(), ['id', 'nomeAluno', 'data', 'presenca','idAluno'])


		