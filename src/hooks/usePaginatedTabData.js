import { useReducer, useMemo } from 'react';

const initialState = {
    pageCache: { IRT: 1, USDT: 1 },
    paginatedData: [],
    totalPages: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TAB_DATA': {
            const { filteredData, activeTab, itemsPerPage } = action.payload;
            const currentPage = state.pageCache[activeTab] || 1;
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

            return {
                ...state,
                paginatedData,
                totalPages,
            };
        }
        case 'CHANGE_PAGE': {
            const { newPage, activeTab, filteredData, itemsPerPage } = action.payload;
            const startIndex = (newPage - 1) * itemsPerPage;
            const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

            return {
                ...state,
                pageCache: { ...state.pageCache, [activeTab]: newPage },
                paginatedData,
            };
        }
        default:
            return state;
    }
};

export const usePaginatedTabData = (data, activeTab) => {
    const itemsPerPage = 10;
    const [state, dispatch] = useReducer(reducer, initialState);

    const filteredData = useMemo(() => {
        if (!data) return [];
        return data.results.filter(item => item.currency2.code === activeTab);
    }, [data, activeTab]);

    useMemo(() => {
        dispatch({
            type: 'SET_TAB_DATA',
            payload: { filteredData, activeTab, itemsPerPage },
        });
    }, [filteredData, activeTab]);

    const handlePageChange = (newPage) => {
        dispatch({
            type: 'CHANGE_PAGE',
            payload: { newPage, activeTab, filteredData, itemsPerPage },
        });
    };

    return {
        paginatedData: state.paginatedData,
        currentPage: state.pageCache[activeTab] || 1,
        totalPages: state.totalPages,
        handlePageChange,
    };
};
