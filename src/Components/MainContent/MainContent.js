import React from 'react';
import SearchFilters from '../SearchFilters';
import TopNews from '../TopNews';

export const MainContent = () => {
    return (<>
        <div className='main-content-container'>
            <SearchFilters />
            <TopNews />
            {/* <TopNews /> */}
        </div>
    </>);
};