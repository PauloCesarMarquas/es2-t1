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
		return conn.id()

	def list(self, conn):
		conn.run('SELECT\
			Aluno.id,\
			Aluno.nome,\
			Aluno.matricula,\
			Aluno.telefone,\
			Aluno.email,\
			Curso.nome AS nomeCurso\
			FROM Aluno\
			LEFT JOIN Curso ON Curso.id = Aluno.idCurso;')
		return toObjArray(conn.res(), [
			'id',
			'nome',
			'matricula',
			'telefone',
			'email',
			'nomeCurso'
		])

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
		conn.run(query, (
			nome,
			matricula,
			email,
			telefone,
			int(idCurso),
			int(id)
		))

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
		conn.run(query, (int(id),))
		return toObjArray(conn.res(), [
			'id',
			'nome',
			'matricula',
			'email',
			'telefone',
			'idCurso',
			'nomeCurso'
		])[0]

	def listByDisciplina(self, conn, idDisciplina):
		conn.run('SELECT Aluno.nome, Aluno.matricula\
			FROM Aluno\
			INNER JOIN Matricula mat ON mat.idAluno = Aluno.id\
			INNER JOIN Turma ON Turma.id = mat.idTurma\
			WHERE Turma.idDisciplina = %s;',
			(int(idDisciplina),)
		)
		return (toObjArray(conn.res(), [ 'nome', 'matricula' ]))