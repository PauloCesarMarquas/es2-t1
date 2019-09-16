from connector import Connector
from src.frequencia.dao import DAOFrequencia
from server import add_POST, add_GET

def add(req, data):
	frequencia = {
		'idAluno': data.get('idAluno'),
		'idTurma': data.get('idTurma'),
		'frequencia': data.get('frequencia')
	}
	dao = DAOFrequencia()
	conn = Connector()
	req.sendJSON(dao.add(conn, frequencia))	
add_POST('/frequencia/add', add)

def list(req, data):
	dao = DAOFrequencia()	
	conn = Connector()
	idTurma = data.get('idTurma')
	if (idTurma != None):
		array = dao.listByTurma(conn, {idTurma})
	else:
		array = dao.listByAluno(conn, {data.get('idAluno')})
	req.sendJSON(dao.list(conn))
add_GET('/frequencia/list', list)

def remove(req, data):
	id = data.get('id')
	dao = DAOFrequencia()
	conn = Connector()
	req.sendJSON(dao.remove(conn, id))
add_POST('/frequencia/remove', remove)