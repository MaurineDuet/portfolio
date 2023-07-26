//Style
import '../../styles/footer.scss'

//Basic
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

//Images
import Notes from '../../assets/notes.svg'
import Volume from '../../assets/volume.svg'
import Wifi from '../../assets/wifi.svg'
import Battery from '../../assets/battery.svg'

import CvIcon from '../../assets/menu_cv_icon.svg'
import LandingIcon from '../../assets/menu_landing_icon.svg'
import HelpIcon from '../../assets/menu_help_icon.svg'
import RocketIcon from '../../assets/menu_rocket_icon.svg'
import MenuLogo from '../../assets/menu_logo.png'

function Footer() {

    const [currentTime, setCurrentTime] = useState('') //Initializing time const
    const [currentDate, setCurrentDate] = useState('') //Initializing date const
    const [menuVisible, setMenuVisible] = useState(false)
    const menuRef = useRef(null)

    //Getting time and date
    useEffect(() => {
        const intervalId = setInterval(() => { //Setting interval for updating time and date
            const now = new Date()
            const currentHour = now.getHours() //Getting hours
            const currentMinute = now.getMinutes() //Getting minutes
            const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute
                .toString()
                .padStart(2, '0')}`
            setCurrentTime(formattedTime) //Formating time as desired

            const currentDay = now.getDate() //Getting date
            const currentMonth = now.getMonth() + 1 //Getting month
            const currentYear = now.getFullYear() //Getting year
            const formattedDate = `${currentDay.toString().padStart(2, '0')}/${currentMonth
                .toString()
                .padStart(2, '0')}/${currentYear}`
            setCurrentDate(formattedDate); //Formating date as desired
        }, 1000); //Interval of 1sc for updating

        return () => {
            clearInterval(intervalId) //Prevent the code from running between the set interval to save space
        };
    }, [])

    //Trigger the menu opening/closing
    useEffect(() => {
        const handleClickOutside = (event) => {
            if ((menuRef.current &&
                !menuRef.current.contains(event.target)) &&
                !event.target.classList.contains('start-button')) {
                setMenuVisible(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    //Trigger open menu
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    }

    return (
        <footer>
            <button className='start-button' onClick={toggleMenu}>start</button>
            <div ref={menuRef} className='footer_menu' style={{ display: menuVisible ? 'flex' : 'none' }}>
                <img src={MenuLogo} alt="" className='menu_logo' />
                <div className='menu_buttons'>
                    <Link to='/' className='menu_button'>
                        <img src={LandingIcon} alt="" />
                        <p>accueil</p>
                    </Link>
                    <Link to='/cv' className='menu_button'>
                        <img src={CvIcon} alt="" />
                        <p>mon CV</p>
                    </Link>
                    <Link to='/main' className='menu_button'>
                        <img src={RocketIcon} alt="" />
                        <p>mon univers</p>
                    </Link>
                    <div className='menu_button'>
                        <img src={HelpIcon} alt="" />
                        <p>help</p>
                    </div>
                </div>
            </div>

            <nav>
                <ul>
                    <li><img src={Notes} alt="Icone prise de note" className='footer_nav_button' /></li>
                    <li>FR</li>
                    <li><img src={Volume} alt="Icone volume" className='footer_nav_button' /></li>
                    <li><img src={Wifi} alt="Icone wifi" className='footer_nav_button' /></li>
                    <li><img src={Battery} alt="Icone batterie d'ordinateur" className='footer_nav_button' /></li>
                    <li className='hour'>{currentTime}</li>
                    <li className='hour'>{currentDate}</li>
                </ul>
            </nav>

        </footer>
    )
}

export default Footer