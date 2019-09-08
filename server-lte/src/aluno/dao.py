from lib.util import toObjArray

class DAOAluno:

	def add(self, conn, aluno):
		nome      = aluno['nome']
		matricula = aluno['matricula']
		email     = aluno['email']
		telefone  = aluno['telefone']
		query = 'INSERT INTO Aluno '
		query += '(nome, matricula, email, telefone) '
		query += 'VALUES (%s, %s, %s, %s)'
		conn.run(query, (nome, matricula, email, telefone))
		conn.done()
		return conn.id()

	def list(self, conn):
		conn.run('SELECT id, nome, matricula, telefone, email FROM Aluno;')
		return toObjArray(conn.res(), ['id', 'nome', 'matricula', 'telefone', 'email'])