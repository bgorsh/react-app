import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel.jsx';
import Body from './layout/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import { useState } from 'react';


/* Исправлена опечатка в названии константы с INICIAL_DATA на INITIAL_DATA */
const INITIAL_DATA = [
	// {
	// 	id: 1,
	// 	title: 'Подготовка к обновлению курсов',
	// 	text: 'Сегодня я закончил подготовку к обновлению курсов. Я добавил',
	// 	date: new Date()
	// },
	// {
	// 	id: 2,
	// 	title: 'Поход в горы',
	// 	text: 'Думал, что много времени...',
	// 	date: new Date()
	// }
];

function App() {
	const [items, setItems] = useState(INITIAL_DATA);

	const addItem = item => {
		setItems(oldItems => [
			...oldItems,
			{
				text: item.text,
				title: item.title,
				date: new Date(item.date),
				id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1  
			}
		]);
	};
	
	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={items}/>	
			</LeftPanel>
			<Body>
				{/* Исправлена передача пропсов: onSubmit принимает функцию addItem */}
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;
