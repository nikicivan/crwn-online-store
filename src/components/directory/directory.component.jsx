import React  from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectDirectorySelections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component.jsx';
import './directory.style.scss';

const Directory = ({ sections }) => (
	<div className="directory-menu">
		{ sections.map(({id, ...otherSectionProps}) => (
			<MenuItem key={id} {...otherSectionProps}/>			
		))}
	</div>
);

const mapToStateProps = createStructuredSelector({  
	sections: selectDirectorySelections
}) 

export default connect(mapToStateProps)(Directory);