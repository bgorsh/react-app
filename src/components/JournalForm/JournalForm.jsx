import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
import cn from 'classnames';

// Начальное состояние валидности полей формы
const INITIAL_STATE = {
	title: true,
	post: true,
	date: true
};

function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		post: true,
		date: true
	});

	useEffect(() => {
		let timerId;
		// Если есть невалидные поля, сбрасываем состояние валидности через 2 секунды
		if (!formValidState.title || !formValidState.date || !formValidState.post) {
			timerId = setTimeout(() => setFormValidState(INITIAL_STATE), 2000); // исправлено: setTimeout вместо setTimeOut и удалён импорт
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [formValidState]);

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;

		// Проверка поля title
		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({ ...state, title: false }));
			isFormValid = false; // Устанавливаем флаг в false при ошибке валидации
		} else {
			setFormValidState(state => ({ ...state, title: true }));
		}

		// Проверка поля date
		if (!formProps.date) {
			setFormValidState(state => ({ ...state, date: false }));
			isFormValid = false; // Устанавливаем флаг в false при ошибке валидации
		} else {
			setFormValidState(state => ({ ...state, date: true }));
		}

		// Проверка поля post
		if (!formProps.post?.trim().length) {
			setFormValidState(state => ({ ...state, post: false }));
			isFormValid = false; // Устанавливаем флаг в false при ошибке валидации
		} else {
			setFormValidState(state => ({ ...state, post: true }));
		}

		if (!isFormValid) {
			return; // Прекращаем отправку формы, если есть ошибки
		}
		onSubmit(formProps);
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input
					type='text'
					name='title'
					className={cn(styles['input-title'], {
						[styles['invalid']]: !formValidState.title
					})}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src='/calendar.svg' alt='Иконка календаря' />
					<span>Дата</span>
				</label>
				<input
					type='date'
					name='date'
					id='date'
					className={cn(styles['input-date'], {
						[styles['invalid']]: !formValidState.date
					})}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='/folder.svg' alt='Иконка папки' />
					<span>Метки</span>
				</label>
				<input type='text' name='tag' id='tag' className={styles['input']}/>
			</div>
			<textarea
				name='post'
				cols='30'
				rows='10'
				className={`${styles['input']} ${
					formValidState.post ? '' : styles['invalid']
				}`}
			></textarea>
			<Button text='Сохранить' />
		</form>
	);
}

export default JournalForm;
