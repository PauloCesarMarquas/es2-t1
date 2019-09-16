import * as System from '/js/system.js';

System.addMenuOption({
	id: 'nota',
	title: 'Notas'
});
System.addMenuOption({
	id: 'add-nota',
	parent_id: 'nota',
	title: 'Nota da Avaliação',
	action: () => {
		System.openFormPage('nota/add');
	}
});
System.addMenuOption({
	id: 'list-nota',
	parent_id: 'nota',
	title: 'Listar Notas',
	action: () => {
		System.openFormPage('nota/list');
	}
});
System.addMenuOption({
	id: 'list-nota',
	parent_id: 'nota',
	title: 'Listar Notas da Turma',
	action: () => {
		System.openFormPage('nota/por_turma');
	}
});
System.addMenuOption({
	id: 'list-nota',
	parent_id: 'nota',
	title: 'Listar Notas de Aluno',
	action: () => {
		System.openFormPage('nota/por_aluno');
	}
});