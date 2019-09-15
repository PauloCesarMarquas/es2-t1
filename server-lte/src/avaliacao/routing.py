from connector import Connector
from src.avaliacao.dao import DAOAvaliacao
from server import add_POST, add_GET

def add(req, data):
	avaliacao = {
		'nome': data.get('nome'),
		'nota': data.get('nota'),
		'idTurma': data.get('idTurma')
	}
	dao = DAOAvaliacao()
	conn = Connector()
	req.sendJSON(dao.add(conn, avaliacao))
add_POST('/avaliacao/add', add)