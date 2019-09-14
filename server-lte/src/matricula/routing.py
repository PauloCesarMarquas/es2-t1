from connector import Connector
from src.matricula.dao import DAOMatricula
from server import add_POST, add_GET

def add(req, data):
	matricula = {
		'idAluno': data['idAluno'][0],
		'idDisciplina': data['idDisciplina'][0]
	}
	dao = DAOMatricula()
	conn = Connector()
	req.sendJSON(dao.add(conn, matricula))
add_POST('/matricula/add', add)

def list(req, data):
	dao = DAOMatricula()
	conn = Connector()
	req.sendJSON(dao.list(conn))
add_GET('/matricula/list', list)

def remove(req, data):
	id = data['id'][0]
	dao = DAOMatricula()
	conn = Connector()
	req.sendJSON(dao.remove(conn, id))
add_POST('/matricula/remove', remove)