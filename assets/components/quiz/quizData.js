const quizData = [
	{
		number: 1,
		title: 'Тип объекта',
		answer_alias: 'type',
		answers: [
			{
				answer_title: 'Квартира',
				type: 'radio',
			},
			{
				answer_title: 'Дом',
				type: 'radio',
			},
			{
				answer_title: 'Другое',
				type: 'text',
			},
		],
	},
	{
		number: 2,
		title: 'Укажите площадь объекта',
		answer_alias: 'square',
		answers: [
			{
				answer_title: '',
				type: 'square',
			},
		],
	},
	{
		number: 3,
		title: 'Какие услуги вам нужны?',
		answer_alias: 'services',
		answers: [
			{
				answer_title: 'Отделка',
				type: 'checkbox',
			},
			{
				answer_title: 'Комплектация',
				type: 'checkbox',
			},
			{
				answer_title: 'Дизайн-проект',
				type: 'checkbox',
			},
		],
	},
	{
		number: 4,
		title: 'Когда вы планируете начать реализацию вашего проекта?',
		answer_alias: 'date',
		answers: [
			{
				answer_title: 'До 1 месяца',
				type: 'radio',
			},
			{
				answer_title: 'Через 1/2 месяца',
				type: 'radio',
			},
			{
				answer_title: 'Позднее 2 месяцев',
				type: 'radio',
			},
		],
	},
	{
		number: 5,
		title: 'Когда вы планируете начать реализацию вашего проекта?',
		answer_alias: 'contacts',
		answers: [
			{
				answer_title: '',
				type: 'name',
			},
			{
				answer_title: '',
				type: 'phone',
			},
			{
				answer_title: '',
				type: 'policy',
			},
		],
	},
];

export default quizData;
