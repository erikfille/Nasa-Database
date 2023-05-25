import React from 'react'
import styles from './NavBar.module.css'

export default function NavBar() {
  return (
    <div className={styles.navContainer}>
      <img src="/images/Nasa-Logo.png" className={styles.logoImg}/>
    </div>
  )
}
