import * as System from '/js/system.js';

System.addMenuOption({
	id: 'disciplinas',
	title: 'Disciplinas'
});
System.addMenuOption({
	id: 'add-disciplina',
	parent_id: 'disciplinas',
	title: 'Cadastrar disciplina',
	action: () => {
		System.openFormPage('disciplina/add');
	}
});
System.addMenuOption({
	id: 'list-disciplina',
	parent_id: 'disciplinas',
	title: 'Listar disciplinas',
	action: () => {
		System.openFormPage('disciplina/list');
	}
});