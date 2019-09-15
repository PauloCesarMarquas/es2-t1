from connector import Connector
from src.nota.dao import DAONota
from server import add_POST, add_GET

def add(req, data):
	nota = { 
		'aluno'		:data.get('nome'),
		'data'		:data.get('data'),
		'valor'		:data.get('valor'),
		'disciplina':data.get('disciplina'),
		'idDisciplina':data.get('idDisciplina')
	}
	conn = Connector()
	dao = DAONota()
	req.sendJSON(dao.add(conn, nota))

def list(req, data):
	conn = Connector()
	dao = DAONota()
	req.sendJSON(dao.list(conn))

def listByDisciplina(req, data):
	disciplina ={
		idDisciplina = data.get('idDisciplina')
	}
	conn = Connector()
	dao = DAONota()
	req.sendJSON(dao.listByDisciplina(conn, disciplina))

add_POST('/nota/add', add)
add_GET('/nota/list', list)
add_GET('/nota/listByDisciplina', listByDisciplina)
