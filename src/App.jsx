import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel.jsx';
import Body from './layout/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
	const [items, setItems] = useState([]);

	// Загружаем данные из localStorage один раз при монтировании компонента
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setItems(
				data.map(item => ({
					...item,
					date: new Date(item.date)
				}))
			);
		}
	}, []); // Пустой массив зависимостей, чтобы избежать бесконечного цикла обновлений

	// Сохраняем данные в localStorage при изменении items
	useEffect(() => {
		if (items.length) {
			console.log('Запись в localStorage');
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]);

	const addItem = item => {
		setItems(oldItems => [
			...oldItems,
			{
				post: item.post,
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
				<JournalList items={items} />
			</LeftPanel>
			<Body>
				{/* Исправлена передача пропсов: onSubmit принимает функцию addItem */}
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;
