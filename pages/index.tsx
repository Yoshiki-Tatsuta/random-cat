import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import styles from "./index.module.css";

type Props = {
    initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoding] = useState(false);

// const IndexPage: NextPage = () => {
//     const [imageUrl, setImageUrl] = useState("");
//     const [loading, setLoding] = useState(true);

//     useEffect(() => {
//         fetchImage().then((newImage) => {
//             setImageUrl(newImage.url);
//             setLoding(false);
//         });
//     }, []);


    // ボタンをクリックしたときに画像を読み込む処理
    const handleClick = async () => {
        setLoding(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoding(false);
    };
    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>他のにゃんこも見る</button>
            <div className={styles.frame}>
                {loading || <img src={imageUrl} className={styles.img} />}
            </div>
        </div>
    );
};
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
};

