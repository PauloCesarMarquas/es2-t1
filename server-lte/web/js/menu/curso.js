import * as PageControl from '/js/page-control.js';

PageControl.addMenuOption({
	id: 'cursos',
	title: 'Cursos'
});
PageControl.addMenuOption({
	id: 'add-curso',
	parent_id: 'cursos',
	title: 'Cadastrar curso',
	action: () => {
		PageControl.openForm('curso/add');
	}
});
PageControl.addMenuOption({
	id: 'list-curso',
	parent_id: 'cursos',
	title: 'Listar cursos',
	action: () => {
		PageControl.openForm('curso/list');
	}
});