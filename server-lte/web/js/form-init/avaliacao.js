import * as System from '/js/system.js';

const loadTurmas = page => new Promise((done, fail) => {
	page.userGet('/turma/list')
		.then(array => {
			const select = page.find('[name="idTurma"]');
			select.html('');
			array.forEach(item => {
				const {id, nome} = item;
				const option = $.new('option').val(id);
				option.append($.txt(nome));
				select.append(option);
			});
		})
		.catch(fail);
});

System.addFormInit('avaliacao/add', page => {
	loadTurmas(page)
		.catch(() => {
			page.close();
			System.error('Erro ao carregar turmas');
		});
	page.find('[target="submit"]').bind('click', () => {
		page.userPost('/avaliacao/add', page.data())
			.then(() => System.say('Avaliação cadastrada com sucesso'))
			.catch(() => System.error('Erro ao salvar avaliação'));
	});
});