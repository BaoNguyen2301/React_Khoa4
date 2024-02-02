import React from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import SideBarCyberBugs from '../../components/CyberBugs/SideBarCyberBugs';
import MenuCyberBugs from '../../components/CyberBugs/MenuCyberBugs';
import SearchModalCyberBugs from '../../components/CyberBugs/ModalCyberBugs/SearchModalCyberBugs';
import InfoModalCyberBugs from '../../components/CyberBugs/ModalCyberBugs/InfoModalCyberBugs';
import HeaderMain from '../../components/CyberBugs/Main/HeaderMain';
import InfoMain from '../../components/CyberBugs/Main/InfoMain';
import ContentMain from '../../components/CyberBugs/Main/ContentMain';


export const CyberBugsTemplate = (props) => {
    const { Component, ...resParam } = props;
    return <Route {...resParam} render={(propsRoute) => {
        return <>
            <div className="jira">
                {/* Sider Bar  */}
                <SideBarCyberBugs/>
                {/* Menu */}
                <MenuCyberBugs/>
                {/* {/* Main Board * /} */}
                <Component {...propsRoute}/>
            </div>
            {/* Search Modal */}
            <SearchModalCyberBugs/>
            {/* Info Modal */}
            <InfoModalCyberBugs/>
        </>
    }} />
}
