import * as System from '/js/system.js';

System.addMenuOption({
	id: 'avaliacao',
	title: 'Avaliação'
});
System.addMenuOption({
	id: 'add-avaliacao',
	parent_id: 'avaliacao',
	title: 'Cadastrar avaliação',
	action: () => {
		System.openFormPage('avaliacao/add');
	}
});
System.addMenuOption({
	id: 'list-avaliacao',
	parent_id: 'avaliacao',
	title: 'Listar avaliacao',
	action: () => {
		System.openFormPage('avaliacao/list');
	}
});
System.addMenuOption({
	id: 'list-avaliacao-by-turma',
	parent_id: 'avaliacao',
	title: 'Listar por Turma',
	action: () => {
		System.openFormPage('avaliacao/por_turma');
	}
});