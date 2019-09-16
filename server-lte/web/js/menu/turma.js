import * as System from '/js/system.js';

System.addMenuOption({
	id: 'turmas',
	title: 'Turmas'
});
System.addMenuOption({
	id: 'add-turma',
	parent_id: 'turmas',
	title: 'Cadastrar turma',
	action: () => {
		System.openFormPage('turma/add');
	}
});
System.addMenuOption({
	id: 'list-turma',
	parent_id: 'turmas',
	title: 'Listar turmas',
	action: () => {
		System.openFormPage('turma/list');
	}
});

System.addMenuOption({
	id: 'list-turma',
	parent_id: 'turmas',
	title: 'Listar turmas por disciplinas',
	action: () => {
		System.openFormPage('turma/list');
	}
});