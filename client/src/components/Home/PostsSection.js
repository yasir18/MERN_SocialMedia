import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getAllPosts,
	likePost,
	unlikePost,
	deletePost,
} from '../../actions/post';
import { Button, Avatar, Link } from '@material-ui/core';
import Spinner from '../utils/Spinner';
import CreatePost from './CreatePost';
import Pagination from './Pagination';
import ConfirmDialog from '../utils/ConfirmDialog';

const PostsSection = (props) => {
	const {
		getAllPosts,
		likePost,
		unlikePost,
		deletePost,
		auth,
		posts: { posts, loading },
	} = props;

	const [currentPageNumber, setcurrentPageNumber] = useState(1);
	const [pageSize] = useState(8);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [deletePostId, setDeletePostId] = useState('');

	useEffect(() => {
		getAllPosts();
	}, [getAllPosts]);

	//get current posts
	const lastIndex = currentPageNumber * pageSize;
	const firstIndex = lastIndex - pageSize;
	const currentPosts = posts.slice(firstIndex, lastIndex);

	const changePageNumber = (number) => setcurrentPageNumber(number);

	const isLiked = (post) => {
		return post.likes.some((like) => like.user.toString() === auth.user);
	};
	const getColor = (post) => {
		if (post.likes.some((like) => like.user.toString() === auth.user))
			return { color: 'red' };
		return { color: 'grey' };
	};
	console.log('Posts Section render ');
	return (
		<Fragment>
			{loading || posts == null ? (
				<Spinner />
			) : (
				<>
					<div>
						<CreatePost />
						{currentPosts.map((post, index) => {
							return (
								<div
									key={index}
									style={{
										display: 'flex',
										margin: '20px 0px',
										padding: '10px 5px',
										border: '1px solid black',
										borderRadius: '10px',
										backgroundColor: '#ecf0f1',
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
										<Link
											href={`/viewProfile/${post.user}`}
										>
											<span
												style={{
													margin: 'auto 5px',
													color: 'darkcyan',
												}}
											>
												{post.name}
											</span>
										</Link>
									</div>
									<div style={{}}>
										<div>
											<q>{post.text}</q>
										</div>
										<div>
											<Button
												style={getColor(post)}
												onClick={(e) => {
													isLiked(post)
														? unlikePost(
																post._id,
																auth.user
														  )
														: likePost(
																post._id,
																auth.user
														  );
												}}
											>
												<i
													className="fa fa-heart fa-lg"
													aria-hidden="true"
												></i>{' '}
												{post && post.likes.length}
											</Button>
											{/* If there are problems with dialog, remove the component and just call deletePost in onClick */}
											{post.user === auth.user && (
												<Fragment>
													<Button
														onClick={(e) => {
															setDialogOpen(true);
															setDeletePostId(
																post._id
															);
														}}
													>
														<i
															className="fa fa-trash fa-lg"
															aria-hidden="true"
														></i>{' '}
													</Button>
													<ConfirmDialog
														title="Are you sure you want to delete Post? "
														open={dialogOpen}
														setOpen={setDialogOpen}
														onConfirm={deletePost}
														postId={deletePostId}
													/>
												</Fragment>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<Pagination
						currentPageNumber={currentPageNumber}
						changePageNumber={changePageNumber}
						numberOfPages={Math.ceil(posts.length / pageSize)}
					/>
				</>
			)}
		</Fragment>
	);
};

PostsSection.propTypes = {
	posts: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getAllPosts: PropTypes.func.isRequired,
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	posts: state.posts,
	auth: state.auth,
});

export default connect(mapStateToProps, {
	getAllPosts,
	likePost,
	unlikePost,
	deletePost,
})(PostsSection);
