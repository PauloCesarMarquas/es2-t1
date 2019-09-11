from connector import Connector
from src.frequencia.dao import DAOFrequencia
from server import add_POST, add_GET

def add(req, data):
	frequencia = {
		'data': data['data'][0], 
		'nome': data['nomeAluno'][0], 
		'presenca': data['presenca'][0], 
		'IdAluno': data['IdAluno'][0]
	}
	conn = Connector()
	dao = DAOFrequencia()
	req.sendJSON(dao.add(conn, frequencia))

def list(req, data):
	conn = Connector()
	dao = DAOFrequencia()
	req.sendJSON(dao.list(conn))

add_POST('/frequencia/add', add)
add_GET('/frequencia/list', list)