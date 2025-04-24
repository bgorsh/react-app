import './JournalForm.css';
import Button from '../Button/Button';
import { useState } from 'react';


function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		post: true,
		date: true
	});
	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;
		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({ ...state, title: false })); // setFormValidState({ ...isFormValid = false;
		} else {
			setFormValidState(state => ({ ...state, title: true })); // setFormValidState({ ...isFormValid = true;
		}
		// if (!formProps.tag?.trim().length) {
		// 	setFormValidState(state => ({ ...state, tag: false })); // setFormValidState({ ...isFormValid = false;
		// } else {
		// 	setFormValidState(state => ({ ...state, tag: true })); // setFormValidState({ ...isFormValid = true;
		// }
		if (!formProps.date) {
			setFormValidState(state => ({ ...state, date: false })); // setFormValidState({ ...isFormValid = false;
		} else {
			setFormValidState(state => ({ ...state, date: true })); // setFormValidState({ ...isFormValid = true;
		}
		if (!formProps.post?.trim().length) {
			setFormValidState(state => ({ ...state, post: false })); // setFormValidState({ ...isFormValid = false;
		} else {
			setFormValidState(state => ({ ...state, post: true })); // setFormValidState({ ...isFormValid = true;
		}
		if (!isFormValid) {
			return;
		}
		onSubmit(formProps);
	};

	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<input
				type='text'
				name='title'
				style={{
					border: formValidState.title ? undefined : 'red solid 2px'
				}}
			/>
			<input
				type='date'
				name='date'
				style={{
					border: formValidState.date ? undefined : 'red solid 2px'
				}}
			/>
			<input
				type='text'
				name='tag'
				// style={{
				// 	border: formValidState.tag ? undefined : 'red solid 2px'
				// }}
			/>
			<textarea
				name='post'
				id=''
				cols='30'
				rows='10'
				style={{
					border: formValidState.post ? undefined : 'red solid 2px'
				}}
			></textarea>
			<Button text='Сохранить' />
		</form>
	);
}

export default JournalForm;
