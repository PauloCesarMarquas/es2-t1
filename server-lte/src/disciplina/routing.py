from connector import Connector
from src.disciplina.dao import DAODisciplina
from server import add_POST, add_GET

def add(req, data):
	print(data)
	disciplina = {
		'nome': data['nome'][0],
		'idCurso': data['idCurso'][0]
	}
	conn = Connector()
	dao = DAODisciplina()
	req.sendJSON(dao.add(conn, disciplina))

def list(req, data):
	conn = Connector()
	dao = DAODisciplina()
	req.sendJSON(dao.list(conn))

add_POST('/disciplina/add', add)
add_GET('/disciplina/list', list)