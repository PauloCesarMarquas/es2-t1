from connector import Connector
from src.nota.dao import DAONota
from server import add_POST, add_GET

def add(req, data):
	nota = { 
		'aluno'		:data['nome'][0],
		'data'		:data['data'][0],
		'valor'		:data['valor'][0],
		'disciplina':data['disciplina'][0],
		'idDisciplina':data['idDisciplina'][0]
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
		idDisciplina = data['idDisciplina'][0]
	}
	conn = Connector()
	dao = DAONota()
	req.sendJSON(dao.listByDisciplina(conn, disciplina))

add_POST('/nota/add', add)
add_GET('/nota/list', list)
add_GET('/nota/listByDisciplina', listByDisciplina)
