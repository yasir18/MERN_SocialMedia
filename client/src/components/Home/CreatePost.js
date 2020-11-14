import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post';
import PropTypes from 'prop-types';

const CreatePost = (props) => {
	const [postData, setPostData] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
	useEffect(() => {
		if (postData.length > 0) setIsDisabled(false);
		else setIsDisabled(true);
	}, [postData]);
	return (
		<div style={{ display: 'flex' }}>
			<TextField
				name="post"
				label="New Post"
				variant="outlined"
				placeholder="What's on your mind ?"
				value={postData}
				onChange={(e) => setPostData(e.target.value)}
				style={{
					marginRight: '20px',
					width: '800px',
				}}
			/>
			<Button
				variant="contained"
				size="large"
				color="primary"
				disabled={isDisabled}
				onClick={(e) => {
					props.createPost(postData);
					setPostData('');
				}}
			>
				Post
			</Button>
		</div>
	);
};
CreatePost.propTypes = {
	createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(CreatePost);
