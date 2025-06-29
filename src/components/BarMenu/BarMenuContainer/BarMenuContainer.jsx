import styles from "./BarMenuContainer.module.scss";
import AlcoBottleIcon from "../../../assets/alco-bottle-icon.svg?react";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import BarMenuSection from "../BarMenuSection/BarMenuSection.jsx";
import {useEffect, useState} from "react";
import {useGetBarMenuTabsQuery} from "../../../store/services/centerBeer.js";
import {getBarMenuTabSpec} from "../BarMenuData.js";

export default function BarMenuContainer({ref, barId=1}){
    const [selectedTab, setSelectedTab] = useState("")
    const {data: tabs, isLoading: tabsIsLoading, error: tabsError} = useGetBarMenuTabsQuery(barId)

    useEffect(() => {
        if (tabs && !tabsIsLoading && !tabsError && tabs?.length > 0 ){
            if (selectedTab === ""){
                setSelectedTab(tabs[0]?.alias)
            }
        }
    }, [tabs, selectedTab, tabsIsLoading, tabsError]);

    if (!tabs || tabsIsLoading || tabsError || tabs?.length === 0 || selectedTab === "") return null

    return(
        <div className={styles.menuContainer} ref={ref}>
            <div className={styles.menuHeader}>
                <h2>Наше меню</h2>
                <div className={styles.filterButtons}>
                    {tabs?.map((tab, index) => {
                            const IconComponent = getBarMenuTabSpec(tab?.alias)?.Icon || AlcoBottleIcon
                            if (tab?.alias === "tincture") return null //FIXME: Временнное решение, позже убрать
                            return (<IconButton style={selectedTab === tab?.alias? "primary": ""} onClick={() => selectedTab !== tab?.alias && setSelectedTab(tab?.alias)} key={index} text={getBarMenuTabSpec(tab?.alias)?.filterTitle || tab?.header || ""}><IconComponent/></IconButton>)
                        }

                    )}
                </div>
                <BarMenuSection key={selectedTab} alias={selectedTab} barId={barId} tab={tabs?.find(item => item.alias === selectedTab)}/>
            </div>
        </div>
    )
}