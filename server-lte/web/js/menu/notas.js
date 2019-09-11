import * as PageControl from '/js/page-control.js';

PageControl.addMenuOption({
	id: 'notas',
	title: 'Notas'
});
PageControl.addMenuOption({
	id: 'add-nota',
	parent_id: 'notas',
	title: 'Cadastrar nota',
	action: () => {
		PageControl.openForm('nota/add');
	}
});
PageControl.addMenuOption({
	id: 'list-nota',
	parent_id: 'notas',
	title: 'Listar notas',
	action: () => {
		PageControl.openForm('nota/list');
	}
});