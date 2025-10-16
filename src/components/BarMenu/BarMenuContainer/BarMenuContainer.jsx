import styles from "./BarMenuContainer.module.scss";
import AlcoBottleIcon from "../../../assets/alco-bottle-icon.svg?react";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import BarMenuSection from "../BarMenuSection/BarMenuSection.jsx";
import {useEffect, useState} from "react";
import {useGetBarMenuTabsQuery} from "../../../store/services/centerBeer.js";
import {getBarMenuTabSpec} from "../BarMenuData.js";
import {useSearchParams} from "react-router-dom";

export default function BarMenuContainer({ref, barId=1, onReady}){
    const [searchParams] = useSearchParams();
    const menuAlias = searchParams.get('menu');
    const [selectedTab, setSelectedTab] = useState("")
    const {data: tabs, isLoading: tabsIsLoading, error: tabsError} = useGetBarMenuTabsQuery(barId)

    useEffect(() => {
        if (!tabsIsLoading && !tabsError && tabs?.length > 0) {
            if (tabs.some(tab => tab.alias === menuAlias)){
                setSelectedTab(menuAlias)
            }
            else if (selectedTab === "" && tabs[0]?.alias) {
                setSelectedTab(tabs[0].alias);
            }
            if (onReady) {
                onReady();
            }
        }
    }, [tabs, tabsIsLoading, tabsError, selectedTab, onReady]);

    if (!tabs || tabsIsLoading || tabsError || tabs?.length === 0 || selectedTab === "") return null

    return(
        <div className={styles.menuContainer} ref={ref} id="menu">
            <div className={styles.menuHeader}>
                <h2 className={`ma-h2  ${styles.marginize}`}>Наше меню</h2>
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