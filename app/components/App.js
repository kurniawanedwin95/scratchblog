import React from 'react';
import Post from './Post.js';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const post = Post.post;
    return (
      <div>
        <h1>There will be something here, I promise!</h1>
        <Post />
      </div>
    );
  }
}

export default App;
