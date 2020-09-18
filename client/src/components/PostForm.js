import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallBack, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      // data.getPosts = [result.data.createPost, ...data.getPosts];
      //proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = '';
    },
  });

  function createPostCallBack() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder='Hi world'
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button type='submit' color='teal'>
          Push
        </Button>
      </Form.Field>
    </Form>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
export default PostForm;
