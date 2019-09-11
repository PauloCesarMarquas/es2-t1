from lib.util import toObjArray

class DAOAluno:

	def add(self, conn, aluno):
		nome      = aluno['nome']
		matricula = aluno['matricula']
		email     = aluno['email']
		telefone  = aluno['telefone']
		#idCurso   = aluno['idCurso']
		query = 'INSERT INTO Aluno '
		query += '(nome, matricula, email, telefone) '
		query += 'VALUES (%s, %s, %s, %s)'
		conn.run(query, (nome, matricula, email, telefone))
		return conn.id()

	def list(self, conn):
		conn.run('SELECT id, nome, matricula, telefone, email FROM Aluno;')
		return toObjArray(conn.res(), ['id', 'nome', 'matricula', 'telefone', 'email'])

	def update(self, conn, aluno):
		id        = aluno['id']
		nome      = aluno['nome']
		matricula = aluno['matricula']
		email     = aluno['email']
		telefone  = aluno['telefone']
		idCurso   = aluno['idCurso']
		query = 'UPDATE Aluno SET\
			nome = %s,\
			matricula = %s,\
			email = %s,\
			telefone = %s,\
			idCurso = %s\
			WHERE id = %s';
		conn.run(query, (nome, matricula, email, telefone, int(idCurso), int(id)))

	def remove(self, conn, id):
		conn.run('DELETE FROM Matricula WHERE idAluno = %s;', (int(id),))
		conn.run('DELETE FROM Aluno WHERE id = %s;', (int(id),))

	def get(self, conn, id):
		query = 'SELECT\
				Aluno.id,\
				Aluno.nome,\
				Aluno.matricula,\
				Aluno.email,\
				Aluno.telefone,\
				Aluno.idCurso,\
				Curso.nome AS nomeCurso\
			FROM Aluno\
			LEFT JOIN Curso ON Curso.id = Aluno.idCurso\
			WHERE Aluno.id = %s;'
		attrs = [
			'id',
			'nome',
			'matricula',
			'email',
			'telefone',
			'idCurso',
			'nomeCurso'
		]
		conn.run(query, (int(id),))
		return toObjArray(conn.res(), attrs)[0]