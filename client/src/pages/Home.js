import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

import { AuthContext } from '../context/auth.js';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { getPosts: posts } = data ? data : [];

  return (
    <Grid columns={3}>
      <Grid.Row centered>{user && <h1>Recent Posts</h1>}</Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {user && loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {user &&
              posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
