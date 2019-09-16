from lib.util import toObjArray

class DAOFrequencia:
	def add(self, conn, frequencias):
		array = []
		for frequencia in frequencias:
			data = frequencia['data']
			presente = frequencia['presente']
			idAluno = frequencia['idAluno']
			idTurma = frequencia['idTurma']
			array.append((data, int(presente), int(idAluno), int(idTurma)))
		conn.runMany('INSERT INTO Frequencia (\
			data, presente, idAluno, idTurma\
		) VALUES (%s, %s, %s, %s);', array)
		return True