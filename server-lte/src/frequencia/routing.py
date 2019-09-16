from connector import Connector
from src.frequencia.dao import DAOFrequencia
from server import add_POST, add_GET

def add(req, args):

	dao = DAOFrequencia()
	conn = Connector()

	data = args.get('data')
	idTurma = args.get('idTurma')
	nAlunos = int(args.get('nAlunos'))
	
	frequencias = []
	for i in range(nAlunos):
		frequencias.append({
			'data': data,
			'presente': args.get('frequencia['+str(i)+'][presente]'),
			'idAluno': args.get('frequencia['+str(i)+'][idAluno]'),
			'idTurma': idTurma
		})

	dao.add(conn, frequencias)
	req.sendJSON(True)

add_POST('/frequencia/add', add)

def parseData(rows):
	for row in rows:
		row['data'] = str(row['data'])
	return rows

def list(req, args):

	dao = DAOFrequencia()
	conn = Connector()

	data = args.get('data')
	idTurma = args.get('idTurma')

	if (data != None) and (idTurma != None):
		rows = dao.listByTurmaData(conn, idTurma, data)
		req.sendJSON(parseData(rows))
	else:
		req.sendJSON(False)

add_GET('/frequencia/list', list)