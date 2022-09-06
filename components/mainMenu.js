import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import MainMenuSub from "./mainMenuSub";
import {useRouter} from "next/router";


const MainMenu = ({showMenu, categories, handler}) => {
    const router = useRouter()
    const [showSubMenu, setShowSubMenu] = useState(false)
    const [indexMenuItem, setIndexMenuItem] = useState(null)

    const subMenuClickHandler = () => {
        handler()
        setShowSubMenu(false)
    }

    const [menuBlockHeight, setMenuBlockHeight] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setMenuBlockHeight(ref.current.scrollHeight)
    },[])
    useEffect(()=>{
        setIndexMenuItem(null)
    },[router])

    return (
        <div className={`burger__block__wrapper ${showMenu ? 'active' : ''}`} onClick={handler}>
            <div className="burger__block__wrap" onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className="burger__block__wrap__in">
                    <div className="burger__block__close" onClick={handler}>&nbsp;</div>
                    <div className="burger__block__title"><span>Каталог</span></div>
                    <div className="burger__block__inner">
                        <div className="folders__block__wrap waSlideMenu-nav" ref={ref}>
                            <div className="waSlideMenu-wrapper">
                                <ul className="menu-default top__folders waSlideMenu-menu">
                                    {categories.map((item,catIndex) => {
                                        const subLevel = categories.filter((subItem) => subItem.parent == item.id)
                                        if (item.parent === 0) {
                                            const activeSubMenu = catIndex === indexMenuItem ? true: false
                                            return (
                                                <MainMenuSub
                                                    key={item.id}
                                                    activeSubMenu={activeSubMenu}
                                                    cSMenu={()=> {
                                                        setShowSubMenu(true)
                                                    }}
                                                    subLevel={subLevel}
                                                    item={item}
                                                    handler={handler}
                                                    menuBlockHeight={menuBlockHeight}
                                                    onClickBack={()=>{
                                                        setShowSubMenu(false)
                                                        setIndexMenuItem(null)
                                                    }}
                                                    onCLick={()=>{
                                                        setIndexMenuItem(catIndex)

                                                    }}
                                                    subMenuClickHandler={subMenuClickHandler}
                                                />
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .waSlideMenu-wrapper{
                    transform: ${showSubMenu ? 'translateX(-100%);' : 'translateX(0);'};
                    transition: 0.3s;
                }
                .folders__block__wrap{
                    height: ${menuBlockHeight ? menuBlockHeight + 'px' : false} 
                }
            
            `}
            </style>
        </div>
    );
};

export default MainMenu;