from lib.util import toObjArray

class DAOnota:


	def add(self, conn, aluno, disciplina):
		aluno      	= aluno['aluno']
		idAluno		= aluno['idAluno']
		data	   	= data['data']
		valor  	   	= valor['valor']
		disciplina	= disciplina['disciplina']
		idDisciplina= disciplina['idDisciplina']
		query = 'INSERT INTO Nota (data) VALUES (%s);'
		conn.run(query, (aluno, data, valor, disciplina, int(idAluno), int(idDisciplina)))
		return conn.id()

	def list(self, conn):
		conn.run('\
			SELECT\
				Nota.id,\
				Nota.data,\
				Nota.valor,\
				Aluno.nome AS nomeAluno\
				Aluno.id AS idAluno\
				Disciplina.id AS idDisciplina\
				Disciplina.nome AS nome\
			FROM Nota\
			INNER JOIN Aluno ON Aluno.id = Nota.idAluno\
			INNER JOIN Disciplina ON Disciplina.id = Nota.idDisciplina;');
		return toObjArray(conn.res(), ['id', 'aluno', 'data', 'valor','idAluno','idDisciplina'])

	def listByDisciplina(self, conn, disciplina):
		idDisciplina = disciplina['idDisciplina']
		query = 'SELECT * FROM disciplina WHERE id = '+ idDisciplina+'\
		INNER JOIN Aluno ON Aluno.id = Nota.idAluno\
		INNER JOIN Disciplina ON Disciplina.id = Nota.idDisciplina';
		conn.run(query,idDisciplina);
		return toObjArray(conn.res(), ['id', 'aluno', 'data', 'valor','idAluno','idDisciplina','nome'])