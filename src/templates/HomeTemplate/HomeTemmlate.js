import React from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../components/Home/Header/Header';

export const HomeTemmlate = (props) => {
    const {Component, ...restParam} = props;
    return <Route {...restParam} render={(propsRoute)=>{
        return<>
        <Header/>
        <Component {...propsRoute}/>
        </>
    }}/>
}
