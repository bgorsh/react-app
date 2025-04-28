import styles from './Header.module.css';

function Header() {
	return (
		<img src="/logo.png" className={styles.logo} alt="Логотип"/> 
	);
		
}

export default Header;
