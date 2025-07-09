import styles from "./NewsItem.module.scss"
import QuoteIcon from "../../assets/quote-icon.svg?react";
import formatDateWithTextMonth from "../../utils/DateFunctions/formatDateWithTextMonth.js";
import {useGetNewsRelatedQuery} from "../../store/services/centerBeer.js";
import RelatedNewsCardSkeleton from "../Skeletons/RelatedNewsCardSkeleton/RelatedNewsCardSkeleton.jsx";
import RelatedNewsCard from "../Cards/RelatedNewsCard/RelatedNewsCard.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";

export default function NewsItem({newsInfo}){
    const {data: relatedNews, isFetching: relatedNewsIsFetching} = useGetNewsRelatedQuery(newsInfo?.id, {skip: newsInfo?.id === null})
    return(
        <div className={styles.itemContainer}>
            <h2 className="ma-h2">{newsInfo?.title}</h2>
            <p className="ma-p">{formatDateWithTextMonth(newsInfo?.create_date)}</p>
            <img src={newsInfo?.preview} className={styles.mainImage} alt=""></img>
            <p>Пивоваренная компания AB InBev могла потерять вплоть до 1,4 млрд долларов продаж из-за бойкота потребителями после сотрудничества бренда Bud Light с инфлюенсером Дилан Малвейни.</p>
            <p>По итогам 2023 года компания получила рекордную выручку, однако заявила, что в США её «потенциал роста оказался ограничен», так как продажи снизились из-за бойкота. Выручка в органическом выражении в Северной Америке сократилась на 1,4 млрд долларов, в основном за счёт сокращения продаж Bud Light, который даёт компании львиную долю выручки.</p>
            <div className={styles.quote}>
                <QuoteIcon/>
                <div className={styles.quoteContent}>
                    <p>С мая по февраль Bud Light смог восстановить только 1,2 процентного пункта потерянной доли рынка, рассказал исполнительный директор компании Мишель Дукерис во время конференц-колла с инвесторами. Он отметил что восстановление ускорилось, однако за три-четыре недели восстанавливается только 0,1-0,2 процентного пункта.</p>
                    <p>— Это не настолько быстрый темп, как мы ожидали и к чему мы стремились. Но, несмотря на это прогресс есть, — заявил Дукерис.</p>
                </div>
            </div>
            <p>Продажи Bud Light начали падать в апреле: потребители стали бойкотировать бренд после того, как инфлюенсер Дилан Малвейни разместила в соцсети пост с персонализированной банкой Bud Light. Многие американцы, в том числе владельцы баров и магазинов, ошибочно сочли, что реклама с участием Малвейни вышла на телевидении или что банки с её изображением появились в продаже. На самом деле банка, показанная инфлюенсером в соцсети, была изготовлена в единственном экземпляре при помощи термоусадочной плёнки. По данным американо-канадского политического комментатора Стивена Краудера, за это компания Anheuser-Busch заплатила Дилан Малвейни 185 тысяч долларов.</p>
            <p>Рыночная капитализация компании Anheuser-Busch на фоне недовольства части потребителей снизилась более чем на 6 млрд долларов. По сообщениям СМИ, никто из высшего руководства компании не был в курсе готовящего сотрудничества с транс-инфлюенсером, и решение было принято кем-то из младших менеджеров, занимающихся взаимодействием с инфлюенсерами. После скандала от работы отстранили вице-президента по маркетингу бренда Bud Light Алиссу Хейнершейд и её руководителя, вице-президента AB InBev по маркетингу Дэниела Блейка. Позднее компанию Anheuser-Busch покинул директор по маркетингу Бенуа Гарбе.</p>
            <p>Сама Дилан Малвейни в своём недавнем выступлении в ходе фестиваля SXSW заявила, что бренд Bud Light должен был действовать «как родитель», чтобы защитить её от буллинга, так именно компания приняла решение привлечь её к рекламе бренда. </p>
            <div className={styles.flex} dangerouslySetInnerHTML={{__html: newsInfo?.content}}></div>
            <div className={styles.tagsContainer}>
                {newsInfo?.tags.map((tag, index) =>
                    <div key={index} className={styles.tag}><p className="text-min">{tag}</p></div>
                )}
            </div>
            <div className={styles.source}><p>Источник: </p><a>Profibeer</a></div>
            <div className={styles.similarSection}>
                <h3>Похожие новости</h3>
                <SimpleCatalogSection CardComponent={RelatedNewsCard} SkeletonCardComponent={RelatedNewsCardSkeleton} wideColumns={false} isFetching={relatedNewsIsFetching} cards={relatedNews?.data}></SimpleCatalogSection>
            </div>
        </div>
    )

}