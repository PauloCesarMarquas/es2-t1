import * as System from '/js/system.js';

System.addMenuOption({
	id: 'avaliacao',
	title: 'Avaliações'
});
System.addMenuOption({
	id: 'avaliacao-add',
	parent_id: 'avaliacao',
	title: 'Adicionar Avaliação',
	action: () => System.openFormPage('avaliacao/add')
});
System.addMenuOption({
	id: 'avaliacao-list',
	parent_id: 'avaliacao',
	title: 'Listar Avaliações',
	action: () => System.openFormPage('avaliacao/list')
});