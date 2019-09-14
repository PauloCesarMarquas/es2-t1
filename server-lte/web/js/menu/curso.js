import * as System from '/js/system.js';

System.addMenuOption({
	id: 'cursos',
	title: 'Cursos'
});
System.addMenuOption({
	id: 'add-curso',
	parent_id: 'cursos',
	title: 'Cadastrar curso',
	action: () => {
		System.openFormPage('curso/add');
	}
});
System.addMenuOption({
	id: 'list-curso',
	parent_id: 'cursos',
	title: 'Listar cursos',
	action: () => {
		System.openFormPage('curso/list');
	}
});