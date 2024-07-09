// import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
// import axios from 'axios';
import { useParams } from 'react-router-dom';

import Product from '../components/Product';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
    const { pageNumber, keyword } = useParams();

    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });
    // console.log(data?.products)

    return (
        <>
            {keyword ? (
                <Link to='/' className='btn btn-light my-4'>Go Back</Link>
            ) : (
                <ProductCarousel />
            )}

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>

                    {data.products.length === 0 ? (
                        <Message>Product not found!</Message>

                    ) : (
                        <>
                            <h1>Latest Products</h1>
                            <Row>
                                {data.products.map((product) => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                            <Paginate pages={data.pages} page={data.page} keyword={keyword} />
                        </>
                    )
                    }
                </>
            )}

        </>
    )
}

export default HomeScreen;