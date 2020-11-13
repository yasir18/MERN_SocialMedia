import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/post';
import { Link } from 'react-router-dom';
import { Button, Avatar } from '@material-ui/core';
import Spinner from '../utils/Spinner';

const PostsSection = (props) => {
	const {
		getAllPosts,
		posts: { posts, loading },
	} = props;

	useEffect(() => {
		getAllPosts();
	}, [getAllPosts]);
	console.log('Posts Section render ');
	return (
		<Fragment>
			{loading || posts.length === 0 ? (
				<Spinner />
			) : (
				<>
					{posts.map((post) => {
						return (
							<div>
								{post.user}
								<br />
								{post.text}
							</div>
						);
					})}
				</>
			)}
		</Fragment>
	);
};

PostsSection.propTypes = {
	posts: PropTypes.object.isRequired,
	getAllPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	posts: state.posts,
});

export default connect(mapStateToProps, { getAllPosts })(PostsSection);
