from lib.util import toObjArray

class DAONota:

	def add(self, conn, nota):
		valor = float(nota['valor'])
		idAluno = int(nota['idAluno'])
		idAvaliacao = int(nota['idAvaliacao'])
		conn.run('INSERT INTO Nota\
			(valor, idAluno, idAvaliacao)\
			VALUES (%s, %s, %s);', (
				valor, idAluno, idAvaliacao
			))
		return conn.id()

	def listByAvaliacao(self, conn, idAvaliacao):
		idAvaliacao = int(idAvaliacao)
		conn.run('SELECT\
			Nota.id,\
			Nota.valor,\
			Aluno.nome AS nomeAluno\
			FROM Nota\
			INNER JOIN Aluno ON Aluno.id = Nota.idAluno\
			WHERE Nota.idAvaliacao = %s;', (idAvaliacao,))
		return toObjArray(conn.res(), ['id', 'valor', 'nomeAluno'])