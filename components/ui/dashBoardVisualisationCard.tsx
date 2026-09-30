import { ComponentType } from 'react';
import styles from './styles/dashBoardVisualisationCard.module.css';
const DashBoardVisualisationCard = (
    { title, quantity, color, icon }: {
        title: string,
        quantity?: number,
        color: string
        icon: ComponentType<{ color?: string, size?: number }>
    }
) => {
    const Icon = icon;
    return (
        <div className={styles.container} >
            <div className={styles.leftBar} style={{ backgroundColor: color }} />
            <div className={styles.backgroundRec} style={{backgroundColor:color}}/>
            <div className={styles.details}>
                <div className={styles.title} style={{color:color}}>
                    {title}
                </div>
                <div className={styles.quantity} style={{color:color}}>
                    {quantity}
                </div>
            </div>
            <div className={styles.icon}>
                <Icon color={color}/>
            </div>
        </div>
    );
}
export default DashBoardVisualisationCard;