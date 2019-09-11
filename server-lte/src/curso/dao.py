from lib.util import toObjArray

class DAOCurso:

	def add(self, conn, curso):
		nome      = curso['nome']
		query = 'INSERT INTO Curso (nome) VALUES (%s);'
		conn.run(query, (nome,))
		return conn.id()

	def list(self, conn):
		conn.run('SELECT id, nome FROM Curso;')
		return toObjArray(conn.res(), ['id', 'nome'])