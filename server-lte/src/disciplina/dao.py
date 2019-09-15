from lib.util import toObjArray

class DAODisciplina:

	def add(self, conn, disciplina):
		nome = disciplina['nome']
		idCurso = disciplina['idCurso']
		query = 'INSERT INTO Disciplina (nome, idCurso) VALUES (%s, %s);'
		conn.run(query, (nome, int(idCurso)))
		return conn.id()

	def update(self, conn, disciplina):
		id = disciplina['id']
		nome = disciplina['nome']
		idCurso = disciplina['idCurso']
		query = 'UPDATE Disciplina\
			SET nome = %s, idCurso = %s\
			WHERE id = %s;'
		conn.run(query, (nome, int(idCurso), int(id)))

	def list(self, conn):
		conn.run('SELECT\
				Disciplina.id,\
				Disciplina.nome,\
				Disciplina.idCurso,\
				Curso.nome AS nomeCurso\
			FROM Disciplina\
			INNER JOIN Curso ON Curso.id = Disciplina.idCurso;');
		return toObjArray(conn.res(), ['id', 'nome', 'idCurso', 'nomeCurso'])

	def get(self, conn, id):
		conn.run('SELECT\
				Disciplina.id,\
				Disciplina.nome,\
				Disciplina.idCurso,\
				Curso.nome AS nomeCurso\
			FROM Disciplina\
			INNER JOIN Curso ON Curso.id = Disciplina.idCurso\
			WHERE Disciplina.id = %s;', (int(id),));
		return toObjArray(conn.res(), ['id', 'nome', 'idCurso', 'nomeCurso'])[0]

	def remove(self, conn, id):
		conn.run('DELETE FROM Disciplina WHERE id = %s;', (int(id),));

	def listByCurso(self, conn, idCurso):
		conn.run('SELECT id, nome FROM Disciplina WHERE idCurso = %s;', (int(idCurso),))
		return toObjArray(conn.res(), ['id', 'nome'])