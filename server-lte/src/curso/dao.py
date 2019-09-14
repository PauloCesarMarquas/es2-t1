from lib.util import toObjArray

class DAOCurso:

	def add(self, conn, curso):
		nome = curso['nome']
		query = 'INSERT INTO Curso (nome) VALUES (%s);'
		conn.run(query, (nome,))
		return conn.id()

	def list(self, conn):
		conn.run('SELECT id, nome FROM Curso;')
		return toObjArray(conn.res(), ['id', 'nome'])

	def get(self, conn, id):
		conn.run('SELECT id, nome FROM Curso WHERE id = %s;', (int(id),))
		return toObjArray(conn.res(), ['id', 'nome'])[0]

	def update(self, conn, curso):
		id = curso['id']
		nome = curso['nome']
		conn.run('UPDATE Curso SET\
			nome = %s\
			WHERE id = %s;', (nome, int(id)))
		return True
		
	def remove(self, conn, id):
		conn.run('DELETE FROM Curso WHERE id = %s;', (int(id),))
		return True