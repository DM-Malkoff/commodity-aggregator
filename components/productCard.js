import Link from "next/link";
import Image from "next/image";
import GoToPartner from "./goToPartner";

const ProductCard = ({productData, indexEl}) => {
    // console.log('productData > ',productData.related_ids)
    // console.log('relatedProducts > ',relatedProducts)

    function mathDiscount(salePrice, regularPrice){
        let percent = (regularPrice-salePrice)*100/regularPrice
        return percent.toFixed(0)
    }
    return (
        <div key={productData.id} className='shop2_product_item'>
            <div className='shop2_item_in'>
                <div className="thumbs__top__wrap">
                    <div className="product_top">
                        <div className="product_name">
                            <Link href={
                                {
                                    pathname:`/p/${productData.slug}`,
                                    query: {
                                        id:productData.id
                                    }
                                }
                            }>
                                <a>{productData.name}</a>
                            </Link>
                        </div>
                        <div className="product-compare">
                            <label>
                                <input type="checkbox" />
                                Добавить к сравнению
                            </label>
                        </div>
                        {/*<span className='short-description'>{productData.short_description}</span>*/}
                    </div>
                    <div className="product_image_wr">
                        <div className="product_image">
                            <Link href={
                                {
                                    pathname:`/p/${productData.slug}`,
                                    query: {
                                        id:productData.id
                                    }
                                }
                            }>
                                <a>
                                    <Image
                                        src={productData.images[0].src}
                                        alt="Picture of the author"
                                        width={200}
                                        height={200}
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className="product-label">
                            <div className="product_label_item product-sale">
                                -{mathDiscount(productData.sale_price,productData.regular_price)} %</div>
                        </div>
                    </div>

                    <div className="product-bot">
                        <div className="product-price">
                            <div className="price-old question">
                                <span><strong>{productData.regular_price}</strong>руб.</span>
                            </div>
                            <div className="price-current">
                                <strong>{productData.sale_price}</strong> руб.
                            </div>
                        </div>
                        <GoToPartner url={productData.external_url} shopName={productData.meta_data}/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;