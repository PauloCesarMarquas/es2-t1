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

	# def list(self, conn):
	# 	conn.run('SELECT id, nome FROM Nota;')
	# 	return toObjArray(conn.res(), ['id', 'nome'])

	# def get(self, conn, id):
	# 	conn.run('SELECT id, nome FROM Nota WHERE id = %s;', (int(id),))
	# 	return toObjArray(conn.res(), ['id', 'nome'])[0]

	# def update(self, conn, nota):
	# 	id = nota['id']
	# 	nome = nota['nome']
	# 	conn.run('UPDATE Nota SET\
	# 		nome = %s\
	# 		WHERE id = %s;', (nome, int(id)))
	# 	return True
		
	# def remove(self, conn, id):
	# 	conn.run('DELETE FROM Nota WHERE id = %s;', (int(id),))
	# 	return True