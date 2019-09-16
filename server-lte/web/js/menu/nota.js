import * as System from '/js/system.js';

System.addMenuOption({
	id: 'notas',
	title: 'Notas'
});
System.addMenuOption({
	id: 'add-nota',
	parent_id: 'notas',
	title: 'Registrar nota',
	action: () => {
		System.openFormPage('nota/add');
	}
});
System.addMenuOption({
	id: 'list-nota',
	parent_id: 'notas',
	title: 'Listar notas',
	action: () => {
		System.openFormPage('nota/list');
	}
});