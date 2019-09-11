from lib.util import toObjArray

class DAODisciplina:

	def add(self, conn, curso):
		nome = curso['nome']
		idCurso = curso['idCurso']
		query = 'INSERT INTO Disciplina (nome, idCurso) VALUES (%s, %s);'
		conn.run(query, (nome, int(idCurso)))
		conn.done()
		return conn.id()

	def list(self, conn):
		conn.run('\
			SELECT\
				Disciplina.id,\
				Disciplina.nome,\
				Disciplina.idCurso,\
				Curso.nome AS nomeCurso\
			FROM Disciplina\
			INNER JOIN Curso ON Curso.id = Disciplina.idCurso;');
		return toObjArray(conn.res(), ['id', 'nome', 'idCurso', 'nomeCurso'])