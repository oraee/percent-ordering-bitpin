import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const useTabSwitcher = (initialTab, tabOrder) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const tabIndex = tabOrder.indexOf(activeTab);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (tabIndex < tabOrder.length - 1) {
                setActiveTab(tabOrder[tabIndex + 1]);
            }
        },
        onSwipedRight: () => {
            if (tabIndex > 0) {
                setActiveTab(tabOrder[tabIndex - 1]);
            }
        },
    });

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return {
        activeTab,
        handleTabChange,
        handlers,
    };
};

export default useTabSwitcher;
