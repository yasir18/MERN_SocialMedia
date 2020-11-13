import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/post';
import { Link } from 'react-router-dom';
import { Button, Avatar, TextField } from '@material-ui/core';
import Spinner from '../utils/Spinner';
import CreatePost from './CreatePost';

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
					<div>
						<CreatePost />
						{posts.map((post, index) => {
							return (
								<div
									key={index}
									style={{
										display: 'flex',
										margin: '20px 0px',
										padding: '10px 0px',
										border: '1px groove black',
									}}
								>
									<div style={{ marginRight: '20px' }}>
										<Avatar
											alt={post.name}
											src={post.image}
											style={{
												width: '50px',
												height: '50px',
												margin: 'auto',
											}}
										/>

										<span
											style={{
												margin: 'auto 5px',
												color: 'darkcyan',
											}}
										>
											{post.name}
										</span>
									</div>
									<div style={{}}>
										<div>
											<q>{post.text}</q>
										</div>
										<div>
											<Button>
												<i
													className="fa fa-thumbs-up fa-lg"
													aria-hidden="true"
												></i>
												2
											</Button>
											<Button>
												<i
													className="fa fa-thumbs-down fa-lg"
													aria-hidden="true"
												></i>
											</Button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
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
