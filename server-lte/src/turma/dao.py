from lib.util import toObjArray

class DAOTurma:

	def add(self, conn, turma):
		nome = turma['nome']
		idDisciplina = turma['idDisciplina']
		query = 'INSERT INTO Turma (nome, idDisciplina) VALUES (%s, %s);'
		conn.run(query, (nome, int(idDisciplina)))
		return conn.id()

	def update(self, conn, turma):
		id = turma['id']
		nome = turma['nome']
		idDisciplina = turma['idDisciplina']
		query = 'UPDATE Turma\
			SET nome = %s, idDisciplina = %s\
			WHERE id = %s;'
		conn.run(query, (nome, int(idDisciplina), int(id)))

	def list(self, conn):
		conn.run('SELECT\
				Turma.id,\
				Turma.nome,\
				Turma.idDisciplina,\
				Disciplina.nome AS nomeDisciplina\
			FROM Turma\
			INNER JOIN Disciplina ON Disciplina.id = Turma.idDisciplina;');
		return toObjArray(conn.res(), ['id', 'nome', 'idDisciplina', 'nomeDisciplina'])

	def get(self, conn, id):
		conn.run('SELECT\
				Turma.id,\
				Turma.nome,\
				Turma.idDisciplina,\
				Disciplina.nome AS nomeDisciplina\
			FROM Turma\
			INNER JOIN Disciplina ON Disciplina.id = Turma.idDisciplina\
			WHERE Turma.id = %s;', (int(id),));
		return toObjArray(conn.res(), ['id', 'nome', 'idDisciplina', 'nomeDisciplina'])[0]

	def remove(self, conn, id):
		conn.run('DELETE FROM Turma WHERE id = %s;', (int(id),));