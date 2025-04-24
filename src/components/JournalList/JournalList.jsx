import './JournalList.css';
import JournalItem from '../JornalItem/JournalItem';
import CardButton from '../CardButton/CardButton';

function JournalList({ items }) {
	const sortItems = (a, b) => {
		if (a.date > b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	if (items.length === 0) {
		return <p>Записей пока нет, создайте первую!</p>;
	}
	return (
		<>
			{items.sort(sortItems).map(el => (
				// Добавлен ключ key для корректной работы списков в React
				<CardButton key={el.id}>
					<JournalItem title={el.title} text={el.text} date={el.date} />
				</CardButton>
			))}
		</>
	); 
}

export default JournalList;
