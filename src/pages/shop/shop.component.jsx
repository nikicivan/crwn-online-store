import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStart } from '../../redux/shop/shop.action';

const ShopPage = ({ fetchCollectionsStart, match }) => {		
	useEffect(() => {
		fetchCollectionsStart();
	}, [fetchCollectionsStart]);
	return (
		<div className='shop-page'>
		<Route 
			exact 
			path={`${match.path}`} 
			component={CollectionsOverviewContainer} 
		/> 
		<Route 
			path={`${match.path}/:collectionId`} 
			component={CollectionPageContainer}
		/>
		</div>
	);
}	


const mapDispatchToProps = dispatch => ({
	fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);