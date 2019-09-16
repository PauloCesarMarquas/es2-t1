from connector import Connector
from src.frequencia.dao import DAOFrequencia
from server import add_POST, add_GET

def add(req, args):
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
	dao = DAOFrequencia()
	conn = Connector()
	dao.add(conn, frequencias)
	req.sendJSON(True)
add_POST('/frequencia/add', add)